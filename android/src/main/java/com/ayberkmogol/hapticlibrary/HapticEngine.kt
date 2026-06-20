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
import kotlin.math.max
import kotlin.math.roundToInt

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

  fun play(effect: VibrationEffect?) {
    if (!enabled || effect == null || !isSupported()) return
    if (ContextCompat.checkSelfPermission(context, Manifest.permission.VIBRATE) != PackageManager.PERMISSION_GRANTED) {
      Log.w(TAG, "Skipping haptic feedback because android.permission.VIBRATE is not granted")
      return
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      try {
        vibrator?.vibrate(effect)
      } catch (securityException: SecurityException) {
        Log.w(TAG, "Skipping haptic feedback because the app cannot use the vibrator", securityException)
      }
    }
  }

  fun playViewEffect(name: String): Boolean {
    if (!enabled) return false
    val effect = viewEffectForName(name) ?: return false
    val decorView = (context as? ReactApplicationContext)?.currentActivity?.window?.decorView ?: return false
    return decorView.performHapticFeedback(effect)
  }

  fun createSystemEffect(name: String): VibrationEffect? {
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
      if (supported) VibrationEffect.createPredefined(effect) else null
    } else {
      VibrationEffect.createPredefined(effect)
    }
  }

  fun createEffect(pattern: HapticBlueprint): VibrationEffect? {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return null
    createPrimitiveComposition(pattern)?.let { return it }

    val points = toTimeline(pattern)
    if (points.isEmpty()) return null

    val timings = mutableListOf<Long>()
    val amplitudes = mutableListOf<Int>()
    var previous = 0L
    for ((time, amplitude) in points) {
      val duration = max(1L, time - previous)
      timings.add(duration)
      amplitudes.add((amplitude.coerceIn(0f, 1f) * 255).roundToInt())
      previous = time
    }

    return if (vibrator?.hasAmplitudeControl() == true) {
      val timingArray = timings.toLongArray()
      if (!hasPlayableWaveform(timingArray)) return null
      VibrationEffect.createWaveform(timingArray, amplitudes.toIntArray(), -1)
    } else {
      val timingOnly = mutableListOf<Long>()
      var vibrating = false
      points.forEachIndexed { index, point ->
        val duration = timings[index]
        val shouldVibrate = point.second > 0.08f
        if (index == 0) timingOnly.add(0)
        if (shouldVibrate == vibrating && timingOnly.isNotEmpty()) {
          timingOnly[timingOnly.lastIndex] += duration
        } else {
          timingOnly.add(duration)
          vibrating = shouldVibrate
        }
      }
      val timingArray = timingOnly.toLongArray()
      if (!hasPlayableWaveform(timingArray)) return null
      VibrationEffect.createWaveform(timingArray, -1)
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

  private fun toTimeline(pattern: HapticBlueprint): List<Pair<Long, Float>> {
    val timeline = mutableMapOf<Long, Float>()
    pattern.envelope.amplitude.forEach { timeline[it.time] = max(timeline[it.time] ?: 0f, it.value) }
    pattern.impacts.forEach { point ->
      timeline[point.time] = max(timeline[point.time] ?: 0f, point.amplitude)
      timeline[point.time + 24L] = max(timeline[point.time + 24L] ?: 0f, 0f)
    }
    return timeline.entries.sortedBy { it.key }.map { it.key to it.value }
  }

  private companion object {
    const val TAG = "RNHapticLibrary"
  }
}
