package com.ayberkmogol.hapticlibrary

import org.json.JSONObject
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToLong

object HapticPatternCatalog {
  private val definitions: Map<String, PatternDefinition> = mapOf(
        "selection" to PatternDefinition("selection", "Basic Haptics - UIKit Feedback Generators", mapOf()),
        "soft" to PatternDefinition("soft", "Basic Haptics - UIKit Feedback Generators", mapOf()),
        "rigid" to PatternDefinition("rigid", "Basic Haptics - UIKit Feedback Generators", mapOf()),
        "light" to PatternDefinition("light", "Basic Haptics - UIKit Feedback Generators", mapOf()),
        "medium" to PatternDefinition("medium", "Basic Haptics - UIKit Feedback Generators", mapOf()),
        "heavy" to PatternDefinition("heavy", "Basic Haptics - UIKit Feedback Generators", mapOf()),
        "success" to PatternDefinition("success", "Basic Haptics - UIKit Feedback Generators", mapOf()),
        "error" to PatternDefinition("error", "Basic Haptics - UIKit Feedback Generators", mapOf()),
        "warning" to PatternDefinition("warning", "Basic Haptics - UIKit Feedback Generators", mapOf()),
        "lightningstrikequick" to PatternDefinition("lightningStrikeQuick", "Gaming", mapOf("duration" to 0.3)),
        "lightningstrikechain" to PatternDefinition("lightningStrikeChain", "Gaming", mapOf("duration" to 1.2)),
        "lightningstrikeheavy" to PatternDefinition("lightningStrikeHeavy", "Gaming", mapOf("duration" to 1.5)),
        "coincollectsingle" to PatternDefinition("coinCollectSingle", "Gaming", mapOf("duration" to 0.15)),
        "coincollectmulti" to PatternDefinition("coinCollectMulti", "Gaming", mapOf("duration" to 0.8)),
        "coincollectjackpot" to PatternDefinition("coinCollectJackpot", "Gaming", mapOf("duration" to 2.0)),
        "swordslashlight" to PatternDefinition("swordSlashLight", "Gaming", mapOf("duration" to 0.25)),
        "swordslashheavy" to PatternDefinition("swordSlashHeavy", "Gaming", mapOf("duration" to 0.6)),
        "arrowrelease" to PatternDefinition("arrowRelease", "Gaming", mapOf("duration" to 0.5)),
        "explosionsmall" to PatternDefinition("explosionSmall", "Gaming", mapOf("duration" to 0.4)),
        "explosionmassive" to PatternDefinition("explosionMassive", "Gaming", mapOf("duration" to 1.8)),
        "shieldblock" to PatternDefinition("shieldBlock", "Gaming", mapOf("duration" to 0.35)),
        "criticalhit" to PatternDefinition("criticalHit", "Gaming", mapOf("duration" to 0.5)),
        "combohit3x" to PatternDefinition("comboHit3x", "Gaming", mapOf("duration" to 0.8)),
        "combohit5x" to PatternDefinition("comboHit5x", "Gaming", mapOf("duration" to 1.2)),
        "footstepgrass" to PatternDefinition("footstepGrass", "Gaming", mapOf("duration" to 0.2)),
        "footstepmetal" to PatternDefinition("footstepMetal", "Gaming", mapOf("duration" to 0.2)),
        "enginestart" to PatternDefinition("engineStart", "Gaming", mapOf("duration" to 2.0)),
        "turboboost" to PatternDefinition("turboBoost", "Gaming", mapOf("duration" to 1.5)),
        "portalenter" to PatternDefinition("portalEnter", "Gaming", mapOf("duration" to 0.8)),
        "magiccharge" to PatternDefinition("magicCharge", "Gaming", mapOf("duration" to 1.0)),
        "machinegun" to PatternDefinition("machineGun", "Gaming", mapOf("duration" to 2.0)),
        "cascade" to PatternDefinition("cascade", "Gaming", mapOf("duration" to 0.8)),
        "elasticbounce" to PatternDefinition("elasticBounce", "Gaming", mapOf("duration" to 2.0)),
        "drums" to PatternDefinition("drums", "Gaming", mapOf()),
        "achievementunlocked" to PatternDefinition("achievementUnlocked", "Educational", mapOf("duration" to 1.2)),
        "levelup" to PatternDefinition("levelUp", "Educational", mapOf("duration" to 1.5)),
        "starrating" to PatternDefinition("starRating", "Educational", mapOf("count" to 3, "duration" to 0.2)),
        "badgeearned" to PatternDefinition("badgeEarned", "Educational", mapOf("duration" to 0.8)),
        "streakmilestone" to PatternDefinition("streakMilestone", "Educational", mapOf("duration" to 1.0)),
        "perfectscore" to PatternDefinition("perfectScore", "Educational", mapOf("duration" to 1.0)),
        "rankpromotion" to PatternDefinition("rankPromotion", "Educational", mapOf("duration" to 1.5)),
        "dailygoalcomplete" to PatternDefinition("dailyGoalComplete", "Educational", mapOf("duration" to 1.0)),
        "trophyunlock" to PatternDefinition("trophyUnlock", "Educational", mapOf("duration" to 1.8)),
        "questcomplete" to PatternDefinition("questComplete", "Educational", mapOf("duration" to 1.5)),
        "highscore" to PatternDefinition("highScore", "Educational", mapOf("duration" to 1.5)),
        "masteryachieved" to PatternDefinition("masteryAchieved", "Educational", mapOf("duration" to 2.0)),
        "correctanswerbasic" to PatternDefinition("correctAnswerBasic", "Educational", mapOf("duration" to 0.2)),
        "correctanswersimple" to PatternDefinition("correctAnswerSimple", "Educational", mapOf("duration" to 0.25)),
        "correctanswerstreak" to PatternDefinition("correctAnswerStreak", "Educational", mapOf("streakCount" to 3, "duration" to 0.5)),
        "correctanswerperfect" to PatternDefinition("correctAnswerPerfect", "Educational", mapOf("duration" to 0.8)),
        "perfectlessoncomplete" to PatternDefinition("perfectLessonComplete", "Educational", mapOf("duration" to 2.0)),
        "badgeunlock" to PatternDefinition("badgeUnlock", "Educational", mapOf("duration" to 0.8)),
        "skillmastery" to PatternDefinition("skillMastery", "Educational", mapOf("duration" to 1.5)),
        "leaguepromotion" to PatternDefinition("leaguePromotion", "Educational", mapOf("duration" to 1.5)),
        "celebrationburst" to PatternDefinition("celebrationBurst", "Educational", mapOf("duration" to 1.0)),
        "ascendingsuccess" to PatternDefinition("ascendingSuccess", "Educational", mapOf("duration" to 0.6)),
        "correctanswer" to PatternDefinition("correctAnswer", "Educational", mapOf("duration" to 0.3)),
        "incorrectgentle" to PatternDefinition("incorrectGentle", "Educational", mapOf("duration" to 0.4)),
        "hintavailable" to PatternDefinition("hintAvailable", "Educational", mapOf("duration" to 0.5)),
        "progresscheckpoint" to PatternDefinition("progressCheckpoint", "Educational", mapOf("duration" to 0.6)),
        "encouragementtap" to PatternDefinition("encouragementTap", "Educational", mapOf("duration" to 0.3)),
        "skillunlocked" to PatternDefinition("skillUnlocked", "Educational", mapOf("duration" to 0.8)),
        "lessoncomplete" to PatternDefinition("lessonComplete", "Educational", mapOf("duration" to 1.0)),
        "practicereminder" to PatternDefinition("practiceReminder", "Educational", mapOf("duration" to 0.5)),
        "knowledgegained" to PatternDefinition("knowledgeGained", "Educational", mapOf("duration" to 0.7)),
        "feedbackpositive" to PatternDefinition("feedbackPositive", "Educational", mapOf("duration" to 0.4)),
        "wronganswergentle" to PatternDefinition("wrongAnswerGentle", "Educational", mapOf("duration" to 0.5)),
        "wronganswerstandard" to PatternDefinition("wrongAnswerStandard", "Educational", mapOf("duration" to 0.3)),
        "nearmissanswer" to PatternDefinition("nearMissAnswer", "Educational", mapOf("duration" to 0.35)),
        "grammarerror" to PatternDefinition("grammarError", "Educational", mapOf("duration" to 0.25)),
        "hintactivation" to PatternDefinition("hintActivation", "Educational", mapOf("duration" to 0.3)),
        "hintreveal" to PatternDefinition("hintReveal", "Educational", mapOf("duration" to 0.3)),
        "timecriticalwarning" to PatternDefinition("timeCriticalWarning", "Educational", mapOf("duration" to 0.8)),
        "partialcredit" to PatternDefinition("partialCredit", "Educational", mapOf("duration" to 0.4)),
        "tryagainencouragement" to PatternDefinition("tryAgainEncouragement", "Educational", mapOf("duration" to 0.3)),
        "learningprogress" to PatternDefinition("learningProgress", "Educational", mapOf("duration" to 0.5)),
        "educationalfocusreminder" to PatternDefinition("educationalFocusReminder", "Educational", mapOf("duration" to 0.3)),
        "flashcardflip" to PatternDefinition("flashcardFlip", "Educational", mapOf("duration" to 0.2)),
        "quizstart" to PatternDefinition("quizStart", "Educational", mapOf("duration" to 1.0)),
        "xpgainsmall" to PatternDefinition("xpGainSmall", "Educational", mapOf("duration" to 0.3)),
        "xpgainlarge" to PatternDefinition("xpGainLarge", "Educational", mapOf("duration" to 1.0)),
        "xpgainbonus" to PatternDefinition("xpGainBonus", "Educational", mapOf("duration" to 0.5)),
        "xpgaindynamic" to PatternDefinition("xpGainDynamic", "Educational", mapOf("xpAmount" to 10, "duration" to 0.3)),
        "bonuspoints" to PatternDefinition("bonusPoints", "Educational", mapOf("duration" to 0.7)),
        "powerupcollected" to PatternDefinition("powerUpCollected", "Educational", mapOf("duration" to 0.5)),
        "lifegained" to PatternDefinition("lifeGained", "Educational", mapOf("duration" to 0.6)),
        "challengeaccepted" to PatternDefinition("challengeAccepted", "Educational", mapOf("duration" to 0.5)),
        "timertick" to PatternDefinition("timerTick", "Educational", mapOf("duration" to 0.1)),
        "rewardunlock" to PatternDefinition("rewardUnlock", "Educational", mapOf("duration" to 1.0)),
        "progressbarfill" to PatternDefinition("progressBarFill", "Educational", mapOf("duration" to 0.8)),
        "progressbarfilling" to PatternDefinition("progressBarFilling", "Educational", mapOf("startPercent" to 0.0, "endPercent" to 1.0, "duration" to 1.0)),
        "progress25" to PatternDefinition("progress25", "Educational", mapOf("duration" to 0.2)),
        "progress50" to PatternDefinition("progress50", "Educational", mapOf("duration" to 0.3)),
        "progress75" to PatternDefinition("progress75", "Educational", mapOf("duration" to 0.4)),
        "dailygoalcheckpoint" to PatternDefinition("dailyGoalCheckpoint", "Educational", mapOf("checkpointNumber" to 3, "duration" to 0.5)),
        "leagueadvancement" to PatternDefinition("leagueAdvancement", "Educational", mapOf("duration" to 1.2)),
        "crowngemcollection" to PatternDefinition("crownGemCollection", "Educational", mapOf("duration" to 0.6)),
        "powerupactivation" to PatternDefinition("powerUpActivation", "Educational", mapOf("powerUpType" to "default", "duration" to 0.5)),
        "challengecompletion" to PatternDefinition("challengeCompletion", "Educational", mapOf("isPerfect" to false, "duration" to 1.0)),
        "lessonpathprogress" to PatternDefinition("lessonPathProgress", "Educational", mapOf("nodeType" to "default", "duration" to 0.4)),
        "socialfeaturenotification" to PatternDefinition("socialFeatureNotification", "Educational", mapOf("notificationType" to "default", "duration" to 0.6)),
        "combomultiplier" to PatternDefinition("comboMultiplier", "Educational", mapOf("count" to 3, "duration" to 0.6)),
        "streakriskwarning" to PatternDefinition("streakRiskWarning", "Educational", mapOf("duration" to 0.6)),
        "streaklost" to PatternDefinition("streakLost", "Educational", mapOf("duration" to 0.5)),
        "streakbuilding" to PatternDefinition("streakBuilding", "Educational", mapOf("streakCount" to 3, "duration" to 0.5)),
        "streakmilestone5" to PatternDefinition("streakMilestone5", "Educational", mapOf("duration" to 0.6)),
        "streakmilestone7days" to PatternDefinition("streakMilestone7Days", "Educational", mapOf("duration" to 1.0)),
        "streakmilestone10" to PatternDefinition("streakMilestone10", "Educational", mapOf("duration" to 0.8)),
        "streakmilestone25" to PatternDefinition("streakMilestone25", "Educational", mapOf("duration" to 1.2)),
        "streakmilestone30days" to PatternDefinition("streakMilestone30Days", "Educational", mapOf("duration" to 1.5)),
        "streakmilestone100days" to PatternDefinition("streakMilestone100Days", "Educational", mapOf("duration" to 2.0)),
        "doubletaplike" to PatternDefinition("doubleTapLike", "UI Interaction", mapOf("duration" to 0.2)),
        "messagesent" to PatternDefinition("messageSent", "UI Interaction", mapOf("duration" to 0.25)),
        "notificationpop" to PatternDefinition("notificationPop", "UI Interaction", mapOf("duration" to 0.3)),
        "typingindicator" to PatternDefinition("typingIndicator", "UI Interaction", mapOf("duration" to 0.1)),
        "commentposted" to PatternDefinition("commentPosted", "UI Interaction", mapOf("duration" to 0.2)),
        "pulltorefresh" to PatternDefinition("pullToRefresh", "UI Interaction", mapOf("duration" to 0.4)),
        "swipeaction" to PatternDefinition("swipeAction", "UI Interaction", mapOf("duration" to 0.25, "actionType" to "default")),
        "toggleswitch" to PatternDefinition("toggleSwitch", "UI Interaction", mapOf("duration" to 0.2)),
        "pickerdetent" to PatternDefinition("pickerDetent", "UI Interaction", mapOf("duration" to 0.1)),
        "longpressactivation" to PatternDefinition("longPressActivation", "UI Interaction", mapOf("duration" to 0.4)),
        "tabselection" to PatternDefinition("tabSelection", "UI Interaction", mapOf("duration" to 0.15)),
        "navigationpush" to PatternDefinition("navigationPush", "UI Interaction", mapOf("duration" to 0.25)),
        "navigationpop" to PatternDefinition("navigationPop", "UI Interaction", mapOf("duration" to 0.2)),
        "modalpresent" to PatternDefinition("modalPresent", "UI Interaction", mapOf("duration" to 0.3)),
        "modaldismiss" to PatternDefinition("modalDismiss", "UI Interaction", mapOf("duration" to 0.25)),
        "keyboardtap" to PatternDefinition("keyboardTap", "UI Interaction", mapOf("duration" to 0.05)),
        "sliderstep" to PatternDefinition("sliderStep", "UI Interaction", mapOf("duration" to 0.05)),
        "slidertick" to PatternDefinition("sliderTick", "UI Interaction", mapOf("duration" to 0.05)),
        "buttonpress" to PatternDefinition("buttonPress", "UI Interaction", mapOf("duration" to 0.03)),
        "selectiontick" to PatternDefinition("selectionTick", "UI Interaction", mapOf("duration" to 0.1)),
        "segmentchange" to PatternDefinition("segmentChange", "UI Interaction", mapOf("duration" to 0.15)),
        "zoomboundary" to PatternDefinition("zoomBoundary", "UI Interaction", mapOf("duration" to 0.2)),
        "draganddrop" to PatternDefinition("dragAndDrop", "UI Interaction", mapOf("duration" to 0.25, "phase" to "start")),
        "formsubmit" to PatternDefinition("formSubmit", "UI Interaction", mapOf("duration" to 0.3)),
        "inputerror" to PatternDefinition("inputError", "UI Interaction", mapOf("duration" to 0.4)),
        "loadingcomplete" to PatternDefinition("loadingComplete", "UI Interaction", mapOf("duration" to 0.5)),
        "appicontap" to PatternDefinition("appIconTap", "UI Interaction", mapOf("duration" to 0.15)),
        "scrollbounce" to PatternDefinition("scrollBounce", "UI Interaction", mapOf("duration" to 0.3)),
        "pageflip" to PatternDefinition("pageFlip", "UI Interaction", mapOf("duration" to 0.3)),
        "photocapture" to PatternDefinition("photoCapture", "UI Interaction", mapOf("duration" to 0.2)),
        "shareaction" to PatternDefinition("shareAction", "UI Interaction", mapOf("duration" to 0.3)),
        "downloadcomplete" to PatternDefinition("downloadComplete", "UI Interaction", mapOf("duration" to 0.5)),
        "refreshdata" to PatternDefinition("refreshData", "UI Interaction", mapOf("duration" to 0.4)),
        "gesturerecognized" to PatternDefinition("gestureRecognized", "UI Interaction", mapOf("duration" to 0.2)),
        "pageturn" to PatternDefinition("pageTurn", "UI Interaction", mapOf("duration" to 0.3)),
        "bookpageturn" to PatternDefinition("bookPageTurn", "UI Interaction", mapOf("duration" to 0.25)),
        "softtick" to PatternDefinition("softTick", "UI Interaction", mapOf("duration" to 0.3)),
        "custompop" to PatternDefinition("customPop", "UI Interaction", mapOf("duration" to 0.15)),
        "contextualmenu" to PatternDefinition("contextualMenu", "UI Interaction", mapOf("duration" to 0.25)),
        "slidervaluechange" to PatternDefinition("sliderValueChange", "UI Interaction", mapOf("duration" to 0.06)),
        "pop" to PatternDefinition("pop", "UI Interaction", mapOf("duration" to 0.2)),
        "magicsparkle" to PatternDefinition("magicSparkle", "Special Effect", mapOf("duration" to 1.2)),
        "belltoll" to PatternDefinition("bellToll", "Special Effect", mapOf("duration" to 0.399)),
        "bassdrop" to PatternDefinition("bassDrop", "Sound Effects", mapOf("duration" to 0.071)),
        "breath" to PatternDefinition("breath", "Sound Effects", mapOf("duration" to 3.2)),
        "buzz" to PatternDefinition("buzz", "Sound Effects", mapOf("duration" to 0.35)),
        "dogbark" to PatternDefinition("dogBark", "Sound Effects", mapOf("duration" to 0.5)),
        "flare" to PatternDefinition("flare", "Sound Effects", mapOf("duration" to 0.38)),
        "glitch" to PatternDefinition("glitch", "Sound Effects", mapOf("duration" to 0.22)),
        "guitarstrum" to PatternDefinition("guitarStrum", "Sound Effects", mapOf("duration" to 1.4)),
        "knock" to PatternDefinition("knock", "Sound Effects", mapOf("duration" to 0.76)),
        "passingcar" to PatternDefinition("passingCar", "Sound Effects", mapOf("duration" to 1.1)),
        "powerdown" to PatternDefinition("powerDown", "Sound Effects", mapOf("duration" to 1.8)),
        "sonar" to PatternDefinition("sonar", "Sound Effects", mapOf("duration" to 2.0)),
        "waterdrop" to PatternDefinition("waterDrop", "Special Effect", mapOf("duration" to 0.6)),
        "specialearthquake" to PatternDefinition("specialEarthquake", "Special Effect", mapOf("duration" to 2.5)),
        "laserbeam" to PatternDefinition("laserBeam", "Special Effect", mapOf("duration" to 0.8)),
        "typewriter" to PatternDefinition("typewriter", "Special Effect", mapOf("duration" to 0.04)),
        "heartbeat" to PatternDefinition("heartbeat", "Special Effect", mapOf("duration" to 1.5)),
        "electricspark" to PatternDefinition("electricSpark", "Special Effect", mapOf("duration" to 0.3)),
        "rubberband" to PatternDefinition("rubberBand", "Special Effect", mapOf("duration" to 0.4)),
        "buildup" to PatternDefinition("buildUp", "Special Effect", mapOf("duration" to 2.0)),
        "boing" to PatternDefinition("boing", "Special Effect", mapOf("duration" to 0.25)),
        "inflate" to PatternDefinition("inflate", "Special Effect", mapOf("duration" to 1.7)),
        "oscillate" to PatternDefinition("oscillate", "Special Effect", mapOf("duration" to 3.0)),
        "breathingguide" to PatternDefinition("breathingGuide", "Wellness", mapOf("duration" to 4.0)),
        "calmpulse" to PatternDefinition("calmPulse", "Wellness", mapOf("duration" to 2.0)),
        "meditationbell" to PatternDefinition("meditationBell", "Wellness", mapOf("duration" to 1.5)),
        "relaxationwave" to PatternDefinition("relaxationWave", "Wellness", mapOf("duration" to 3.0)),
        "zennotification" to PatternDefinition("zenNotification", "Wellness", mapOf("duration" to 1.2)),
        "timewarning30s" to PatternDefinition("timeWarning30s", "Wellness", mapOf("duration" to 0.5)),
        "timewarning10s" to PatternDefinition("timeWarning10s", "Wellness", mapOf("duration" to 0.8)),
        "heartbeats" to PatternDefinition("heartBeats", "Wellness", mapOf("count" to 3, "durationPerBeat" to 0.255)),
        "timercomplete" to PatternDefinition("timerComplete", "Productivity", mapOf("duration" to 1.5)),
        "taskcheck" to PatternDefinition("taskCheck", "Productivity", mapOf("duration" to 0.2)),
        "focusstart" to PatternDefinition("focusStart", "Productivity", mapOf("duration" to 0.8)),
        "breakreminder" to PatternDefinition("breakReminder", "Productivity", mapOf("duration" to 1.2)),
        "productivityfocusreminder" to PatternDefinition("productivityFocusReminder", "Productivity", mapOf("duration" to 0.25)),
        "paymentsuccess" to PatternDefinition("paymentSuccess", "Finance", mapOf("duration" to 0.1)),
        "paymentprocessing" to PatternDefinition("paymentProcessing", "Finance", mapOf("duration" to 2.0)),
        "transactionalert" to PatternDefinition("transactionAlert", "Finance", mapOf("duration" to 0.5)),
        "receiptsaved" to PatternDefinition("receiptSaved", "Finance", mapOf("duration" to 0.4)),
        "excitementbuild" to PatternDefinition("excitementBuild", "Emotional", mapOf("duration" to 2.0)),
        "disappointment" to PatternDefinition("disappointment", "Emotional", mapOf("duration" to 0.8)),
        "surprise" to PatternDefinition("surprise", "Emotional", mapOf("duration" to 0.5)),
        "joy" to PatternDefinition("joy", "Emotional", mapOf("duration" to 1.2)),
        "anticipation" to PatternDefinition("anticipation", "Emotional", mapOf("duration" to 2.0)),
        "fireburst" to PatternDefinition("fireBurst", "Intense Gamification", mapOf("duration" to 1.0)),
        "iceshard" to PatternDefinition("iceShard", "Intense Gamification", mapOf("duration" to 1.5)),
        "earthquakerumble" to PatternDefinition("earthquakeRumble", "Intense Gamification", mapOf("duration" to 2.5)),
        "windtornado" to PatternDefinition("windTornado", "Intense Gamification", mapOf("duration" to 1.8)),
        "thunderstorm" to PatternDefinition("thunderStorm", "Intense Gamification", mapOf("duration" to 2.5)),
        "meteorimpact" to PatternDefinition("meteorImpact", "Intense Gamification", mapOf("duration" to 3.0)),
        "intenseearthquake" to PatternDefinition("intenseEarthquake", "Intense Gamification", mapOf("duration" to 2.5)),
        "intensetornado" to PatternDefinition("intenseTornado", "Intense Gamification", mapOf("duration" to 1.8)),
        "plasmacharge" to PatternDefinition("plasmaCharge", "Intense Gamification", mapOf("duration" to 1.5)),
        "gravitywell" to PatternDefinition("gravityWell", "Intense Gamification", mapOf("duration" to 2.0)),
        "photonblast" to PatternDefinition("photonBlast", "Intense Gamification", mapOf("duration" to 0.8)),
        "quantumshift" to PatternDefinition("quantumShift", "Intense Gamification", mapOf("duration" to 0.6)),
        "rocketlaunch" to PatternDefinition("rocketLaunch", "Intense Gamification", mapOf("duration" to 3.0)),
        "warpdrive" to PatternDefinition("warpDrive", "Intense Gamification", mapOf("duration" to 2.0)),
        "lasercannon" to PatternDefinition("laserCannon", "Intense Gamification", mapOf("duration" to 0.5)),
        "alienteleport" to PatternDefinition("alienTeleport", "Intense Gamification", mapOf("duration" to 1.0)),
        "spaceexplosion" to PatternDefinition("spaceExplosion", "Intense Gamification", mapOf("duration" to 2.5)),
        "ultimatepower" to PatternDefinition("ultimatePower", "Intense Gamification", mapOf("duration" to 3.0)),
        "dragonroar" to PatternDefinition("dragonRoar", "Intense Gamification", mapOf("duration" to 2.0)),
        "titansmash" to PatternDefinition("titanSmash", "Intense Gamification", mapOf("duration" to 1.5)),
        "dimensionalrift" to PatternDefinition("dimensionalRift", "Intense Gamification", mapOf("duration" to 2.5)),
        "volcaniceruption" to PatternDefinition("volcanicEruption", "Intense Gamification", mapOf("duration" to 3.5)),
        "titanstomp" to PatternDefinition("titanStomp", "Intense Gamification", mapOf("duration" to 1.5)),
        "phoenixrebirth" to PatternDefinition("phoenixRebirth", "Intense Gamification", mapOf("duration" to 2.0)),
        "divineintervention" to PatternDefinition("divineIntervention", "Intense Gamification", mapOf("duration" to 2.5)),
        "megaboost" to PatternDefinition("megaBoost", "Intense Gamification", mapOf("duration" to 1.5)),
        "starpower" to PatternDefinition("starPower", "Intense Gamification", mapOf("duration" to 2.0)),
        "berserkerrage" to PatternDefinition("berserkerRage", "Intense Gamification", mapOf("duration" to 2.0)),
        "divineshield" to PatternDefinition("divineShield", "Intense Gamification", mapOf("duration" to 1.5)),
        "invincibilityactivation" to PatternDefinition("invincibilityActivation", "Intense Gamification", mapOf("duration" to 2.0)),
        "timefreeze" to PatternDefinition("timeFreeze", "Intense Gamification", mapOf("duration" to 2.5)),
        "ultracombo" to PatternDefinition("ultraCombo", "Intense Gamification", mapOf("duration" to 3.0)),
        "nuclearcharge" to PatternDefinition("nuclearCharge", "Intense Gamification", mapOf("duration" to 2.5)),
        "starrating1" to PatternDefinition("starRating1", "Ratings & Feedback", mapOf("duration" to 0.1)),
        "starrating3" to PatternDefinition("starRating3", "Ratings & Feedback", mapOf("duration" to 0.3)),
        "starrating5" to PatternDefinition("starRating5", "Ratings & Feedback", mapOf("duration" to 0.8)),
        "socialnotification" to PatternDefinition("socialNotification", "Ratings & Feedback", mapOf("notificationType" to "default", "duration" to 0.4)),
        "pencilwrite" to PatternDefinition("pencilWrite", "Tools & Writing", mapOf("duration" to 0.05)),
        "eraseruse" to PatternDefinition("eraserUse", "Tools & Writing", mapOf("duration" to 0.2))
  )

