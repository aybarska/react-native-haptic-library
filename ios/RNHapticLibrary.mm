#import "RNHapticLibrary.h"

#if __has_include(<React/RCTConvert.h>)
#import <React/RCTConvert.h>
#endif

#if !__has_include(<React/RCTBridgeModule.h>) && !__has_include(<RNHapticLibrarySpec/RNHapticLibrarySpec.h>)
#define RCT_EXPORT_MODULE(...)
#endif

@interface NSObject (RNHapticLibraryBridge)
- (void)play:(NSString *)name options:(NSDictionary *)options;
- (void)prepare:(NSArray<NSString *> *)names;
- (void)stop;
- (void)setEnabled:(BOOL)enabled;
- (BOOL)isSupported;
- (NSArray<NSString *> *)patternNames;
@end

@implementation RNHapticLibrary {
  NSObject *bridge_;
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    Class bridgeClass = NSClassFromString(@"HapticLibraryBridge");
    bridge_ = bridgeClass ? [bridgeClass new] : nil;
  }
  return self;
}

#if __has_include(<RNHapticLibrarySpec/RNHapticLibrarySpec.h>)
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeRNHapticLibrarySpecJSI>(params);
}
#endif

static NSDictionary *RNHapticLibraryOptionsFromJSONString(NSString *json)
{
  if (json.length == 0) {
    return @{};
  }

  NSData *data = [json dataUsingEncoding:NSUTF8StringEncoding];
  if (!data) {
    return @{};
  }

  id object = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
  return [object isKindOfClass:NSDictionary.class] ? object : @{};
}

- (void)RNHapticLibrary_play:(nonnull NSString *)name optionsJson:(nonnull NSString *)optionsJson
{
  [bridge_ play:name options:RNHapticLibraryOptionsFromJSONString(optionsJson)];
}

- (void)RNHapticLibrary_prepare:(nonnull NSArray<NSString *> *)names
{
  [bridge_ prepare:names];
}

- (void)RNHapticLibrary_stop
{
  [bridge_ stop];
}

- (void)RNHapticLibrary_setEnabled:(BOOL)enabled
{
  [bridge_ setEnabled:enabled];
}

- (nonnull NSNumber *)RNHapticLibrary_isSupported
{
  return @([bridge_ isSupported]);
}

- (nonnull NSArray<NSString *> *)RNHapticLibrary_getPatternNames
{
  return [bridge_ patternNames];
}

@end
