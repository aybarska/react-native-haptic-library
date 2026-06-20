// Generated from the native haptic preset catalog.
import Native from './NativeHapticLibrary';
import { normalizeOptions } from './patterns';
import type { HapticOptions } from './types';

export const Presets = {
  selection: (options?: HapticOptions) => {
    Native.play('selection', normalizeOptions(options));
  },
  soft: (options?: HapticOptions) => {
    Native.play('soft', normalizeOptions(options));
  },
  rigid: (options?: HapticOptions) => {
    Native.play('rigid', normalizeOptions(options));
  },
  light: (options?: HapticOptions) => {
    Native.play('light', normalizeOptions(options));
  },
  medium: (options?: HapticOptions) => {
    Native.play('medium', normalizeOptions(options));
  },
  heavy: (options?: HapticOptions) => {
    Native.play('heavy', normalizeOptions(options));
  },
  success: (options?: HapticOptions) => {
    Native.play('success', normalizeOptions(options));
  },
  error: (options?: HapticOptions) => {
    Native.play('error', normalizeOptions(options));
  },
  warning: (options?: HapticOptions) => {
    Native.play('warning', normalizeOptions(options));
  },
  lightningStrikeQuick: (options?: HapticOptions) => {
    Native.play('lightningStrikeQuick', normalizeOptions(options));
  },
  lightningStrikeChain: (options?: HapticOptions) => {
    Native.play('lightningStrikeChain', normalizeOptions(options));
  },
  lightningStrikeHeavy: (options?: HapticOptions) => {
    Native.play('lightningStrikeHeavy', normalizeOptions(options));
  },
  coinCollectSingle: (options?: HapticOptions) => {
    Native.play('coinCollectSingle', normalizeOptions(options));
  },
  coinCollectMulti: (options?: HapticOptions) => {
    Native.play('coinCollectMulti', normalizeOptions(options));
  },
  coinCollectJackpot: (options?: HapticOptions) => {
    Native.play('coinCollectJackpot', normalizeOptions(options));
  },
  swordSlashLight: (options?: HapticOptions) => {
    Native.play('swordSlashLight', normalizeOptions(options));
  },
  swordSlashHeavy: (options?: HapticOptions) => {
    Native.play('swordSlashHeavy', normalizeOptions(options));
  },
  arrowRelease: (options?: HapticOptions) => {
    Native.play('arrowRelease', normalizeOptions(options));
  },
  explosionSmall: (options?: HapticOptions) => {
    Native.play('explosionSmall', normalizeOptions(options));
  },
  explosionMassive: (options?: HapticOptions) => {
    Native.play('explosionMassive', normalizeOptions(options));
  },
  shieldBlock: (options?: HapticOptions) => {
    Native.play('shieldBlock', normalizeOptions(options));
  },
  criticalHit: (options?: HapticOptions) => {
    Native.play('criticalHit', normalizeOptions(options));
  },
  comboHit3x: (options?: HapticOptions) => {
    Native.play('comboHit3x', normalizeOptions(options));
  },
  comboHit5x: (options?: HapticOptions) => {
    Native.play('comboHit5x', normalizeOptions(options));
  },
  footstepGrass: (options?: HapticOptions) => {
    Native.play('footstepGrass', normalizeOptions(options));
  },
  footstepMetal: (options?: HapticOptions) => {
    Native.play('footstepMetal', normalizeOptions(options));
  },
  engineStart: (options?: HapticOptions) => {
    Native.play('engineStart', normalizeOptions(options));
  },
  turboBoost: (options?: HapticOptions) => {
    Native.play('turboBoost', normalizeOptions(options));
  },
  portalEnter: (options?: HapticOptions) => {
    Native.play('portalEnter', normalizeOptions(options));
  },
  magicCharge: (options?: HapticOptions) => {
    Native.play('magicCharge', normalizeOptions(options));
  },
  machineGun: (options?: HapticOptions) => {
    Native.play('machineGun', normalizeOptions(options));
  },
  cascade: (options?: HapticOptions) => {
    Native.play('cascade', normalizeOptions(options));
  },
  elasticBounce: (options?: HapticOptions) => {
    Native.play('elasticBounce', normalizeOptions(options));
  },
  drums: (options?: HapticOptions) => {
    Native.play('drums', normalizeOptions(options));
  },
  achievementUnlocked: (options?: HapticOptions) => {
    Native.play('achievementUnlocked', normalizeOptions(options));
  },
  levelUp: (options?: HapticOptions) => {
    Native.play('levelUp', normalizeOptions(options));
  },
  starRating: (options?: HapticOptions) => {
    Native.play('starRating', normalizeOptions(options));
  },
  badgeEarned: (options?: HapticOptions) => {
    Native.play('badgeEarned', normalizeOptions(options));
  },
  streakMilestone: (options?: HapticOptions) => {
    Native.play('streakMilestone', normalizeOptions(options));
  },
  perfectScore: (options?: HapticOptions) => {
    Native.play('perfectScore', normalizeOptions(options));
  },
  rankPromotion: (options?: HapticOptions) => {
    Native.play('rankPromotion', normalizeOptions(options));
  },
  dailyGoalComplete: (options?: HapticOptions) => {
    Native.play('dailyGoalComplete', normalizeOptions(options));
  },
  trophyUnlock: (options?: HapticOptions) => {
    Native.play('trophyUnlock', normalizeOptions(options));
  },
  questComplete: (options?: HapticOptions) => {
    Native.play('questComplete', normalizeOptions(options));
  },
  highScore: (options?: HapticOptions) => {
    Native.play('highScore', normalizeOptions(options));
  },
  masteryAchieved: (options?: HapticOptions) => {
    Native.play('masteryAchieved', normalizeOptions(options));
  },
  correctAnswerBasic: (options?: HapticOptions) => {
    Native.play('correctAnswerBasic', normalizeOptions(options));
  },
  correctAnswerSimple: (options?: HapticOptions) => {
    Native.play('correctAnswerSimple', normalizeOptions(options));
  },
  correctAnswerStreak: (options?: HapticOptions) => {
    Native.play('correctAnswerStreak', normalizeOptions(options));
  },
  correctAnswerPerfect: (options?: HapticOptions) => {
    Native.play('correctAnswerPerfect', normalizeOptions(options));
  },
  perfectLessonComplete: (options?: HapticOptions) => {
    Native.play('perfectLessonComplete', normalizeOptions(options));
  },
  badgeUnlock: (options?: HapticOptions) => {
    Native.play('badgeUnlock', normalizeOptions(options));
  },
  skillMastery: (options?: HapticOptions) => {
    Native.play('skillMastery', normalizeOptions(options));
  },
  leaguePromotion: (options?: HapticOptions) => {
    Native.play('leaguePromotion', normalizeOptions(options));
  },
  celebrationBurst: (options?: HapticOptions) => {
    Native.play('celebrationBurst', normalizeOptions(options));
  },
  ascendingSuccess: (options?: HapticOptions) => {
    Native.play('ascendingSuccess', normalizeOptions(options));
  },
  correctAnswer: (options?: HapticOptions) => {
    Native.play('correctAnswer', normalizeOptions(options));
  },
  incorrectGentle: (options?: HapticOptions) => {
    Native.play('incorrectGentle', normalizeOptions(options));
  },
  hintAvailable: (options?: HapticOptions) => {
    Native.play('hintAvailable', normalizeOptions(options));
  },
  progressCheckpoint: (options?: HapticOptions) => {
    Native.play('progressCheckpoint', normalizeOptions(options));
  },
  encouragementTap: (options?: HapticOptions) => {
    Native.play('encouragementTap', normalizeOptions(options));
  },
  skillUnlocked: (options?: HapticOptions) => {
    Native.play('skillUnlocked', normalizeOptions(options));
  },
  lessonComplete: (options?: HapticOptions) => {
    Native.play('lessonComplete', normalizeOptions(options));
  },
  practiceReminder: (options?: HapticOptions) => {
    Native.play('practiceReminder', normalizeOptions(options));
  },
  knowledgeGained: (options?: HapticOptions) => {
    Native.play('knowledgeGained', normalizeOptions(options));
  },
  feedbackPositive: (options?: HapticOptions) => {
    Native.play('feedbackPositive', normalizeOptions(options));
  },
  wrongAnswerGentle: (options?: HapticOptions) => {
    Native.play('wrongAnswerGentle', normalizeOptions(options));
  },
  wrongAnswerStandard: (options?: HapticOptions) => {
    Native.play('wrongAnswerStandard', normalizeOptions(options));
  },
  nearMissAnswer: (options?: HapticOptions) => {
    Native.play('nearMissAnswer', normalizeOptions(options));
  },
  grammarError: (options?: HapticOptions) => {
    Native.play('grammarError', normalizeOptions(options));
  },
  hintActivation: (options?: HapticOptions) => {
    Native.play('hintActivation', normalizeOptions(options));
  },
  hintReveal: (options?: HapticOptions) => {
    Native.play('hintReveal', normalizeOptions(options));
  },
  timeCriticalWarning: (options?: HapticOptions) => {
    Native.play('timeCriticalWarning', normalizeOptions(options));
  },
  partialCredit: (options?: HapticOptions) => {
    Native.play('partialCredit', normalizeOptions(options));
  },
  tryAgainEncouragement: (options?: HapticOptions) => {
    Native.play('tryAgainEncouragement', normalizeOptions(options));
  },
  learningProgress: (options?: HapticOptions) => {
    Native.play('learningProgress', normalizeOptions(options));
  },
  educationalFocusReminder: (options?: HapticOptions) => {
    Native.play('educationalFocusReminder', normalizeOptions(options));
  },
  flashcardFlip: (options?: HapticOptions) => {
    Native.play('flashcardFlip', normalizeOptions(options));
  },
  quizStart: (options?: HapticOptions) => {
    Native.play('quizStart', normalizeOptions(options));
  },
  xpGainSmall: (options?: HapticOptions) => {
    Native.play('xpGainSmall', normalizeOptions(options));
  },
  xpGainLarge: (options?: HapticOptions) => {
    Native.play('xpGainLarge', normalizeOptions(options));
  },
  xpGainBonus: (options?: HapticOptions) => {
    Native.play('xpGainBonus', normalizeOptions(options));
  },
  xpGainDynamic: (options?: HapticOptions) => {
    Native.play('xpGainDynamic', normalizeOptions(options));
  },
  bonusPoints: (options?: HapticOptions) => {
    Native.play('bonusPoints', normalizeOptions(options));
  },
  powerUpCollected: (options?: HapticOptions) => {
    Native.play('powerUpCollected', normalizeOptions(options));
  },
  lifeGained: (options?: HapticOptions) => {
    Native.play('lifeGained', normalizeOptions(options));
  },
  challengeAccepted: (options?: HapticOptions) => {
    Native.play('challengeAccepted', normalizeOptions(options));
  },
  timerTick: (options?: HapticOptions) => {
    Native.play('timerTick', normalizeOptions(options));
  },
  rewardUnlock: (options?: HapticOptions) => {
    Native.play('rewardUnlock', normalizeOptions(options));
  },
  progressBarFill: (options?: HapticOptions) => {
    Native.play('progressBarFill', normalizeOptions(options));
  },
  progressBarFilling: (options?: HapticOptions) => {
    Native.play('progressBarFilling', normalizeOptions(options));
  },
  progress25: (options?: HapticOptions) => {
    Native.play('progress25', normalizeOptions(options));
  },
  progress50: (options?: HapticOptions) => {
    Native.play('progress50', normalizeOptions(options));
  },
  progress75: (options?: HapticOptions) => {
    Native.play('progress75', normalizeOptions(options));
  },
  dailyGoalCheckpoint: (options?: HapticOptions) => {
    Native.play('dailyGoalCheckpoint', normalizeOptions(options));
  },
  leagueAdvancement: (options?: HapticOptions) => {
    Native.play('leagueAdvancement', normalizeOptions(options));
  },
  crownGemCollection: (options?: HapticOptions) => {
    Native.play('crownGemCollection', normalizeOptions(options));
  },
  powerUpActivation: (options?: HapticOptions) => {
    Native.play('powerUpActivation', normalizeOptions(options));
  },
  challengeCompletion: (options?: HapticOptions) => {
    Native.play('challengeCompletion', normalizeOptions(options));
  },
  lessonPathProgress: (options?: HapticOptions) => {
    Native.play('lessonPathProgress', normalizeOptions(options));
  },
  socialFeatureNotification: (options?: HapticOptions) => {
    Native.play('socialFeatureNotification', normalizeOptions(options));
  },
  comboMultiplier: (options?: HapticOptions) => {
    Native.play('comboMultiplier', normalizeOptions(options));
  },
  streakRiskWarning: (options?: HapticOptions) => {
    Native.play('streakRiskWarning', normalizeOptions(options));
  },
  streakLost: (options?: HapticOptions) => {
    Native.play('streakLost', normalizeOptions(options));
  },
  streakBuilding: (options?: HapticOptions) => {
    Native.play('streakBuilding', normalizeOptions(options));
  },
  streakMilestone5: (options?: HapticOptions) => {
    Native.play('streakMilestone5', normalizeOptions(options));
  },
  streakMilestone7Days: (options?: HapticOptions) => {
    Native.play('streakMilestone7Days', normalizeOptions(options));
  },
  streakMilestone10: (options?: HapticOptions) => {
    Native.play('streakMilestone10', normalizeOptions(options));
  },
  streakMilestone25: (options?: HapticOptions) => {
    Native.play('streakMilestone25', normalizeOptions(options));
  },
  streakMilestone30Days: (options?: HapticOptions) => {
    Native.play('streakMilestone30Days', normalizeOptions(options));
  },
  streakMilestone100Days: (options?: HapticOptions) => {
    Native.play('streakMilestone100Days', normalizeOptions(options));
  },
  doubleTapLike: (options?: HapticOptions) => {
    Native.play('doubleTapLike', normalizeOptions(options));
  },
  messageSent: (options?: HapticOptions) => {
    Native.play('messageSent', normalizeOptions(options));
  },
  notificationPop: (options?: HapticOptions) => {
    Native.play('notificationPop', normalizeOptions(options));
  },
  typingIndicator: (options?: HapticOptions) => {
    Native.play('typingIndicator', normalizeOptions(options));
  },
  commentPosted: (options?: HapticOptions) => {
    Native.play('commentPosted', normalizeOptions(options));
  },
  pullToRefresh: (options?: HapticOptions) => {
    Native.play('pullToRefresh', normalizeOptions(options));
  },
  swipeAction: (options?: HapticOptions) => {
    Native.play('swipeAction', normalizeOptions(options));
  },
  toggleSwitch: (options?: HapticOptions) => {
    Native.play('toggleSwitch', normalizeOptions(options));
  },
  pickerDetent: (options?: HapticOptions) => {
    Native.play('pickerDetent', normalizeOptions(options));
  },
  longPressActivation: (options?: HapticOptions) => {
    Native.play('longPressActivation', normalizeOptions(options));
  },
  tabSelection: (options?: HapticOptions) => {
    Native.play('tabSelection', normalizeOptions(options));
  },
  navigationPush: (options?: HapticOptions) => {
    Native.play('navigationPush', normalizeOptions(options));
  },
  navigationPop: (options?: HapticOptions) => {
    Native.play('navigationPop', normalizeOptions(options));
  },
  modalPresent: (options?: HapticOptions) => {
    Native.play('modalPresent', normalizeOptions(options));
  },
  modalDismiss: (options?: HapticOptions) => {
    Native.play('modalDismiss', normalizeOptions(options));
  },
  keyboardTap: (options?: HapticOptions) => {
    Native.play('keyboardTap', normalizeOptions(options));
  },
  sliderStep: (options?: HapticOptions) => {
    Native.play('sliderStep', normalizeOptions(options));
  },
  sliderTick: (options?: HapticOptions) => {
    Native.play('sliderTick', normalizeOptions(options));
  },
  buttonPress: (options?: HapticOptions) => {
    Native.play('buttonPress', normalizeOptions(options));
  },
  selectionTick: (options?: HapticOptions) => {
    Native.play('selectionTick', normalizeOptions(options));
  },
  segmentChange: (options?: HapticOptions) => {
    Native.play('segmentChange', normalizeOptions(options));
  },
  zoomBoundary: (options?: HapticOptions) => {
    Native.play('zoomBoundary', normalizeOptions(options));
  },
  dragAndDrop: (options?: HapticOptions) => {
    Native.play('dragAndDrop', normalizeOptions(options));
  },
  formSubmit: (options?: HapticOptions) => {
    Native.play('formSubmit', normalizeOptions(options));
  },
  inputError: (options?: HapticOptions) => {
    Native.play('inputError', normalizeOptions(options));
  },
  loadingComplete: (options?: HapticOptions) => {
    Native.play('loadingComplete', normalizeOptions(options));
  },
  appIconTap: (options?: HapticOptions) => {
    Native.play('appIconTap', normalizeOptions(options));
  },
  scrollBounce: (options?: HapticOptions) => {
    Native.play('scrollBounce', normalizeOptions(options));
  },
  pageFlip: (options?: HapticOptions) => {
    Native.play('pageFlip', normalizeOptions(options));
  },
  photoCapture: (options?: HapticOptions) => {
    Native.play('photoCapture', normalizeOptions(options));
  },
  shareAction: (options?: HapticOptions) => {
    Native.play('shareAction', normalizeOptions(options));
  },
  downloadComplete: (options?: HapticOptions) => {
    Native.play('downloadComplete', normalizeOptions(options));
  },
  refreshData: (options?: HapticOptions) => {
    Native.play('refreshData', normalizeOptions(options));
  },
  gestureRecognized: (options?: HapticOptions) => {
    Native.play('gestureRecognized', normalizeOptions(options));
  },
  pageTurn: (options?: HapticOptions) => {
    Native.play('pageTurn', normalizeOptions(options));
  },
  bookPageTurn: (options?: HapticOptions) => {
    Native.play('bookPageTurn', normalizeOptions(options));
  },
  softTick: (options?: HapticOptions) => {
    Native.play('softTick', normalizeOptions(options));
  },
  customPop: (options?: HapticOptions) => {
    Native.play('customPop', normalizeOptions(options));
  },
  contextualMenu: (options?: HapticOptions) => {
    Native.play('contextualMenu', normalizeOptions(options));
  },
  sliderValueChange: (options?: HapticOptions) => {
    Native.play('sliderValueChange', normalizeOptions(options));
  },
  pop: (options?: HapticOptions) => {
    Native.play('pop', normalizeOptions(options));
  },
  magicSparkle: (options?: HapticOptions) => {
    Native.play('magicSparkle', normalizeOptions(options));
  },
  waterDrop: (options?: HapticOptions) => {
    Native.play('waterDrop', normalizeOptions(options));
  },
  specialEarthquake: (options?: HapticOptions) => {
    Native.play('specialEarthquake', normalizeOptions(options));
  },
  laserBeam: (options?: HapticOptions) => {
    Native.play('laserBeam', normalizeOptions(options));
  },
  typewriter: (options?: HapticOptions) => {
    Native.play('typewriter', normalizeOptions(options));
  },
  heartbeat: (options?: HapticOptions) => {
    Native.play('heartbeat', normalizeOptions(options));
  },
  electricSpark: (options?: HapticOptions) => {
    Native.play('electricSpark', normalizeOptions(options));
  },
  rubberBand: (options?: HapticOptions) => {
    Native.play('rubberBand', normalizeOptions(options));
  },
  buildUp: (options?: HapticOptions) => {
    Native.play('buildUp', normalizeOptions(options));
  },
  boing: (options?: HapticOptions) => {
    Native.play('boing', normalizeOptions(options));
  },
  inflate: (options?: HapticOptions) => {
    Native.play('inflate', normalizeOptions(options));
  },
  oscillate: (options?: HapticOptions) => {
    Native.play('oscillate', normalizeOptions(options));
  },
  breathingGuide: (options?: HapticOptions) => {
    Native.play('breathingGuide', normalizeOptions(options));
  },
  calmPulse: (options?: HapticOptions) => {
    Native.play('calmPulse', normalizeOptions(options));
  },
  meditationBell: (options?: HapticOptions) => {
    Native.play('meditationBell', normalizeOptions(options));
  },
  relaxationWave: (options?: HapticOptions) => {
    Native.play('relaxationWave', normalizeOptions(options));
  },
  zenNotification: (options?: HapticOptions) => {
    Native.play('zenNotification', normalizeOptions(options));
  },
  timeWarning30s: (options?: HapticOptions) => {
    Native.play('timeWarning30s', normalizeOptions(options));
  },
  timeWarning10s: (options?: HapticOptions) => {
    Native.play('timeWarning10s', normalizeOptions(options));
  },
  heartBeats: (options?: HapticOptions) => {
    Native.play('heartBeats', normalizeOptions(options));
  },
  timerComplete: (options?: HapticOptions) => {
    Native.play('timerComplete', normalizeOptions(options));
  },
  taskCheck: (options?: HapticOptions) => {
    Native.play('taskCheck', normalizeOptions(options));
  },
  focusStart: (options?: HapticOptions) => {
    Native.play('focusStart', normalizeOptions(options));
  },
  breakReminder: (options?: HapticOptions) => {
    Native.play('breakReminder', normalizeOptions(options));
  },
  productivityFocusReminder: (options?: HapticOptions) => {
    Native.play('productivityFocusReminder', normalizeOptions(options));
  },
  paymentSuccess: (options?: HapticOptions) => {
    Native.play('paymentSuccess', normalizeOptions(options));
  },
  paymentProcessing: (options?: HapticOptions) => {
    Native.play('paymentProcessing', normalizeOptions(options));
  },
  transactionAlert: (options?: HapticOptions) => {
    Native.play('transactionAlert', normalizeOptions(options));
  },
  receiptSaved: (options?: HapticOptions) => {
    Native.play('receiptSaved', normalizeOptions(options));
  },
  excitementBuild: (options?: HapticOptions) => {
    Native.play('excitementBuild', normalizeOptions(options));
  },
  disappointment: (options?: HapticOptions) => {
    Native.play('disappointment', normalizeOptions(options));
  },
  surprise: (options?: HapticOptions) => {
    Native.play('surprise', normalizeOptions(options));
  },
  joy: (options?: HapticOptions) => {
    Native.play('joy', normalizeOptions(options));
  },
  anticipation: (options?: HapticOptions) => {
    Native.play('anticipation', normalizeOptions(options));
  },
  fireBurst: (options?: HapticOptions) => {
    Native.play('fireBurst', normalizeOptions(options));
  },
  iceShard: (options?: HapticOptions) => {
    Native.play('iceShard', normalizeOptions(options));
  },
  earthquakeRumble: (options?: HapticOptions) => {
    Native.play('earthquakeRumble', normalizeOptions(options));
  },
  windTornado: (options?: HapticOptions) => {
    Native.play('windTornado', normalizeOptions(options));
  },
  thunderStorm: (options?: HapticOptions) => {
    Native.play('thunderStorm', normalizeOptions(options));
  },
  meteorImpact: (options?: HapticOptions) => {
    Native.play('meteorImpact', normalizeOptions(options));
  },
  intenseEarthquake: (options?: HapticOptions) => {
    Native.play('intenseEarthquake', normalizeOptions(options));
  },
  intenseTornado: (options?: HapticOptions) => {
    Native.play('intenseTornado', normalizeOptions(options));
  },
  plasmaCharge: (options?: HapticOptions) => {
    Native.play('plasmaCharge', normalizeOptions(options));
  },
  gravityWell: (options?: HapticOptions) => {
    Native.play('gravityWell', normalizeOptions(options));
  },
  photonBlast: (options?: HapticOptions) => {
    Native.play('photonBlast', normalizeOptions(options));
  },
  quantumShift: (options?: HapticOptions) => {
    Native.play('quantumShift', normalizeOptions(options));
  },
  rocketLaunch: (options?: HapticOptions) => {
    Native.play('rocketLaunch', normalizeOptions(options));
  },
  warpDrive: (options?: HapticOptions) => {
    Native.play('warpDrive', normalizeOptions(options));
  },
  laserCannon: (options?: HapticOptions) => {
    Native.play('laserCannon', normalizeOptions(options));
  },
  alienTeleport: (options?: HapticOptions) => {
    Native.play('alienTeleport', normalizeOptions(options));
  },
  spaceExplosion: (options?: HapticOptions) => {
    Native.play('spaceExplosion', normalizeOptions(options));
  },
  ultimatePower: (options?: HapticOptions) => {
    Native.play('ultimatePower', normalizeOptions(options));
  },
  dragonRoar: (options?: HapticOptions) => {
    Native.play('dragonRoar', normalizeOptions(options));
  },
  titanSmash: (options?: HapticOptions) => {
    Native.play('titanSmash', normalizeOptions(options));
  },
  dimensionalRift: (options?: HapticOptions) => {
    Native.play('dimensionalRift', normalizeOptions(options));
  },
  volcanicEruption: (options?: HapticOptions) => {
    Native.play('volcanicEruption', normalizeOptions(options));
  },
  titanStomp: (options?: HapticOptions) => {
    Native.play('titanStomp', normalizeOptions(options));
  },
  phoenixRebirth: (options?: HapticOptions) => {
    Native.play('phoenixRebirth', normalizeOptions(options));
  },
  divineIntervention: (options?: HapticOptions) => {
    Native.play('divineIntervention', normalizeOptions(options));
  },
  megaBoost: (options?: HapticOptions) => {
    Native.play('megaBoost', normalizeOptions(options));
  },
  starPower: (options?: HapticOptions) => {
    Native.play('starPower', normalizeOptions(options));
  },
  berserkerRage: (options?: HapticOptions) => {
    Native.play('berserkerRage', normalizeOptions(options));
  },
  divineShield: (options?: HapticOptions) => {
    Native.play('divineShield', normalizeOptions(options));
  },
  invincibilityActivation: (options?: HapticOptions) => {
    Native.play('invincibilityActivation', normalizeOptions(options));
  },
  timeFreeze: (options?: HapticOptions) => {
    Native.play('timeFreeze', normalizeOptions(options));
  },
  ultraCombo: (options?: HapticOptions) => {
    Native.play('ultraCombo', normalizeOptions(options));
  },
  nuclearCharge: (options?: HapticOptions) => {
    Native.play('nuclearCharge', normalizeOptions(options));
  },
  starRating1: (options?: HapticOptions) => {
    Native.play('starRating1', normalizeOptions(options));
  },
  starRating3: (options?: HapticOptions) => {
    Native.play('starRating3', normalizeOptions(options));
  },
  starRating5: (options?: HapticOptions) => {
    Native.play('starRating5', normalizeOptions(options));
  },
  socialNotification: (options?: HapticOptions) => {
    Native.play('socialNotification', normalizeOptions(options));
  },
  pencilWrite: (options?: HapticOptions) => {
    Native.play('pencilWrite', normalizeOptions(options));
  },
  eraserUse: (options?: HapticOptions) => {
    Native.play('eraserUse', normalizeOptions(options));
  }
} as const;

export default Presets;