  fun names(): List<String> = definitions.values.map { it.name }

  fun pattern(name: String, optionsJson: String): HapticBlueprint? {
    val definition = definitions[name.lowercase()] ?: return null
    val options = runCatching { JSONObject(optionsJson.ifBlank { "{}" }) }.getOrDefault(JSONObject())
    val generated = GeneratedHapticPatternCatalog.pattern(definition.name)
    if (generated != null) {
      return scaleGeneratedPattern(definition.name, generated, options)
    }
    return buildPattern(definition, options)
  }

  private fun scaleGeneratedPattern(name: String, pattern: HapticBlueprint, options: JSONObject): HapticBlueprint {
    val explicitDuration = options.optDouble("duration", Double.NaN)
    if (explicitDuration.isNaN()) return pattern

    val defaultDuration = GeneratedHapticPatternCatalog.defaultDurationMillis(name) ?: return pattern
    if (defaultDuration <= 0L) return pattern

    val targetDuration = max(30L, (explicitDuration * 1000.0).roundToLong())
    val scale = targetDuration.toDouble() / defaultDuration.toDouble()
    return HapticBlueprint(
      envelope = TextureEnvelope(
        amplitude = pattern.envelope.amplitude.map { it.copy(time = scaleTime(it.time, scale)) },
        frequency = pattern.envelope.frequency.map { it.copy(time = scaleTime(it.time, scale)) }
      ),
      impacts = pattern.impacts.map { it.copy(time = scaleTime(it.time, scale)) }
    )
  }

