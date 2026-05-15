package com.ayberkmogol.hapticlibrary

data class EnvelopePoint(val time: Long, val value: Float)
data class HapticKeyframe(val time: Long, val amplitude: Float, val frequency: Float)
data class TextureEnvelope(val amplitude: List<EnvelopePoint>, val frequency: List<EnvelopePoint>)
data class HapticBlueprint(val envelope: TextureEnvelope, val impacts: List<HapticKeyframe>)

enum class HapticSupport {
  NO_SUPPORT,
  LIMITED_SUPPORT,
  STANDARD_SUPPORT,
  ADVANCED_SUPPORT
}

data class PatternDefinition(
  val name: String,
  val category: String,
  val defaults: Map<String, Any> = emptyMap()
)
