
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNMagicFlashlightSpec.h"

@interface MagicFlashlight : NSObject <NativeMagicFlashlightSpec>
#else
#import <React/RCTBridgeModule.h>

@interface MagicFlashlight : NSObject <RCTBridgeModule>
#endif

@end
