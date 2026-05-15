package com.ayberkmogol.hapticlibrary

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class HapticLibraryPackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
    if (name == HapticLibraryModule.NAME) HapticLibraryModule(reactContext) else null

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
    mapOf(
      HapticLibraryModule.NAME to ReactModuleInfo(
        HapticLibraryModule.NAME,
        HapticLibraryModule.NAME,
        false,
        false,
        false,
        true
      )
    )
  }
}
