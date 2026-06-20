#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

const rootDir = resolve(new URL('..', import.meta.url).pathname);
const hapticOptionPath = join(rootDir, 'ios/HapticCore/Models/HapticOption.swift');
const patternsDir = join(rootDir, 'ios/HapticCore/Models/Patterns');
const outputJsonPath = join(rootDir, 'generated/core-haptics.patterns.json');
const outputKotlinPath = join(
  rootDir,
  'android/src/main/java/com/ayberkmogol/hapticlibrary/GeneratedHapticPatternCatalog.kt'
);

const basicPatterns = new Set([
  'selection',
  'soft',
  'rigid',
  'light',
  'medium',
  'heavy',
  'success',
  'error',
  'warning',
]);

const excludedPatterns = new Set(['custom', 'customCurve']);

const requiredDefaults = {
  xpGainDynamic: { xpAmount: '100' },
  progressBarFilling: { startPercent: '0.0', endPercent: '1.0' },
  dailyGoalCheckpoint: { checkpointNumber: '1' },
  powerUpActivation: { powerUpType: '"speed"' },
  challengeCompletion: { isPerfect: 'true' },
  lessonPathProgress: { nodeType: '"standard"' },
  socialNotification: { notificationType: '"default"' },
  streakBuilding: { streakCount: '5' },
};

function parseCases() {
  const source = readFileSync(hapticOptionPath, 'utf8');
  const enumBody = source.slice(
    source.indexOf('public enum HapticOption'),
    source.indexOf('// MARK: - Pattern Generation')
  );
  const cases = [];

  for (const line of enumBody.split('\n')) {
    const trimmed = line.replace(/\/\/.*$/, '').trim();
    const match = trimmed.match(/^case\s+([A-Za-z0-9_]+)(?:\((.*)\))?$/);
    if (!match) continue;

    const [, name, paramsSource] = match;
    if (basicPatterns.has(name) || excludedPatterns.has(name)) continue;

    const params = paramsSource
      ? paramsSource.split(',').map((part) => {
          const paramMatch = part.trim().match(/^([A-Za-z0-9_]+):\s*([^=]+?)(?:\s*=\s*(.+))?$/);
          if (!paramMatch) {
            throw new Error(`Could not parse parameter "${part}" for ${name}`);
          }
          return {
            label: paramMatch[1],
            type: paramMatch[2].trim(),
            defaultValue: paramMatch[3]?.trim(),
          };
        })
      : [];

    cases.push({ name, params });
  }

  return cases;
}

function swiftLiteral(patternName, param) {
  const value = param.defaultValue ?? requiredDefaults[patternName]?.[param.label];
  if (!value) {
    throw new Error(`Missing default value for ${patternName}.${param.label}`);
  }
  return value;
}

function swiftCaseExpression(pattern) {
  if (pattern.params.length === 0) {
    return `.${pattern.name}`;
  }
  const args = pattern.params
    .map((param) => `${param.label}: ${swiftLiteral(pattern.name, param)}`)
    .join(', ');
  return `.${pattern.name}(${args})`;
}

function generateSwiftDumper(patterns) {
  const items = patterns
    .map((pattern) => `  ("${pattern.name}", HapticOption${swiftCaseExpression(pattern)}),`)
    .join('\n');

  return `import Foundation
import CoreHaptics

let items: [(String, HapticOption)] = [
${items}
]

var output: [[String: Any]] = []

for item in items {
  do {
    let pattern = try item.1.getCustomPattern()
    let dictionary = try pattern.exportDictionary()
    output.append([
      "name": item.0,
      "duration": pattern.duration,
      "pattern": dictionary
    ])
  } catch {
    output.append([
      "name": item.0,
      "error": String(describing: error)
    ])
  }
}

let data = try JSONSerialization.data(withJSONObject: output, options: [.prettyPrinted, .sortedKeys])
FileHandle.standardOutput.write(data)
`;
}

