package com.ayberkmogol.hapticlibrary

import android.content.Context
import android.os.VibrationEffect

class HapticPlayer(context: Context) {
  private val engine = HapticEngine(context)
  private val cache = mutableMapOf<String, VibrationEffect?>()

  fun play(name: String, optionsJson: String) {
    val key = "${name.lowercase()}::$optionsJson"
    val effect = cache.getOrPut(key) { createEffect(name, optionsJson) }
    engine.play(effect)
  }

  fun prepare(names: List<String>) {
    names.forEach { name ->
      val key = "${name.lowercase()}::{}"
      cache.getOrPut(key) { createEffect(name, "{}") }
    }
  }

  fun stop() = engine.stop()
  fun setEnabled(enabled: Boolean) = engine.setEnabled(enabled)
  fun isSupported(): Boolean = engine.isSupported()

  private fun createEffect(name: String, optionsJson: String): VibrationEffect? {
    engine.createSystemEffect(name)?.let { return it }
    val pattern = HapticPatternCatalog.pattern(name, optionsJson) ?: return null
    return engine.createEffect(pattern)
  }
}
