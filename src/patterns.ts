// Generated from the native haptic preset catalog.
import type { HapticOptions, HapticPatternMetadata } from './types';

export const patternNames = [
  "selection",
  "soft",
  "rigid",
  "light",
  "medium",
  "heavy",
  "success",
  "error",
  "warning",
  "lightningStrikeQuick",
  "lightningStrikeChain",
  "lightningStrikeHeavy",
  "coinCollectSingle",
  "coinCollectMulti",
  "coinCollectJackpot",
  "swordSlashLight",
  "swordSlashHeavy",
  "arrowRelease",
  "explosionSmall",
  "explosionMassive",
  "shieldBlock",
  "criticalHit",
  "comboHit3x",
  "comboHit5x",
  "footstepGrass",
  "footstepMetal",
  "engineStart",
  "turboBoost",
  "portalEnter",
  "magicCharge",
  "machineGun",
  "cascade",
  "elasticBounce",
  "drums",
  "achievementUnlocked",
  "levelUp",
  "starRating",
  "badgeEarned",
  "streakMilestone",
  "perfectScore",
  "rankPromotion",
  "dailyGoalComplete",
  "trophyUnlock",
  "questComplete",
  "highScore",
  "masteryAchieved",
  "correctAnswerBasic",
  "correctAnswerSimple",
  "correctAnswerStreak",
  "correctAnswerPerfect",
  "perfectLessonComplete",
  "badgeUnlock",
  "skillMastery",
  "leaguePromotion",
  "celebrationBurst",
  "ascendingSuccess",
  "correctAnswer",
  "incorrectGentle",
  "hintAvailable",
  "progressCheckpoint",
  "encouragementTap",
  "skillUnlocked",
  "lessonComplete",
  "practiceReminder",
  "knowledgeGained",
  "feedbackPositive",
  "wrongAnswerGentle",
  "wrongAnswerStandard",
  "nearMissAnswer",
  "grammarError",
  "hintActivation",
  "hintReveal",
  "timeCriticalWarning",
  "partialCredit",
  "tryAgainEncouragement",
  "learningProgress",
  "educationalFocusReminder",
  "flashcardFlip",
  "quizStart",
  "xpGainSmall",
  "xpGainLarge",
  "xpGainBonus",
  "xpGainDynamic",
  "bonusPoints",
  "powerUpCollected",
  "lifeGained",
  "challengeAccepted",
  "timerTick",
  "rewardUnlock",
  "progressBarFill",
  "progressBarFilling",
  "progress25",
  "progress50",
  "progress75",
  "dailyGoalCheckpoint",
  "leagueAdvancement",
  "crownGemCollection",
  "powerUpActivation",
  "challengeCompletion",
  "lessonPathProgress",
  "socialFeatureNotification",
  "comboMultiplier",
  "streakRiskWarning",
  "streakLost",
  "streakBuilding",
  "streakMilestone5",
  "streakMilestone7Days",
  "streakMilestone10",
  "streakMilestone25",
  "streakMilestone30Days",
  "streakMilestone100Days",
  "doubleTapLike",
  "messageSent",
  "notificationPop",
  "typingIndicator",
  "commentPosted",
  "pullToRefresh",
  "swipeAction",
  "toggleSwitch",
  "pickerDetent",
  "longPressActivation",
  "tabSelection",
  "navigationPush",
  "navigationPop",
  "modalPresent",
  "modalDismiss",
  "keyboardTap",
  "sliderStep",
  "sliderTick",
  "buttonPress",
  "selectionTick",
  "segmentChange",
  "zoomBoundary",
  "dragAndDrop",
  "formSubmit",
  "inputError",
  "loadingComplete",
  "appIconTap",
  "scrollBounce",
  "pageFlip",
  "photoCapture",
  "shareAction",
  "downloadComplete",
  "refreshData",
  "gestureRecognized",
  "pageTurn",
  "bookPageTurn",
  "softTick",
  "customPop",
  "contextualMenu",
  "sliderValueChange",
  "pop",
  "magicSparkle",
  "bellToll",
  "bassDrop",
  "breath",
  "buzz",
  "dogBark",
  "flare",
  "glitch",
  "guitarStrum",
  "knock",
  "passingCar",
  "powerDown",
  "sonar",
  "waterDrop",
  "specialEarthquake",
  "laserBeam",
  "typewriter",
  "heartbeat",
  "electricSpark",
  "rubberBand",
  "buildUp",
  "boing",
  "inflate",
  "oscillate",
  "breathingGuide",
  "calmPulse",
  "meditationBell",
  "relaxationWave",
  "zenNotification",
  "timeWarning30s",
  "timeWarning10s",
  "heartBeats",
  "timerComplete",
  "taskCheck",
  "focusStart",
  "breakReminder",
  "productivityFocusReminder",
  "paymentSuccess",
  "paymentProcessing",
  "transactionAlert",
  "receiptSaved",
  "excitementBuild",
  "disappointment",
  "surprise",
  "joy",
  "anticipation",
  "fireBurst",
  "iceShard",
  "earthquakeRumble",
  "windTornado",
  "thunderStorm",
  "meteorImpact",
  "intenseEarthquake",
  "intenseTornado",
  "plasmaCharge",
  "gravityWell",
  "photonBlast",
  "quantumShift",
  "rocketLaunch",
  "warpDrive",
  "laserCannon",
  "alienTeleport",
  "spaceExplosion",
  "ultimatePower",
  "dragonRoar",
  "titanSmash",
  "dimensionalRift",
  "volcanicEruption",
  "titanStomp",
  "phoenixRebirth",
  "divineIntervention",
  "megaBoost",
  "starPower",
  "berserkerRage",
  "divineShield",
  "invincibilityActivation",
  "timeFreeze",
  "ultraCombo",
  "nuclearCharge",
  "starRating1",
  "starRating3",
  "starRating5",
  "socialNotification",
  "pencilWrite",
  "eraserUse"
] as const;

