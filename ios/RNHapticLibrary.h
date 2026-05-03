#if __has_include(<RNHapticLibrarySpec/RNHapticLibrarySpec.h>)
#import <RNHapticLibrarySpec/RNHapticLibrarySpec.h>

@interface RNHapticLibrary : NSObject <NativeRNHapticLibrarySpec>
@end
#else
#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
@protocol RCTBridgeModule
@end
#endif

@interface RNHapticLibrary : NSObject <RCTBridgeModule>
@end
#endif