  private fun scaleTime(time: Long, scale: Double): Long = max(0L, (time.toDouble() * scale).roundToLong())

  private fun buildPattern(definition: PatternDefinition, options: JSONObject): HapticBlueprint {
    val durationMs = durationMillis(definition, options)
    val seed = abs(definition.name.hashCode())
    val categoryBoost = when (definition.category) {
      "Gaming", "Intense Gamification", "Special Effect" -> 0.2f
      "Wellness", "Productivity" -> -0.1f
      else -> 0f
    }
    val baseAmplitude = (0.45f + ((seed % 40) / 100f) + categoryBoost).coerceIn(0.2f, 1f)
    val baseFrequency = (0.25f + (((seed / 7) % 65) / 100f)).coerceIn(0.05f, 1f)
    val pulseCount = pulseCount(definition, durationMs, seed)
    val spacing = max(35L, durationMs / max(1, pulseCount))

    val discrete = (0 until pulseCount).map { index ->
      val progress = if (pulseCount == 1) 0f else index.toFloat() / (pulseCount - 1).toFloat()
      HapticKeyframe(
        time = min(durationMs - 1L, index * spacing),
        amplitude = (baseAmplitude * (1f - progress * 0.35f)).coerceIn(0.12f, 1f),
        frequency = (baseFrequency + progress * 0.25f).coerceIn(0f, 1f)
      )
    }

    val continuousAmplitude = when {
      durationMs < 120L -> emptyList()
      definition.category == "Wellness" -> listOf(
        EnvelopePoint(0, 0f),
        EnvelopePoint(durationMs / 3, baseAmplitude * 0.65f),
        EnvelopePoint(durationMs * 2 / 3, baseAmplitude * 0.45f),
        EnvelopePoint(durationMs, 0f)
      )
      definition.category == "Intense Gamification" -> listOf(
        EnvelopePoint(0, baseAmplitude),
        EnvelopePoint(durationMs / 2, (baseAmplitude * 0.9f).coerceIn(0f, 1f)),
        EnvelopePoint(durationMs, 0f)
      )
      else -> listOf(
        EnvelopePoint(0, 0f),
        EnvelopePoint(min(40L, durationMs / 4), baseAmplitude * 0.55f),
        EnvelopePoint(durationMs, 0f)
      )
    }

    val continuousFrequency = if (continuousAmplitude.isEmpty()) emptyList() else listOf(
      EnvelopePoint(0, baseFrequency),
      EnvelopePoint(durationMs, (baseFrequency + 0.2f).coerceIn(0f, 1f))
    )

    return HapticBlueprint(
      envelope = TextureEnvelope(continuousAmplitude, continuousFrequency),
      impacts = discrete
    )
  }

  private fun durationMillis(definition: PatternDefinition, options: JSONObject): Long {
    val explicit = options.optDouble("duration", Double.NaN)
    if (!explicit.isNaN()) return max(30L, (explicit * 1000.0).toLong())
    val defaultDuration = definition.defaults["duration"] as? Double
    if (defaultDuration != null) return max(30L, (defaultDuration * 1000.0).toLong())
    val beat = (definition.defaults["durationPerBeat"] as? Double) ?: 0.255
    val count = (definition.defaults["count"] as? Int) ?: 3
    return max(30L, (beat * count * 1000.0).toLong())
  }

  private fun pulseCount(definition: PatternDefinition, durationMs: Long, seed: Int): Int {
    val countDefault = definition.defaults["count"] as? Int
    if (countDefault != null) return countDefault.coerceIn(1, 12)
    if (definition.name.contains("machine", ignoreCase = true)) return 12
    if (definition.name.contains("rating", ignoreCase = true)) return 3
    return when {
      durationMs < 180L -> 1
      durationMs < 450L -> 2 + seed % 2
      durationMs < 1000L -> 3 + seed % 3
      else -> 5 + seed % 5
    }
  }
}