export type HapticPatternName = typeof patternNames[number];

export const patternMetadata: Record<HapticPatternName, HapticPatternMetadata> = {
  "selection": {
    "category": "Basic Haptics - UIKit Feedback Generators",
    "options": {}
  },
  "soft": {
    "category": "Basic Haptics - UIKit Feedback Generators",
    "options": {}
  },
  "rigid": {
    "category": "Basic Haptics - UIKit Feedback Generators",
    "options": {}
  },
  "light": {
    "category": "Basic Haptics - UIKit Feedback Generators",
    "options": {}
  },
  "medium": {
    "category": "Basic Haptics - UIKit Feedback Generators",
    "options": {}
  },
  "heavy": {
    "category": "Basic Haptics - UIKit Feedback Generators",
    "options": {}
  },
  "success": {
    "category": "Basic Haptics - UIKit Feedback Generators",
    "options": {}
  },
  "error": {
    "category": "Basic Haptics - UIKit Feedback Generators",
    "options": {}
  },
  "warning": {
    "category": "Basic Haptics - UIKit Feedback Generators",
    "options": {}
  },
  "lightningStrikeQuick": {
    "category": "Gaming",
    "options": {
      "duration": "0.3"
    }
  },
  "lightningStrikeChain": {
    "category": "Gaming",
    "options": {
      "duration": "1.2"
    }
  },
  "lightningStrikeHeavy": {
    "category": "Gaming",
    "options": {
      "duration": "1.5"
    }
  },
  "coinCollectSingle": {
    "category": "Gaming",
    "options": {
      "duration": "0.15"
    }
  },
  "coinCollectMulti": {
    "category": "Gaming",
    "options": {
      "duration": "0.8"
    }
  },
  "coinCollectJackpot": {
    "category": "Gaming",
    "options": {
      "duration": "2.0"
    }
  },
  "swordSlashLight": {
    "category": "Gaming",
    "options": {
      "duration": "0.25"
    }
  },
  "swordSlashHeavy": {
    "category": "Gaming",
    "options": {
      "duration": "0.6"
    }
  },
  "arrowRelease": {
    "category": "Gaming",
    "options": {
      "duration": "0.5"
    }
  },
  "explosionSmall": {
    "category": "Gaming",
    "options": {
      "duration": "0.4"
    }
  },
  "explosionMassive": {
    "category": "Gaming",
    "options": {
      "duration": "1.8"
    }
  },
  "shieldBlock": {
    "category": "Gaming",
    "options": {
      "duration": "0.35"
    }
  },
  "criticalHit": {
    "category": "Gaming",
    "options": {
      "duration": "0.5"
    }
  },
  "comboHit3x": {
    "category": "Gaming",
    "options": {
      "duration": "0.8"
    }
  },
  "comboHit5x": {
    "category": "Gaming",
    "options": {
      "duration": "1.2"
    }
  },
  "footstepGrass": {
    "category": "Gaming",
    "options": {
      "duration": "0.2"
    }
  },
  "footstepMetal": {
    "category": "Gaming",
    "options": {
      "duration": "0.2"
    }
  },
  "engineStart": {
    "category": "Gaming",
    "options": {
      "duration": "2.0"
    }
  },
  "turboBoost": {
    "category": "Gaming",
    "options": {
      "duration": "1.5"
    }
  },
  "portalEnter": {
    "category": "Gaming",
    "options": {
      "duration": "0.8"
    }
  },
  "magicCharge": {
    "category": "Gaming",
    "options": {
      "duration": "1.0"
    }
  },
  "machineGun": {
    "category": "Gaming",
    "options": {
      "duration": "2.0"
    }
  },
  "cascade": {
    "category": "Gaming",
    "options": {
      "duration": "0.8"
    }
  },
  "elasticBounce": {
    "category": "Gaming",
    "options": {
      "duration": "2.0"
    }
  },
  "drums": {
    "category": "Gaming",
    "options": {}
  },
  "achievementUnlocked": {
    "category": "Educational",
    "options": {
      "duration": "1.2"
    }
  },
  "levelUp": {
    "category": "Educational",
    "options": {
      "duration": "1.5"
    }
  },
  "starRating": {
    "category": "Educational",
    "options": {
      "count": "3",
      "duration": "0.2"
    }
  },
  "badgeEarned": {
    "category": "Educational",
    "options": {
      "duration": "0.8"
    }
  },
  "streakMilestone": {
    "category": "Educational",
    "options": {
      "duration": "1.0"
    }
  },
  "perfectScore": {
    "category": "Educational",
    "options": {
      "duration": "1.0"
    }
  },
  "rankPromotion": {
    "category": "Educational",
    "options": {
      "duration": "1.5"
    }
  },
  "dailyGoalComplete": {
    "category": "Educational",
    "options": {
      "duration": "1.0"
    }
  },
  "trophyUnlock": {
    "category": "Educational",
    "options": {
      "duration": "1.8"
    }
  },
  "questComplete": {
    "category": "Educational",
    "options": {
      "duration": "1.5"
    }
  },
  "highScore": {
    "category": "Educational",
    "options": {
      "duration": "1.5"
    }
  },
  "masteryAchieved": {
    "category": "Educational",
    "options": {
      "duration": "2.0"
    }
  },
  "correctAnswerBasic": {
    "category": "Educational",
    "options": {
      "duration": "0.2"
    }
  },
  "correctAnswerSimple": {
    "category": "Educational",
    "options": {
      "duration": "0.25"
    }
  },
  "correctAnswerStreak": {
    "category": "Educational",
    "options": {
      "streakCount": "3",
      "duration": "0.5"
    }
  },
  "correctAnswerPerfect": {
    "category": "Educational",
    "options": {
      "duration": "0.8"
    }
  },
  "perfectLessonComplete": {
    "category": "Educational",
    "options": {
      "duration": "2.0"
    }
  },
  "badgeUnlock": {
    "category": "Educational",
    "options": {
      "duration": "0.8"
    }
  },
  "skillMastery": {
    "category": "Educational",
    "options": {
      "duration": "1.5"
    }
  },
  "leaguePromotion": {
    "category": "Educational",
    "options": {
      "duration": "1.5"
    }
  },
  "celebrationBurst": {
    "category": "Educational",
    "options": {
      "duration": "1.0"
    }
  },
  "ascendingSuccess": {
    "category": "Educational",
    "options": {
      "duration": "0.6"
    }
  },
  "correctAnswer": {
    "category": "Educational",
    "options": {
      "duration": "0.3"
    }
  },
  "incorrectGentle": {
    "category": "Educational",
    "options": {
      "duration": "0.4"
    }
  },
  "hintAvailable": {
    "category": "Educational",
    "options": {
      "duration": "0.5"
    }
  },
  "progressCheckpoint": {
    "category": "Educational",
    "options": {
      "duration": "0.6"
    }
  },
  "encouragementTap": {
    "category": "Educational",
    "options": {
      "duration": "0.3"
    }
  },
  "skillUnlocked": {
    "category": "Educational",
    "options": {
      "duration": "0.8"
    }
  },
  "lessonComplete": {
    "category": "Educational",
    "options": {
      "duration": "1.0"
    }
  },
  "practiceReminder": {
    "category": "Educational",
    "options": {
      "duration": "0.5"
    }
  },
  "knowledgeGained": {
    "category": "Educational",
    "options": {
      "duration": "0.7"
    }
  },
  "feedbackPositive": {
    "category": "Educational",
    "options": {
      "duration": "0.4"
    }
  },
  "wrongAnswerGentle": {
    "category": "Educational",
    "options": {
      "duration": "0.5"
    }
  },
  "wrongAnswerStandard": {
    "category": "Educational",
    "options": {
      "duration": "0.3"
    }
  },
  "nearMissAnswer": {
    "category": "Educational",
    "options": {
      "duration": "0.35"
    }
  },
  "grammarError": {
    "category": "Educational",
    "options": {
      "duration": "0.25"
    }
  },
  "hintActivation": {
    "category": "Educational",
    "options": {
      "duration": "0.3"
    }
  },
  "hintReveal": {
    "category": "Educational",
    "options": {
      "duration": "0.3"
    }
  },
  "timeCriticalWarning": {
    "category": "Educational",
    "options": {
      "duration": "0.8"
    }
  },
  "partialCredit": {
    "category": "Educational",
    "options": {
      "duration": "0.4"
    }
  },
  "tryAgainEncouragement": {
    "category": "Educational",
    "options": {
      "duration": "0.3"
    }
  },
  "learningProgress": {
    "category": "Educational",
    "options": {
      "duration": "0.5"
    }
  },
  "educationalFocusReminder": {
    "category": "Educational",
    "options": {
      "duration": "0.3"
    }
  },
  "flashcardFlip": {
    "category": "Educational",
    "options": {
      "duration": "0.2"
    }
  },
  "quizStart": {
    "category": "Educational",
    "options": {
      "duration": "1.0"
    }
  },
  "xpGainSmall": {
    "category": "Educational",
    "options": {
      "duration": "0.3"
    }
  },
  "xpGainLarge": {
    "category": "Educational",
    "options": {
      "duration": "1.0"
    }
  },
  "xpGainBonus": {
    "category": "Educational",
    "options": {
      "duration": "0.5"
    }
  },
  "xpGainDynamic": {
    "category": "Educational",
    "options": {
      "xpAmount": "10",
      "duration": "0.3"
    }
  },
  "bonusPoints": {
    "category": "Educational",
    "options": {
      "duration": "0.7"
    }
  },
  "powerUpCollected": {
    "category": "Educational",
    "options": {
      "duration": "0.5"
    }
  },
  "lifeGained": {
    "category": "Educational",
    "options": {
      "duration": "0.6"
    }
  },
  "challengeAccepted": {
    "category": "Educational",
    "options": {
      "duration": "0.5"
    }
  },
  "timerTick": {
    "category": "Educational",
    "options": {
      "duration": "0.1"
    }
  },
  "rewardUnlock": {
    "category": "Educational",
    "options": {
      "duration": "1.0"
    }
  },
  "progressBarFill": {
    "category": "Educational",
    "options": {
      "duration": "0.8"
    }
  },
  "progressBarFilling": {
    "category": "Educational",
    "options": {
      "startPercent": "0.0",
      "endPercent": "1.0",
      "duration": "1.0"
    }
  },
  "progress25": {
    "category": "Educational",
    "options": {
      "duration": "0.2"
    }
  },
  "progress50": {
    "category": "Educational",
    "options": {
      "duration": "0.3"
    }
  },
  "progress75": {
    "category": "Educational",
    "options": {
      "duration": "0.4"
    }
  },
  "dailyGoalCheckpoint": {
    "category": "Educational",
    "options": {
      "checkpointNumber": "3",
      "duration": "0.5"
    }
  },
  "leagueAdvancement": {
    "category": "Educational",
    "options": {
      "duration": "1.2"
    }
  },
  "crownGemCollection": {
    "category": "Educational",
    "options": {
      "duration": "0.6"
    }
  },
  "powerUpActivation": {
    "category": "Educational",
    "options": {
      "powerUpType": "default",
      "duration": "0.5"
    }
  },
  "challengeCompletion": {
    "category": "Educational",
    "options": {
      "isPerfect": "false",
      "duration": "1.0"
    }
  },
  "lessonPathProgress": {
    "category": "Educational",
    "options": {
      "nodeType": "default",
      "duration": "0.4"
    }
  },
  "socialFeatureNotification": {
    "category": "Educational",
    "options": {
      "notificationType": "default",
      "duration": "0.6"
    }
  },
  "comboMultiplier": {
    "category": "Educational",
    "options": {
      "count": "3",
      "duration": "0.6"
    }
  },
  "streakRiskWarning": {
    "category": "Educational",
    "options": {
      "duration": "0.6"
    }
  },
  "streakLost": {
    "category": "Educational",
    "options": {
      "duration": "0.5"
    }
  },
  "streakBuilding": {
    "category": "Educational",
    "options": {
      "streakCount": "3",
      "duration": "0.5"
    }
  },
  "streakMilestone5": {
    "category": "Educational",
    "options": {
      "duration": "0.6"
    }
  },
  "streakMilestone7Days": {
    "category": "Educational",
    "options": {
      "duration": "1.0"
    }
  },
  "streakMilestone10": {
    "category": "Educational",
    "options": {
      "duration": "0.8"
    }
  },
  "streakMilestone25": {
    "category": "Educational",
    "options": {
      "duration": "1.2"
    }
  },
  "streakMilestone30Days": {
    "category": "Educational",
    "options": {
      "duration": "1.5"
    }
  },
  "streakMilestone100Days": {
    "category": "Educational",
    "options": {
      "duration": "2.0"
    }
  },
  "doubleTapLike": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.2"
    }
  },
  "messageSent": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.25"
    }
  },
  "notificationPop": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.3"
    }
  },
  "typingIndicator": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.1"
    }
  },
  "commentPosted": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.2"
    }
  },
  "pullToRefresh": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.4"
    }
  },
  "swipeAction": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.25",
      "actionType": "default"
    }
  },
  "toggleSwitch": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.2"
    }
  },
  "pickerDetent": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.1"
    }
  },
  "longPressActivation": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.4"
    }
  },
  "tabSelection": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.15"
    }
  },
  "navigationPush": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.25"
    }
  },
  "navigationPop": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.2"
    }
  },
  "modalPresent": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.3"
    }
  },
  "modalDismiss": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.25"
    }
  },
  "keyboardTap": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.05"
    }
  },
  "sliderStep": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.05"
    }
  },
  "sliderTick": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.05"
    }
  },
  "buttonPress": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.03"
    }
  },
  "selectionTick": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.1"
    }
  },
  "segmentChange": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.15"
    }
  },
  "zoomBoundary": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.2"
    }
  },
  "dragAndDrop": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.25",
      "phase": "start"
    }
  },
  "formSubmit": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.3"
    }
  },
  "inputError": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.4"
    }
  },
  "loadingComplete": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.5"
    }
  },
  "appIconTap": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.15"
    }
  },
  "scrollBounce": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.3"
    }
  },
  "pageFlip": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.3"
    }
  },
  "photoCapture": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.2"
    }
  },
  "shareAction": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.3"
    }
  },
  "downloadComplete": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.5"
    }
  },
  "refreshData": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.4"
    }
  },
  "gestureRecognized": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.2"
    }
  },
  "pageTurn": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.3"
    }
  },
  "bookPageTurn": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.25"
    }
  },
  "softTick": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.3"
    }
  },
  "customPop": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.15"
    }
  },
  "contextualMenu": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.25"
    }
  },
  "sliderValueChange": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.06"
    }
  },
  "pop": {
    "category": "UI Interaction",
    "options": {
      "duration": "0.2"
    }
  },
  "magicSparkle": {
    "category": "Special Effect",
    "options": {
      "duration": "1.2"
    }
  },
  "bellToll": {
    "category": "Special Effect",
    "options": {
      "duration": "0.399"
    }
  },
  "bassDrop": {
    "category": "Sound Effects",
    "options": {
      "duration": "0.071"
    }
  },
  "breath": {
    "category": "Sound Effects",
    "options": {
      "duration": "3.2"
    }
  },
  "buzz": {
    "category": "Sound Effects",
    "options": {
      "duration": "0.35"
    }
  },
  "dogBark": {
    "category": "Sound Effects",
    "options": {
      "duration": "0.5"
    }
  },
  "flare": {
    "category": "Sound Effects",
    "options": {
      "duration": "0.38"
    }
  },
  "glitch": {
    "category": "Sound Effects",
    "options": {
      "duration": "0.22"
    }
  },
  "guitarStrum": {
    "category": "Sound Effects",
    "options": {
      "duration": "1.4"
    }
  },
  "knock": {
    "category": "Sound Effects",
    "options": {
      "duration": "0.76"
    }
  },
  "passingCar": {
    "category": "Sound Effects",
    "options": {
      "duration": "1.1"
    }
  },
  "powerDown": {
    "category": "Sound Effects",
    "options": {
      "duration": "1.8"
    }
  },
  "sonar": {
    "category": "Sound Effects",
    "options": {
      "duration": "2.0"
    }
  },
  "waterDrop": {
    "category": "Special Effect",
    "options": {
      "duration": "0.6"
    }
  },
  "specialEarthquake": {
    "category": "Special Effect",
    "options": {
      "duration": "2.5"
    }
  },
  "laserBeam": {
    "category": "Special Effect",
    "options": {
      "duration": "0.8"
    }
  },
  "typewriter": {
    "category": "Special Effect",
    "options": {
      "duration": "0.04"
    }
  },
  "heartbeat": {
    "category": "Special Effect",
    "options": {
      "duration": "1.5"
    }
  },
  "electricSpark": {
    "category": "Special Effect",
    "options": {
      "duration": "0.3"
    }
  },
  "rubberBand": {
    "category": "Special Effect",
    "options": {
      "duration": "0.4"
    }
  },
  "buildUp": {
    "category": "Special Effect",
    "options": {
      "duration": "2.0"
    }
  },
  "boing": {
    "category": "Special Effect",
    "options": {
      "duration": "0.25"
    }
  },
  "inflate": {
    "category": "Special Effect",
    "options": {
      "duration": "1.7"
    }
  },
  "oscillate": {
    "category": "Special Effect",
    "options": {
      "duration": "3.0"
    }
  },
  "breathingGuide": {
    "category": "Wellness",
    "options": {
      "duration": "4.0"
    }
  },
  "calmPulse": {
    "category": "Wellness",
    "options": {
      "duration": "2.0"
    }
  },
  "meditationBell": {
    "category": "Wellness",
    "options": {
      "duration": "1.5"
    }
  },
  "relaxationWave": {
    "category": "Wellness",
    "options": {
      "duration": "3.0"
    }
  },
  "zenNotification": {
    "category": "Wellness",
    "options": {
      "duration": "1.2"
    }
  },
  "timeWarning30s": {
    "category": "Wellness",
    "options": {
      "duration": "0.5"
    }
  },
  "timeWarning10s": {
    "category": "Wellness",
    "options": {
      "duration": "0.8"
    }
  },
  "heartBeats": {
    "category": "Wellness",
    "options": {
      "count": "3",
      "durationPerBeat": "0.255"
    }
  },
  "timerComplete": {
    "category": "Productivity",
    "options": {
      "duration": "1.5"
    }
  },
  "taskCheck": {
    "category": "Productivity",
    "options": {
      "duration": "0.2"
    }
  },
  "focusStart": {
    "category": "Productivity",
    "options": {
      "duration": "0.8"
    }
  },
  "breakReminder": {
    "category": "Productivity",
    "options": {
      "duration": "1.2"
    }
  },
  "productivityFocusReminder": {
    "category": "Productivity",
    "options": {
      "duration": "0.25"
    }
  },
  "paymentSuccess": {
    "category": "Finance",
    "options": {
      "duration": "0.1"
    }
  },
  "paymentProcessing": {
    "category": "Finance",
    "options": {
      "duration": "2.0"
    }
  },
  "transactionAlert": {
    "category": "Finance",
    "options": {
      "duration": "0.5"
    }
  },
  "receiptSaved": {
    "category": "Finance",
    "options": {
      "duration": "0.4"
    }
  },
  "excitementBuild": {
    "category": "Emotional",
    "options": {
      "duration": "2.0"
    }
  },
  "disappointment": {
    "category": "Emotional",
    "options": {
      "duration": "0.8"
    }
  },
  "surprise": {
    "category": "Emotional",
    "options": {
      "duration": "0.5"
    }
  },
  "joy": {
    "category": "Emotional",
    "options": {
      "duration": "1.2"
    }
  },
  "anticipation": {
    "category": "Emotional",
    "options": {
      "duration": "2.0"
    }
  },
  "fireBurst": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.0"
    }
  },
  "iceShard": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.5"
    }
  },
  "earthquakeRumble": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.5"
    }
  },
  "windTornado": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.8"
    }
  },
  "thunderStorm": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.5"
    }
  },
  "meteorImpact": {
    "category": "Intense Gamification",
    "options": {
      "duration": "3.0"
    }
  },
  "intenseEarthquake": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.5"
    }
  },
  "intenseTornado": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.8"
    }
  },
  "plasmaCharge": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.5"
    }
  },
  "gravityWell": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.0"
    }
  },
  "photonBlast": {
    "category": "Intense Gamification",
    "options": {
      "duration": "0.8"
    }
  },
  "quantumShift": {
    "category": "Intense Gamification",
    "options": {
      "duration": "0.6"
    }
  },
  "rocketLaunch": {
    "category": "Intense Gamification",
    "options": {
      "duration": "3.0"
    }
  },
  "warpDrive": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.0"
    }
  },
  "laserCannon": {
    "category": "Intense Gamification",
    "options": {
      "duration": "0.5"
    }
  },
  "alienTeleport": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.0"
    }
  },
  "spaceExplosion": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.5"
    }
  },
  "ultimatePower": {
    "category": "Intense Gamification",
    "options": {
      "duration": "3.0"
    }
  },
  "dragonRoar": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.0"
    }
  },
  "titanSmash": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.5"
    }
  },
  "dimensionalRift": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.5"
    }
  },
  "volcanicEruption": {
    "category": "Intense Gamification",
    "options": {
      "duration": "3.5"
    }
  },
  "titanStomp": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.5"
    }
  },
  "phoenixRebirth": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.0"
    }
  },
  "divineIntervention": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.5"
    }
  },
  "megaBoost": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.5"
    }
  },
  "starPower": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.0"
    }
  },
  "berserkerRage": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.0"
    }
  },
  "divineShield": {
    "category": "Intense Gamification",
    "options": {
      "duration": "1.5"
    }
  },
  "invincibilityActivation": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.0"
    }
  },
  "timeFreeze": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.5"
    }
  },
  "ultraCombo": {
    "category": "Intense Gamification",
    "options": {
      "duration": "3.0"
    }
  },
  "nuclearCharge": {
    "category": "Intense Gamification",
    "options": {
      "duration": "2.5"
    }
  },
  "starRating1": {
    "category": "Ratings & Feedback",
    "options": {
      "duration": "0.1"
    }
  },
  "starRating3": {
    "category": "Ratings & Feedback",
    "options": {
      "duration": "0.3"
    }
  },
  "starRating5": {
    "category": "Ratings & Feedback",
    "options": {
      "duration": "0.8"
    }
  },
  "socialNotification": {
    "category": "Ratings & Feedback",
    "options": {
      "notificationType": "default",
      "duration": "0.4"
    }
  },
  "pencilWrite": {
    "category": "Tools & Writing",
    "options": {
      "duration": "0.05"
    }
  },
  "eraserUse": {
    "category": "Tools & Writing",
    "options": {
      "duration": "0.2"
    }
  }
} as const;

export function normalizeOptions(options?: HapticOptions): string {
  return JSON.stringify(options ?? {});
}
