//
//  SonicEffectHapticPatterns.swift
//

import Foundation
import CoreHaptics

struct SonicEffectHapticPatterns {
    static func bassDrop(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 71,
            duration: duration,
            amplitude: [],
            frequency: [],
            discrete: [
            (0.0, 1.0, 0.509),
            (71.0, 1.0, 0.069)
        ]
        )
    }

    static func breath(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 3200,
            duration: duration,
            amplitude: [
            (0.0, 0.0),
            (800.0, 0.5),
            (1600.0, 0.05),
            (2400.0, 0.5),
            (3200.0, 0.0)
        ],
            frequency: [
            (0.0, 0.15),
            (800.0, 0.25),
            (1600.0, 0.1),
            (2400.0, 0.25),
            (3200.0, 0.15)
        ],
            discrete: []
        )
    }

    static func buzz(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 350,
            duration: duration,
            amplitude: [
            (0.0, 0.0),
            (5.0, 0.9),
            (100.0, 0.85),
            (150.0, 0.65),
            (250.0, 0.3),
            (350.0, 0.0)
        ],
            frequency: [
            (0.0, 0.85),
            (350.0, 0.8)
        ],
            discrete: [
            (0.0, 0.9, 0.85)
        ]
        )
    }

    static func dogBark(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 500,
            duration: duration,
            amplitude: [
            (0.0, 0.0),
            (5.0, 0.9),
            (50.0, 0.65),
            (120.0, 0.15),
            (200.0, 0.0),
            (280.0, 0.85),
            (325.0, 0.6),
            (400.0, 0.12),
            (500.0, 0.0)
        ],
            frequency: [
            (0.0, 0.2),
            (500.0, 0.2)
        ],
            discrete: [
            (0.0, 0.9, 0.22),
            (280.0, 0.85, 0.22)
        ]
        )
    }

    static func flare(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 380,
            duration: duration,
            amplitude: [
            (0.0, 0.0),
            (20.0, 0.18),
            (60.0, 0.52),
            (90.0, 0.95),
            (100.0, 1.0),
            (120.0, 0.75),
            (140.0, 0.65),
            (200.0, 0.35),
            (380.0, 0.0)
        ],
            frequency: [
            (0.0, 0.7),
            (60.0, 0.82),
            (100.0, 0.92),
            (200.0, 0.75),
            (380.0, 0.6)
        ],
            discrete: [
            (0.0, 0.2, 0.7),
            (60.0, 0.55, 0.8),
            (100.0, 1.0, 0.9),
            (140.0, 0.7, 0.85),
            (200.0, 0.4, 0.75)
        ]
        )
    }

    static func glitch(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 220,
            duration: duration,
            amplitude: [
            (0.0, 0.9),
            (20.0, 0.1),
            (55.0, 1.0),
            (65.0, 0.0),
            (100.0, 0.85),
            (118.0, 0.0),
            (160.0, 0.95),
            (175.0, 0.15),
            (220.0, 0.0)
        ],
            frequency: [
            (0.0, 0.9),
            (20.0, 0.2),
            (55.0, 1.0),
            (65.0, 0.1),
            (100.0, 0.88),
            (118.0, 0.15),
            (160.0, 0.92),
            (220.0, 0.3)
        ],
            discrete: [
            (0.0, 0.9, 0.9),
            (30.0, 0.2, 0.3),
            (55.0, 1.0, 0.95),
            (70.0, 0.1, 0.2),
            (100.0, 0.85, 0.85),
            (130.0, 0.05, 0.1),
            (160.0, 0.95, 0.9),
            (185.0, 0.3, 0.4)
        ]
        )
    }

    static func guitarStrum(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 1400,
            duration: duration,
            amplitude: [
            (0.0, 0.0),
            (5.0, 0.9),
            (60.0, 0.65),
            (200.0, 0.45),
            (450.0, 0.28),
            (750.0, 0.14),
            (1100.0, 0.05),
            (1400.0, 0.0)
        ],
            frequency: [
            (0.0, 0.58),
            (5.0, 0.55),
            (1400.0, 0.52)
        ],
            discrete: [
            (0.0, 0.9, 0.55)
        ]
        )
    }

    static func knock(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 760,
            duration: duration,
            amplitude: [
            (0.0, 0.0),
            (8.0, 0.65),
            (70.0, 0.08),
            (200.0, 0.0),
            (280.0, 0.65),
            (348.0, 0.08),
            (480.0, 0.0),
            (560.0, 0.65),
            (628.0, 0.08),
            (760.0, 0.0)
        ],
            frequency: [
            (0.0, 0.32),
            (760.0, 0.32)
        ],
            discrete: [
            (0.0, 0.65, 0.35),
            (280.0, 0.65, 0.35),
            (560.0, 0.65, 0.35)
        ]
        )
    }

    static func passingCar(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 1100,
            duration: duration,
            amplitude: [
            (0.0, 0.0),
            (80.0, 0.1),
            (200.0, 0.35),
            (350.0, 0.75),
            (450.0, 1.0),
            (550.0, 0.7),
            (700.0, 0.3),
            (900.0, 0.08),
            (1100.0, 0.0)
        ],
            frequency: [
            (0.0, 0.35),
            (200.0, 0.42),
            (450.0, 0.38),
            (700.0, 0.3),
            (1100.0, 0.22)
        ],
            discrete: []
        )
    }

    static func powerDown(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 1800,
            duration: duration,
            amplitude: [
            (0.0, 0.8),
            (200.0, 0.7),
            (450.0, 0.55),
            (750.0, 0.4),
            (1050.0, 0.25),
            (1350.0, 0.12),
            (1600.0, 0.03),
            (1800.0, 0.0)
        ],
            frequency: [
            (0.0, 0.6),
            (1800.0, 0.03)
        ],
            discrete: [
            (0.0, 0.8, 0.6)
        ]
        )
    }

    static func sonar(duration: Double) throws -> CHHapticPattern {
        return try pattern(
            baseDurationMillis: 2000,
            duration: duration,
            amplitude: [
            (0.0, 0.0),
            (8.0, 0.35),
            (130.0, 0.04),
            (500.0, 0.0),
            (600.0, 0.35),
            (730.0, 0.04),
            (1100.0, 0.0),
            (1200.0, 0.35),
            (1330.0, 0.04),
            (1550.0, 0.0),
            (1620.0, 0.0),
            (1663.0, 0.855),
            (1700.0, 0.0),
            (1800.0, 0.65),
            (1855.0, 0.0),
            (1920.0, 0.4),
            (2000.0, 0.0)
        ],
            frequency: [
            (0.0, 0.72),
            (1550.0, 0.72),
            (1655.0, 0.8),
            (2000.0, 0.7)
        ],
            discrete: [
            (0.0, 0.35, 0.7),
            (600.0, 0.35, 0.7),
            (1200.0, 0.35, 0.7),
            (1800.0, 0.65, 0.65),
            (1920.0, 0.4, 0.6)
        ]
        )
    }

    private static func pattern(
        baseDurationMillis: Double,
        duration: Double,
        amplitude: [(Double, Double)],
        frequency: [(Double, Double)],
        discrete: [(Double, Double, Double)]
    ) throws -> CHHapticPattern {
        let safeBaseDuration = max(baseDurationMillis, 1.0)
        let targetDuration = duration > 0 ? duration : safeBaseDuration / 1000.0
        let scale = targetDuration / (safeBaseDuration / 1000.0)

        var events = discrete.map { point in
            CHHapticEvent(
                eventType: .hapticTransient,
                parameters: [
                    CHHapticEventParameter(parameterID: .hapticIntensity, value: Float(point.1)),
                    CHHapticEventParameter(parameterID: .hapticSharpness, value: Float(point.2))
                ],
                relativeTime: milliseconds(point.0, scale: scale)
            )
        }

        if !amplitude.isEmpty {
            let initialAmplitude = Float(amplitude.first?.1 ?? 0.0)
            let initialFrequency = Float(frequency.first?.1 ?? 0.5)
            events.append(
                CHHapticEvent(
                    eventType: .hapticContinuous,
                    parameters: [
                        CHHapticEventParameter(parameterID: .hapticIntensity, value: initialAmplitude),
                        CHHapticEventParameter(parameterID: .hapticSharpness, value: initialFrequency)
                    ],
                    relativeTime: 0,
                    duration: targetDuration
                )
            )
        }

        var curves: [CHHapticParameterCurve] = []
        if !amplitude.isEmpty {
            curves.append(curve(parameterID: .hapticIntensityControl, points: amplitude, scale: scale))
        }
        if !frequency.isEmpty {
            curves.append(curve(parameterID: .hapticSharpnessControl, points: frequency, scale: scale))
        }

        return try CHHapticPattern(events: events, parameterCurves: curves)
    }

    private static func curve(
        parameterID: CHHapticDynamicParameter.ID,
        points: [(Double, Double)],
        scale: Double
    ) -> CHHapticParameterCurve {
        CHHapticParameterCurve(
            parameterID: parameterID,
            controlPoints: points.map { point in
                CHHapticParameterCurve.ControlPoint(
                    relativeTime: milliseconds(point.0, scale: scale),
                    value: Float(point.1)
                )
            },
            relativeTime: 0
        )
    }

    private static func milliseconds(_ value: Double, scale: Double) -> Double {
        (value / 1000.0) * scale
    }
}
