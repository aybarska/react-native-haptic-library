import Foundation
import CoreHaptics
import UIKit

@objc(HapticLibraryBridge)
final class HapticLibraryBridge: NSObject {
    private let manager = HapticManager()
    private var enabled = true

    @objc func play(_ name: String, options: NSDictionary?) {
        guard enabled, UIApplication.shared.applicationState == .active else { return }
        guard let option = RNHapticPatternResolver.option(named: name, options: options as? [String: Any]) else { return }
        manager.playHaptic(option: option)
    }

    @objc func prepare(_ names: [String]) {
        guard enabled else { return }
        let options = names.compactMap { RNHapticPatternResolver.option(named: $0, options: nil) }
        manager.prepareHaptics(options: options)
    }

    @objc func stop() {
        manager.tearDownAllHaptics()
    }

    @objc func setEnabled(_ enabled: Bool) {
        self.enabled = enabled
        if !enabled {
            manager.tearDownAllHaptics()
        }
    }

    @objc func isSupported() -> Bool {
        if #available(iOS 13.0, *) {
            return CHHapticEngine.capabilitiesForHardware().supportsHaptics || UIDevice.current.userInterfaceIdiom == .phone
        }
        return UIDevice.current.userInterfaceIdiom == .phone
    }

    @objc func patternNames() -> [String] {
        RNHapticPatternResolver.patternNames
    }
}