function normalizeRandomCalls(source) {
  return source.replace(
    /\b(Float|Double)\.random\(in:\s*(-?\d+(?:\.\d+)?)\s*\.\.\.\s*(-?\d+(?:\.\d+)?)\s*\)/g,
    (_match, typeName, lower, upper) => {
      const midpoint = (Number(lower) + Number(upper)) / 2;
      const literal = Number.isInteger(midpoint) ? midpoint.toFixed(1) : String(Math.round(midpoint * 1000000) / 1000000);
      return typeName === 'Float' ? `Float(${literal})` : literal;
    }
  );
}

function writeNormalizedSource(sourcePath, targetPath) {
  writeFileSync(targetPath, normalizeRandomCalls(readFileSync(sourcePath, 'utf8')));
}

function dumpSwiftPatterns(patterns) {
  const buildDir = mkdtempSync(join(tmpdir(), 'rnhaptic-patterns-'));
  try {
    const sourceDir = join(buildDir, 'Sources');
    mkdirSync(sourceDir, { recursive: true });

    const normalizedHapticOptionPath = join(sourceDir, 'HapticOption.swift');
    writeNormalizedSource(hapticOptionPath, normalizedHapticOptionPath);

    const normalizedPatternPaths = readdirSync(patternsDir)
      .filter((file) => file.endsWith('.swift'))
      .map((file) => {
        const sourcePath = join(patternsDir, file);
        const targetPath = join(sourceDir, file);
        writeNormalizedSource(sourcePath, targetPath);
        return targetPath;
      });

    const mainPath = join(buildDir, 'main.swift');
    const binaryPath = join(buildDir, 'dump-patterns');
    writeFileSync(mainPath, generateSwiftDumper(patterns));

    const sources = [normalizedHapticOptionPath, ...normalizedPatternPaths, mainPath];

    execFileSync('swiftc', [...sources, '-o', binaryPath], { stdio: 'inherit' });
    return JSON.parse(execFileSync(binaryPath, { encoding: 'utf8' }));
  } finally {
    rmSync(buildDir, { recursive: true, force: true });
  }
}

