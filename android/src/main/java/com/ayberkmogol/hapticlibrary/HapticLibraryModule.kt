package com.ayberkmogol.hapticlibrary

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableArray
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = HapticLibraryModule.NAME)
class HapticLibraryModule(reactContext: ReactApplicationContext) :
  NativeHapticLibrarySpec(reactContext) {

  private val player = HapticPlayer(reactContext)

  override fun RNHapticLibrary_play(name: String, optionsJson: String) {
    player.play(name, optionsJson)
  }

  override fun RNHapticLibrary_prepare(names: ReadableArray) {
    val parsedNames = mutableListOf<String>()
    for (index in 0 until names.size()) {
      names.getString(index)?.let { parsedNames.add(it) }
    }
    player.prepare(parsedNames)
  }

  override fun RNHapticLibrary_stop() {
    player.stop()
  }

  override fun RNHapticLibrary_setEnabled(enabled: Boolean) {
    player.setEnabled(enabled)
  }

  override fun RNHapticLibrary_isSupported(): Boolean = player.isSupported()

  override fun RNHapticLibrary_getPatternNames(): WritableArray {
    val array = Arguments.createArray()
    HapticPatternCatalog.names().forEach { array.pushString(it) }
    return array
  }

  companion object {
    const val NAME = "RNHapticLibrary"
  }
}
