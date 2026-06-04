// Generated from the native haptic preset catalog.
import Native from './NativeHapticLibrary';
import { normalizeOptions } from './patterns';
import type { HapticOptions } from './types';

export const Presets = {
  selection: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('selection', normalizeOptions(options));
  },
  soft: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('soft', normalizeOptions(options));
  },
  rigid: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('rigid', normalizeOptions(options));
  },
  light: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('light', normalizeOptions(options));
  },
  medium: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('medium', normalizeOptions(options));
  },
  heavy: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('heavy', normalizeOptions(options));
  },
  success: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('success', normalizeOptions(options));
  },
  error: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('error', normalizeOptions(options));
  },
  warning: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('warning', normalizeOptions(options));
  },
  lightningStrikeQuick: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('lightningStrikeQuick', normalizeOptions(options));
  },
  lightningStrikeChain: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('lightningStrikeChain', normalizeOptions(options));
  },
  lightningStrikeHeavy: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('lightningStrikeHeavy', normalizeOptions(options));
  },
  coinCollectSingle: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('coinCollectSingle', normalizeOptions(options));
  },
  coinCollectMulti: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('coinCollectMulti', normalizeOptions(options));
  },
  coinCollectJackpot: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('coinCollectJackpot', normalizeOptions(options));
  },
  swordSlashLight: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('swordSlashLight', normalizeOptions(options));
  },
  swordSlashHeavy: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('swordSlashHeavy', normalizeOptions(options));
  },
  arrowRelease: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('arrowRelease', normalizeOptions(options));
  },
  explosionSmall: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('explosionSmall', normalizeOptions(options));
  },
  explosionMassive: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('explosionMassive', normalizeOptions(options));
  },
  shieldBlock: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('shieldBlock', normalizeOptions(options));
  },
  criticalHit: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('criticalHit', normalizeOptions(options));
  },
  comboHit3x: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('comboHit3x', normalizeOptions(options));
  },
  comboHit5x: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('comboHit5x', normalizeOptions(options));
  },
  footstepGrass: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('footstepGrass', normalizeOptions(options));
  },
  footstepMetal: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('footstepMetal', normalizeOptions(options));
  },
  engineStart: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('engineStart', normalizeOptions(options));
  },
  turboBoost: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('turboBoost', normalizeOptions(options));
  },
  portalEnter: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('portalEnter', normalizeOptions(options));
  },
  magicCharge: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('magicCharge', normalizeOptions(options));
  },
  machineGun: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('machineGun', normalizeOptions(options));
  },
  cascade: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('cascade', normalizeOptions(options));
  },
  elasticBounce: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('elasticBounce', normalizeOptions(options));
  },
  drums: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('drums', normalizeOptions(options));
  },
  achievementUnlocked: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('achievementUnlocked', normalizeOptions(options));
  },
  levelUp: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('levelUp', normalizeOptions(options));
  },
  starRating: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('starRating', normalizeOptions(options));
  },
  badgeEarned: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('badgeEarned', normalizeOptions(options));
  },
  streakMilestone: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakMilestone', normalizeOptions(options));
  },
  perfectScore: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('perfectScore', normalizeOptions(options));
  },
  rankPromotion: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('rankPromotion', normalizeOptions(options));
  },
  dailyGoalComplete: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('dailyGoalComplete', normalizeOptions(options));
  },
  trophyUnlock: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('trophyUnlock', normalizeOptions(options));
  },
  questComplete: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('questComplete', normalizeOptions(options));
  },
  highScore: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('highScore', normalizeOptions(options));
  },
  masteryAchieved: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('masteryAchieved', normalizeOptions(options));
  },
  correctAnswerBasic: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('correctAnswerBasic', normalizeOptions(options));
  },
  correctAnswerSimple: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('correctAnswerSimple', normalizeOptions(options));
  },
  correctAnswerStreak: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('correctAnswerStreak', normalizeOptions(options));
  },
  correctAnswerPerfect: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('correctAnswerPerfect', normalizeOptions(options));
  },
  perfectLessonComplete: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('perfectLessonComplete', normalizeOptions(options));
  },
  badgeUnlock: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('badgeUnlock', normalizeOptions(options));
  },
  skillMastery: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('skillMastery', normalizeOptions(options));
  },
  leaguePromotion: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('leaguePromotion', normalizeOptions(options));
  },
  celebrationBurst: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('celebrationBurst', normalizeOptions(options));
  },
  ascendingSuccess: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('ascendingSuccess', normalizeOptions(options));
  },
  correctAnswer: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('correctAnswer', normalizeOptions(options));
  },
  incorrectGentle: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('incorrectGentle', normalizeOptions(options));
  },
  hintAvailable: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('hintAvailable', normalizeOptions(options));
  },
  progressCheckpoint: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('progressCheckpoint', normalizeOptions(options));
  },
  encouragementTap: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('encouragementTap', normalizeOptions(options));
  },
  skillUnlocked: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('skillUnlocked', normalizeOptions(options));
  },
  lessonComplete: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('lessonComplete', normalizeOptions(options));
  },
  practiceReminder: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('practiceReminder', normalizeOptions(options));
  },
  knowledgeGained: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('knowledgeGained', normalizeOptions(options));
  },
  feedbackPositive: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('feedbackPositive', normalizeOptions(options));
  },
  wrongAnswerGentle: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('wrongAnswerGentle', normalizeOptions(options));
  },
  wrongAnswerStandard: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('wrongAnswerStandard', normalizeOptions(options));
  },
  nearMissAnswer: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('nearMissAnswer', normalizeOptions(options));
  },
  grammarError: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('grammarError', normalizeOptions(options));
  },
  hintActivation: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('hintActivation', normalizeOptions(options));
  },
  hintReveal: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('hintReveal', normalizeOptions(options));
  },
  timeCriticalWarning: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('timeCriticalWarning', normalizeOptions(options));
  },
  partialCredit: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('partialCredit', normalizeOptions(options));
  },
  tryAgainEncouragement: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('tryAgainEncouragement', normalizeOptions(options));
  },
  learningProgress: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('learningProgress', normalizeOptions(options));
  },
  educationalFocusReminder: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('educationalFocusReminder', normalizeOptions(options));
  },
  flashcardFlip: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('flashcardFlip', normalizeOptions(options));
  },
  quizStart: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('quizStart', normalizeOptions(options));
  },
  xpGainSmall: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('xpGainSmall', normalizeOptions(options));
  },
  xpGainLarge: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('xpGainLarge', normalizeOptions(options));
  },
  xpGainBonus: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('xpGainBonus', normalizeOptions(options));
  },
  xpGainDynamic: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('xpGainDynamic', normalizeOptions(options));
  },
  bonusPoints: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('bonusPoints', normalizeOptions(options));
  },
  powerUpCollected: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('powerUpCollected', normalizeOptions(options));
  },
  lifeGained: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('lifeGained', normalizeOptions(options));
  },
  challengeAccepted: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('challengeAccepted', normalizeOptions(options));
  },
  timerTick: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('timerTick', normalizeOptions(options));
  },
  rewardUnlock: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('rewardUnlock', normalizeOptions(options));
  },
  progressBarFill: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('progressBarFill', normalizeOptions(options));
  },
  progressBarFilling: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('progressBarFilling', normalizeOptions(options));
  },
  progress25: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('progress25', normalizeOptions(options));
  },
  progress50: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('progress50', normalizeOptions(options));
  },
  progress75: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('progress75', normalizeOptions(options));
  },
  dailyGoalCheckpoint: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('dailyGoalCheckpoint', normalizeOptions(options));
  },
  leagueAdvancement: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('leagueAdvancement', normalizeOptions(options));
  },
  crownGemCollection: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('crownGemCollection', normalizeOptions(options));
  },
  powerUpActivation: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('powerUpActivation', normalizeOptions(options));
  },
  challengeCompletion: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('challengeCompletion', normalizeOptions(options));
  },
  lessonPathProgress: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('lessonPathProgress', normalizeOptions(options));
  },
  socialFeatureNotification: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('socialFeatureNotification', normalizeOptions(options));
  },
  comboMultiplier: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('comboMultiplier', normalizeOptions(options));
  },
  streakRiskWarning: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakRiskWarning', normalizeOptions(options));
  },
  streakLost: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakLost', normalizeOptions(options));
  },
  streakBuilding: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakBuilding', normalizeOptions(options));
  },
  streakMilestone5: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakMilestone5', normalizeOptions(options));
  },
  streakMilestone7Days: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakMilestone7Days', normalizeOptions(options));
  },
  streakMilestone10: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakMilestone10', normalizeOptions(options));
  },
  streakMilestone25: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakMilestone25', normalizeOptions(options));
  },
  streakMilestone30Days: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakMilestone30Days', normalizeOptions(options));
  },
  streakMilestone100Days: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('streakMilestone100Days', normalizeOptions(options));
  },
  doubleTapLike: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('doubleTapLike', normalizeOptions(options));
  },
  messageSent: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('messageSent', normalizeOptions(options));
  },
  notificationPop: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('notificationPop', normalizeOptions(options));
  },
  typingIndicator: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('typingIndicator', normalizeOptions(options));
  },
  commentPosted: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('commentPosted', normalizeOptions(options));
  },
  pullToRefresh: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('pullToRefresh', normalizeOptions(options));
  },
  swipeAction: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('swipeAction', normalizeOptions(options));
  },
  toggleSwitch: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('toggleSwitch', normalizeOptions(options));
  },
  pickerDetent: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('pickerDetent', normalizeOptions(options));
  },
  longPressActivation: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('longPressActivation', normalizeOptions(options));
  },
  tabSelection: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('tabSelection', normalizeOptions(options));
  },
  navigationPush: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('navigationPush', normalizeOptions(options));
  },
  navigationPop: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('navigationPop', normalizeOptions(options));
  },
  modalPresent: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('modalPresent', normalizeOptions(options));
  },
  modalDismiss: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('modalDismiss', normalizeOptions(options));
  },
  keyboardTap: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('keyboardTap', normalizeOptions(options));
  },
  sliderStep: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('sliderStep', normalizeOptions(options));
  },
  sliderTick: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('sliderTick', normalizeOptions(options));
  },
  buttonPress: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('buttonPress', normalizeOptions(options));
  },
  selectionTick: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('selectionTick', normalizeOptions(options));
  },
  segmentChange: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('segmentChange', normalizeOptions(options));
  },
  zoomBoundary: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('zoomBoundary', normalizeOptions(options));
  },
  dragAndDrop: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('dragAndDrop', normalizeOptions(options));
  },
  formSubmit: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('formSubmit', normalizeOptions(options));
  },
  inputError: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('inputError', normalizeOptions(options));
  },
  loadingComplete: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('loadingComplete', normalizeOptions(options));
  },
  appIconTap: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('appIconTap', normalizeOptions(options));
  },
  scrollBounce: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('scrollBounce', normalizeOptions(options));
  },
  pageFlip: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('pageFlip', normalizeOptions(options));
  },
  photoCapture: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('photoCapture', normalizeOptions(options));
  },
  shareAction: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('shareAction', normalizeOptions(options));
  },
  downloadComplete: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('downloadComplete', normalizeOptions(options));
  },
  refreshData: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('refreshData', normalizeOptions(options));
  },
  gestureRecognized: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('gestureRecognized', normalizeOptions(options));
  },
  pageTurn: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('pageTurn', normalizeOptions(options));
  },
  bookPageTurn: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('bookPageTurn', normalizeOptions(options));
  },
  softTick: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('softTick', normalizeOptions(options));
  },
  customPop: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('customPop', normalizeOptions(options));
  },
  contextualMenu: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('contextualMenu', normalizeOptions(options));
  },
  sliderValueChange: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('sliderValueChange', normalizeOptions(options));
  },
  pop: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('pop', normalizeOptions(options));
  },
  magicSparkle: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('magicSparkle', normalizeOptions(options));
  },
  waterDrop: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('waterDrop', normalizeOptions(options));
  },
  specialEarthquake: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('specialEarthquake', normalizeOptions(options));
  },
  laserBeam: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('laserBeam', normalizeOptions(options));
  },
  typewriter: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('typewriter', normalizeOptions(options));
  },
  heartbeat: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('heartbeat', normalizeOptions(options));
  },
  electricSpark: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('electricSpark', normalizeOptions(options));
  },
  rubberBand: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('rubberBand', normalizeOptions(options));
  },
  buildUp: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('buildUp', normalizeOptions(options));
  },
  boing: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('boing', normalizeOptions(options));
  },
  inflate: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('inflate', normalizeOptions(options));
  },
  oscillate: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('oscillate', normalizeOptions(options));
  },
  breathingGuide: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('breathingGuide', normalizeOptions(options));
  },
  calmPulse: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('calmPulse', normalizeOptions(options));
  },
  meditationBell: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('meditationBell', normalizeOptions(options));
  },
  relaxationWave: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('relaxationWave', normalizeOptions(options));
  },
  zenNotification: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('zenNotification', normalizeOptions(options));
  },
  timeWarning30s: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('timeWarning30s', normalizeOptions(options));
  },
  timeWarning10s: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('timeWarning10s', normalizeOptions(options));
  },
  heartBeats: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('heartBeats', normalizeOptions(options));
  },
  timerComplete: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('timerComplete', normalizeOptions(options));
  },
  taskCheck: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('taskCheck', normalizeOptions(options));
  },
  focusStart: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('focusStart', normalizeOptions(options));
  },
  breakReminder: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('breakReminder', normalizeOptions(options));
  },
  productivityFocusReminder: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('productivityFocusReminder', normalizeOptions(options));
  },
  paymentSuccess: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('paymentSuccess', normalizeOptions(options));
  },
  paymentProcessing: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('paymentProcessing', normalizeOptions(options));
  },
  transactionAlert: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('transactionAlert', normalizeOptions(options));
  },
  receiptSaved: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('receiptSaved', normalizeOptions(options));
  },
  excitementBuild: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('excitementBuild', normalizeOptions(options));
  },
  disappointment: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('disappointment', normalizeOptions(options));
  },
  surprise: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('surprise', normalizeOptions(options));
  },
  joy: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('joy', normalizeOptions(options));
  },
  anticipation: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('anticipation', normalizeOptions(options));
  },
  fireBurst: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('fireBurst', normalizeOptions(options));
  },
  iceShard: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('iceShard', normalizeOptions(options));
  },
  earthquakeRumble: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('earthquakeRumble', normalizeOptions(options));
  },
  windTornado: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('windTornado', normalizeOptions(options));
  },
  thunderStorm: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('thunderStorm', normalizeOptions(options));
  },
  meteorImpact: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('meteorImpact', normalizeOptions(options));
  },
  intenseEarthquake: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('intenseEarthquake', normalizeOptions(options));
  },
  intenseTornado: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('intenseTornado', normalizeOptions(options));
  },
  plasmaCharge: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('plasmaCharge', normalizeOptions(options));
  },
  gravityWell: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('gravityWell', normalizeOptions(options));
  },
  photonBlast: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('photonBlast', normalizeOptions(options));
  },
  quantumShift: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('quantumShift', normalizeOptions(options));
  },
  rocketLaunch: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('rocketLaunch', normalizeOptions(options));
  },
  warpDrive: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('warpDrive', normalizeOptions(options));
  },
  laserCannon: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('laserCannon', normalizeOptions(options));
  },
  alienTeleport: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('alienTeleport', normalizeOptions(options));
  },
  spaceExplosion: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('spaceExplosion', normalizeOptions(options));
  },
  ultimatePower: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('ultimatePower', normalizeOptions(options));
  },
  dragonRoar: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('dragonRoar', normalizeOptions(options));
  },
  titanSmash: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('titanSmash', normalizeOptions(options));
  },
  dimensionalRift: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('dimensionalRift', normalizeOptions(options));
  },
  volcanicEruption: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('volcanicEruption', normalizeOptions(options));
  },
  titanStomp: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('titanStomp', normalizeOptions(options));
  },
  phoenixRebirth: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('phoenixRebirth', normalizeOptions(options));
  },
  divineIntervention: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('divineIntervention', normalizeOptions(options));
  },
  megaBoost: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('megaBoost', normalizeOptions(options));
  },
  starPower: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('starPower', normalizeOptions(options));
  },
  berserkerRage: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('berserkerRage', normalizeOptions(options));
  },
  divineShield: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('divineShield', normalizeOptions(options));
  },
  invincibilityActivation: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('invincibilityActivation', normalizeOptions(options));
  },
  timeFreeze: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('timeFreeze', normalizeOptions(options));
  },
  ultraCombo: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('ultraCombo', normalizeOptions(options));
  },
  nuclearCharge: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('nuclearCharge', normalizeOptions(options));
  },
  starRating1: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('starRating1', normalizeOptions(options));
  },
  starRating3: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('starRating3', normalizeOptions(options));
  },
  starRating5: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('starRating5', normalizeOptions(options));
  },
  socialNotification: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('socialNotification', normalizeOptions(options));
  },
  pencilWrite: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('pencilWrite', normalizeOptions(options));
  },
  eraserUse: (options?: HapticOptions) => {
    Native.RNHapticLibrary_play('eraserUse', normalizeOptions(options));
  }
} as const;

export default Presets;