function numberValue(value, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function parameterValue(parameters, id, fallback) {
  const parameter = parameters.find((item) => item.ParameterID === id);
  return clamp01(numberValue(parameter?.ParameterValue, fallback));
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function toMillis(seconds) {
  return Math.max(0, Math.round(seconds * 1000));
}

function dedupeEnvelopePoints(points) {
  const byTime = new Map();
  for (const point of points) {
    const existing = byTime.get(point.time);
    byTime.set(point.time, existing == null ? point.value : Math.max(existing, point.value));
  }
  return [...byTime.entries()]
    .map(([time, value]) => ({ time, value: clamp01(value) }))
    .sort((a, b) => a.time - b.time);
}

function dedupeHapticKeyframes(points) {
  const byKey = new Map();
  for (const point of points) {
    const key = `${point.time}:${point.frequency.toFixed(4)}`;
    const existing = byKey.get(key);
    byKey.set(key, existing == null ? point : { ...point, amplitude: Math.max(existing.amplitude, point.amplitude) });
  }
  return [...byKey.values()].sort((a, b) => a.time - b.time);
}

function convertPattern(record) {
  const amplitude = [];
  const frequency = [];
  const discrete = [];
  const patternItems = Array.isArray(record.pattern?.Pattern) ? record.pattern.Pattern : [];

  for (const item of patternItems) {
    if (item.Event) {
      const event = item.Event;
      const parameters = Array.isArray(event.EventParameters) ? event.EventParameters : [];
      const time = toMillis(numberValue(event.Time));
      const duration = toMillis(numberValue(event.EventDuration));
      const intensity = parameterValue(parameters, 'HapticIntensity', 1);
      const sharpness = parameterValue(parameters, 'HapticSharpness', 0.5);

      if (event.EventType === 'HapticTransient') {
        discrete.push({ time, amplitude: intensity, frequency: sharpness });
      } else if (event.EventType === 'HapticContinuous') {
        amplitude.push({ time, value: intensity });
        amplitude.push({ time: time + duration, value: 0 });
        frequency.push({ time, value: sharpness });
        frequency.push({ time: time + duration, value: sharpness });
      }
    }

    if (item.ParameterCurve) {
      const curve = item.ParameterCurve;
      const baseTime = numberValue(curve.Time);
      const points = Array.isArray(curve.ParameterCurveControlPoints)
        ? curve.ParameterCurveControlPoints
        : [];
      const target = curve.ParameterID === 'HapticSharpnessControl' ? frequency : amplitude;
      if (curve.ParameterID === 'HapticIntensityControl' || curve.ParameterID === 'HapticSharpnessControl') {
        for (const point of points) {
          target.push({
            time: toMillis(baseTime + numberValue(point.Time)),
            value: clamp01(numberValue(point.ParameterValue)),
          });
        }
      }
    }
  }

  return {
    name: record.name,
    durationMillis: toMillis(numberValue(record.duration)),
    envelope: {
      amplitude: dedupeEnvelopePoints(amplitude),
      frequency: dedupeEnvelopePoints(frequency),
    },
    impacts: dedupeHapticKeyframes(discrete),
  };
}

function formatFloat(value) {
  const rounded = Math.round(clamp01(value) * 10000) / 10000;
  return `${Number.isInteger(rounded) ? rounded.toFixed(1) : rounded}f`;
}

function envelopePointList(points, indent) {
  if (points.length === 0) return 'emptyList()';
  return `listOf(\n${points
    .map((point) => `${indent}EnvelopePoint(${point.time}L, ${formatFloat(point.value)})`)
    .join(',\n')}\n${indent.slice(0, -2)})`;
}

function impactPointList(points, indent) {
  if (points.length === 0) return 'emptyList()';
  return `listOf(\n${points
    .map(
      (point) =>
        `${indent}HapticKeyframe(${point.time}L, ${formatFloat(point.amplitude)}, ${formatFloat(point.frequency)})`
    )
    .join(',\n')}\n${indent.slice(0, -2)})`;
}

function generatedPatternEntry(pattern) {
  const key = pattern.name.toLowerCase();
  return `    "${key}" to GeneratedPattern(
      defaultDurationMillis = ${pattern.durationMillis}L,
      data = HapticBlueprint(
        envelope = TextureEnvelope(
          amplitude = ${envelopePointList(pattern.envelope.amplitude, '            ')},
          frequency = ${envelopePointList(pattern.envelope.frequency, '            ')}
        ),
        impacts = ${impactPointList(pattern.impacts, '          ')}
      )
    )`;
}

function generateKotlin(patterns, errors) {
  return `package com.ayberkmogol.hapticlibrary

// Generated by scripts/generate-android-patterns.mjs from ios/HapticCore CoreHaptics patterns.
// Do not edit by hand.

private data class GeneratedPattern(
  val defaultDurationMillis: Long,
  val data: HapticBlueprint
)

object GeneratedHapticPatternCatalog {
  private val patterns: Map<String, GeneratedPattern> = mapOf(
${patterns.map(generatedPatternEntry).join(',\n')}
  )

  fun pattern(name: String): HapticBlueprint? = patterns[name.lowercase()]?.data

  fun defaultDurationMillis(name: String): Long? = patterns[name.lowercase()]?.defaultDurationMillis

  fun names(): List<String> = patterns.keys.toList()

  val generationErrors: Map<String, String> = mapOf(
${errors.map((error) => `    "${error.name.toLowerCase()}" to ${JSON.stringify(error.error)}`).join(',\n')}
  )
}
`;
}

const parsedPatterns = parseCases();
const dumped = dumpSwiftPatterns(parsedPatterns);
const errors = dumped.filter((record) => record.error);
const converted = dumped.filter((record) => !record.error).map(convertPattern);

mkdirSync(dirname(outputJsonPath), { recursive: true });
writeFileSync(outputJsonPath, `${JSON.stringify({ patterns: converted, errors }, null, 2)}\n`);
writeFileSync(outputKotlinPath, generateKotlin(converted, errors));

console.log(`Generated ${converted.length} Android patterns at ${outputKotlinPath}`);
if (errors.length > 0) {
  console.warn(`Skipped ${errors.length} patterns with Swift/CoreHaptics errors:`);
  for (const error of errors) {
    console.warn(`- ${error.name}: ${error.error}`);
  }
}
