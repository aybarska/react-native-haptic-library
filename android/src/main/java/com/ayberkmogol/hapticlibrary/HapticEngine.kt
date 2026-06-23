package com.ayberkmogol.hapticlibrary

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.util.Log
import android.view.HapticFeedbackConstants
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import kotlin.math.roundToInt

data class PreparedHaptic(
  val platformEffect: VibrationEffect
)

class HapticEngine(private val context: Context) {
  private val vibrator: Vibrator? by lazy {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      context.getSystemService(VibratorManager::class.java)?.defaultVibrator
    } else {
      @Suppress("DEPRECATION")
      context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    }
  }
  private var enabled = true

  fun setEnabled(enabled: Boolean) {
    this.enabled = enabled
    if (!enabled) stop()
  }

  fun isSupported(): Boolean = vibrator?.hasVibrator() == true

  fun supportLevel(): HapticSupport {
    if (!isSupported()) return HapticSupport.NO_SUPPORT
    return when {
      supportsPrimitiveComposition() && vibrator?.hasAmplitudeControl() == true -> HapticSupport.ADVANCED_SUPPORT
      Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && vibrator?.hasAmplitudeControl() == true -> HapticSupport.STANDARD_SUPPORT
      else -> HapticSupport.LIMITED_SUPPORT
    }
  }

  fun stop() {
    vibrator?.cancel()
  }

  fun play(effect: PreparedHaptic?) {
    if (!enabled || effect == null || !isSupported()) return
    if (ContextCompat.checkSelfPermission(context, Manifest.permission.VIBRATE) != PackageManager.PERMISSION_GRANTED) {
      Log.w(TAG, "Skipping haptic feedback because android.permission.VIBRATE is not granted")
      return
    }
    try {
      vibrator?.vibrate(effect.platformEffect)
    } catch (securityException: SecurityException) {
      Log.w(TAG, "Skipping haptic feedback because the app cannot use the vibrator", securityException)
    }
  }

  fun playViewEffect(name: String): Boolean {
    if (!enabled) return false
    val effect = viewEffectForName(name) ?: return false
    val decorView = (context as? ReactApplicationContext)?.currentActivity?.window?.decorView ?: return false
    return decorView.performHapticFeedback(effect)
  }

  fun createSystemEffect(name: String): PreparedHaptic? {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) return null
    val effect = when (name.lowercase()) {
      "selection", "soft", "light" -> VibrationEffect.EFFECT_TICK
      "medium", "success" -> VibrationEffect.EFFECT_CLICK
      "heavy", "rigid", "warning" -> VibrationEffect.EFFECT_HEAVY_CLICK
      "error" -> VibrationEffect.EFFECT_DOUBLE_CLICK
      else -> null
    } ?: return null
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      val supported = vibrator?.areAllEffectsSupported(effect) != Vibrator.VIBRATION_EFFECT_SUPPORT_NO
      if (supported) PreparedHaptic(VibrationEffect.createPredefined(effect)) else null
    } else {
      PreparedHaptic(VibrationEffect.createPredefined(effect))
    }
  }

  fun createEffect(pattern: HapticBlueprint): PreparedHaptic? {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      createPrimitiveComposition(pattern)?.let { return PreparedHaptic(it) }
    }

    val frames = buildPlaybackFrames(pattern)
    if (frames.isEmpty()) return null

    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && vibrator?.hasAmplitudeControl() == true) {
      val timingArray = frames.map { it.duration }.toLongArray()
      val amplitudeArray = frames.map { frame ->
        (frame.intensity.coerceIn(0f, 1f) * 255).roundToInt().coerceIn(0, 255)
      }.toIntArray()
      if (!hasPlayableWaveform(timingArray)) return null
      PreparedHaptic(VibrationEffect.createWaveform(timingArray, amplitudeArray, -1))
    } else {
      val timingArray = createPulseTiming(frames)
      if (!hasPlayableWaveform(timingArray)) return null
      PreparedHaptic(VibrationEffect.createWaveform(timingArray, -1))
    }
  }

  private fun createPrimitiveComposition(pattern: HapticBlueprint): VibrationEffect? {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.R) return null
    if (pattern.impacts.isEmpty()) return null
    if (pattern.envelope.amplitude.any { it.value > 0.01f }) return null

    val composition = VibrationEffect.startComposition()
    var previous = 0L
    for (point in pattern.impacts.sortedBy { it.time }) {
      val primitive = when {
        point.frequency > 0.66f -> VibrationEffect.Composition.PRIMITIVE_CLICK
        point.frequency > 0.33f -> VibrationEffect.Composition.PRIMITIVE_TICK
        Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU -> VibrationEffect.Composition.PRIMITIVE_LOW_TICK
        else -> VibrationEffect.Composition.PRIMITIVE_TICK
      }
      if (vibrator?.areAllPrimitivesSupported(primitive) != true) return null
      composition.addPrimitive(primitive, point.amplitude.coerceIn(0f, 1f), (point.time - previous).toInt().coerceAtLeast(0))
      previous = point.time
    }
    return composition.compose()
  }

  private fun supportsPrimitiveComposition(): Boolean {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.R) return false
    return vibrator?.areAllPrimitivesSupported(
      VibrationEffect.Composition.PRIMITIVE_CLICK,
      VibrationEffect.Composition.PRIMITIVE_TICK
    ) == true
  }

  private fun viewEffectForName(name: String): Int? {
    return when (name.lowercase()) {
      "longpressactivation" -> HapticFeedbackConstants.LONG_PRESS
      "buttonpress", "appicontap" -> HapticFeedbackConstants.VIRTUAL_KEY
      "keyboardtap", "typingindicator" -> HapticFeedbackConstants.KEYBOARD_TAP
      "tabselection", "selectiontick", "pickerdetent", "sliderstep", "slidertick",
      "slidervaluechange", "softtick" -> HapticFeedbackConstants.CLOCK_TICK
      "contextualmenu" -> HapticFeedbackConstants.CONTEXT_CLICK
      "inputerror" -> if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) HapticFeedbackConstants.REJECT else null
      "formsubmit", "loadingcomplete", "downloadcomplete" ->
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) HapticFeedbackConstants.CONFIRM else null
      "toggleswitch" ->
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) HapticFeedbackConstants.TOGGLE_ON else null
      else -> null
    }
  }

  private fun hasPlayableWaveform(timings: LongArray): Boolean {
    return timings.isNotEmpty() && timings.any { it > 0L }
  }

  private fun buildPlaybackFrames(pattern: HapticBlueprint): List<PlaybackFrame> {
    val amplitudeLine = SignalLine(pattern.envelope.amplitude)
    val sharpnessLine = SignalLine(pattern.envelope.frequency)

    pattern.impacts.sortedBy { it.time }.forEach { point ->
      val peakTimes = impulseEnvelopeTimes(point.time)
      amplitudeLine.overlay(
        peakTimes[0] to amplitudeLine.valueAt(peakTimes[0]),
        peakTimes[1] to point.amplitude,
        peakTimes[2] to point.amplitude,
        peakTimes[3] to amplitudeLine.valueAt(peakTimes[3])
      )
      sharpnessLine.overlay(
        peakTimes[0] to sharpnessLine.valueAt(peakTimes[0]),
        peakTimes[1] to point.frequency,
        peakTimes[2] to point.frequency,
        peakTimes[3] to sharpnessLine.valueAt(peakTimes[3])
      )
    }

    val controlPoints = buildControlPoints(amplitudeLine, sharpnessLine)
    if (controlPoints.isEmpty()) return emptyList()

    val maxTime = controlPoints.last().time.coerceAtLeast(0L)
    if (maxTime == 0L) return emptyList()

    val frames = mutableListOf<PlaybackFrame>()
    var frameStart = 0L
    while (frameStart < maxTime) {
      val frameEnd = (frameStart + STEP_DURATION_MS).coerceAtMost(maxTime)
      val duration = (frameEnd - frameStart).coerceAtLeast(1L)
      val averages = averageControlValues(controlPoints, frameStart, frameEnd)
      frames.add(
        PlaybackFrame(
          duration = duration,
          intensity = averages.first.coerceIn(0f, 1f),
          sharpness = averages.second.coerceIn(0f, 1f)
        )
      )
      frameStart = frameEnd
    }

    return frames
  }

  private fun buildControlPoints(amplitudeLine: SignalLine, sharpnessLine: SignalLine): List<HapticKeyframe> {
    return (amplitudeLine.times() + sharpnessLine.times())
      .toSet()
      .sorted()
      .map { time ->
        HapticKeyframe(
          time = time,
          amplitude = amplitudeLine.valueAt(time).coerceIn(0f, 1f),
          frequency = sharpnessLine.valueAt(time).coerceIn(0f, 1f)
        )
      }
  }

  private fun impulseEnvelopeTimes(centerTime: Long): LongArray {
    val slopeDuration = (MIN_TRANSITION_DURATION_MS * 0.75f).roundToInt().toLong()
    val peakDuration = (MIN_TRANSITION_DURATION_MS * 0.25f).roundToInt().toLong()
    return longArrayOf(
      centerTime - slopeDuration - peakDuration / 2L,
      centerTime - peakDuration / 2L,
      centerTime + peakDuration / 2L,
      centerTime + peakDuration / 2L + 1L
    )
  }

  private fun averageControlValues(points: List<HapticKeyframe>, startTime: Long, endTime: Long): Pair<Float, Float> {
    val duration = (endTime - startTime).coerceAtLeast(1L)
    var cursor = startTime
    var index = points.indexOfLast { it.time <= cursor }
    var intensityArea = 0f
    var sharpnessArea = 0f

    while (cursor < endTime) {
      while (index + 1 < points.size && points[index + 1].time <= cursor) {
        index += 1
      }

      val segmentEnd = when {
        index < 0 -> minOf(endTime, points.first().time)
        index >= points.lastIndex -> endTime
        else -> minOf(endTime, points[index + 1].time)
      }
      val segmentDuration = (segmentEnd - cursor).coerceAtLeast(0L)
      if (segmentDuration == 0L) {
        cursor = segmentEnd
        continue
      }

      val average = when {
        index < 0 -> points.first().amplitude to points.first().frequency
        index >= points.lastIndex -> points.last().amplitude to points.last().frequency
        else -> interpolateAverage(cursor, segmentEnd, points[index], points[index + 1])
      }
      intensityArea += average.first * segmentDuration
      sharpnessArea += average.second * segmentDuration
      cursor = segmentEnd
    }

    return intensityArea / duration to sharpnessArea / duration
  }

  private fun interpolateAverage(
    startTime: Long,
    endTime: Long,
    startPoint: HapticKeyframe,
    endPoint: HapticKeyframe
  ): Pair<Float, Float> {
    val timeRange = endPoint.time - startPoint.time
    if (timeRange <= 0L) return startPoint.amplitude to startPoint.frequency

    val startProgress = (startTime - startPoint.time).toFloat() / timeRange
    val endProgress = (endTime - startPoint.time).toFloat() / timeRange
    val startAmplitude = startPoint.amplitude + (endPoint.amplitude - startPoint.amplitude) * startProgress
    val endAmplitude = startPoint.amplitude + (endPoint.amplitude - startPoint.amplitude) * endProgress
    val startFrequency = startPoint.frequency + (endPoint.frequency - startPoint.frequency) * startProgress
    val endFrequency = startPoint.frequency + (endPoint.frequency - startPoint.frequency) * endProgress

    return (startAmplitude + endAmplitude) / 2f to (startFrequency + endFrequency) / 2f
  }

  private fun createPulseTiming(frames: List<PlaybackFrame>): LongArray {
    val timings = mutableListOf(0L)
    var currentlyOn = false

    fun append(duration: Long, on: Boolean) {
      if (duration <= 0L) return
      if (on == currentlyOn) {
        timings[timings.lastIndex] += duration
      } else {
        timings.add(duration)
        currentlyOn = on
      }
    }

    for (frame in frames) {
      val intensity = frame.intensity.coerceIn(0f, 1f)
      val sharpness = frame.sharpness.coerceIn(0f, 1f)
      val duration = frame.duration.coerceAtLeast(1L)
      if (intensity <= SILENCE_THRESHOLD) {
        append(duration, false)
        continue
      }

      val minPulse = when {
        sharpness > 0.66f -> 7L
        sharpness > 0.33f -> 10L
        else -> 14L
      }
      val maxPulse = when {
        sharpness > 0.66f -> 24L
        sharpness > 0.33f -> 34L
        else -> 44L
      }
      val pulseDuration = (minPulse + (maxPulse - minPulse) * intensity)
        .roundToInt()
        .toLong()
        .coerceIn(minPulse, (duration - MIN_OFF_DURATION_MS).coerceAtLeast(minPulse))

      append(pulseDuration, true)
      append(duration - pulseDuration, false)
    }
    return timings.toLongArray()
  }

  private companion object {
    const val TAG = "RNHapticLibrary"
    const val STEP_DURATION_MS = 1000L / 13L
    const val MIN_TRANSITION_DURATION_MS = 15L
    const val MIN_OFF_DURATION_MS = 8L
    const val SILENCE_THRESHOLD = 0.04f
  }
}

private data class PlaybackFrame(
  val duration: Long,
  val intensity: Float,
  val sharpness: Float
)

private class SignalLine(points: List<EnvelopePoint>) {
  private val points = mutableListOf<EnvelopePoint>()

  init {
    points.forEach { add(it.time, it.value) }
  }

  fun overlay(vararg replacements: Pair<Long, Float>) {
    if (replacements.isEmpty()) return
    val start = replacements.minOf { it.first }
    val end = replacements.maxOf { it.first }
    points.removeAll { it.time in start..end }
    replacements.forEach { add(it.first, it.second) }
  }

  fun times(): List<Long> = points.map { it.time }

  fun valueAt(time: Long): Float {
    if (points.isEmpty()) return 0f
    points.firstOrNull { it.time == time }?.let { return it.value }
    if (points.size == 1) return points.first().value
    if (time <= points.first().time) return 0f
    if (time >= points.last().time) return 0f

    val nextIndex = points.indexOfFirst { it.time > time }
    val previous = points[nextIndex - 1]
    val next = points[nextIndex]
    val span = next.time - previous.time
    if (span <= 0L) return previous.value

    val progress = (time - previous.time).toFloat() / span
    return previous.value + (next.value - previous.value) * progress
  }

  private fun add(time: Long, value: Float) {
    val point = EnvelopePoint(time, value.coerceIn(0f, 1f))
    val existingIndex = points.indexOfFirst { it.time == point.time }
    if (existingIndex >= 0) {
      points[existingIndex] = point
      return
    }
    val insertIndex = points.indexOfFirst { it.time > point.time }
    if (insertIndex < 0) {
      points.add(point)
    } else {
      points.add(insertIndex, point)
    }
  }
}
