#import "MagicFlashlight.h"
#import <AVFoundation/AVFoundation.h>

@implementation MagicFlashlight

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(switchState:(BOOL *)newState)
{
    if ([AVCaptureDevice class]) {
        AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
        if ([device hasTorch]){
            [device lockForConfiguration:nil];

            if (newState) {
                [device setTorchMode:AVCaptureTorchModeOn];
            } else {
                [device setTorchMode:AVCaptureTorchModeOff];
            }

            [device unlockForConfiguration];
        }
    }
}

RCT_EXPORT_METHOD(hasFlash: successCallback: (RCTResponseSenderBlock)successCallback
                         errorCallback: (RCTResponseSenderBlock)errorCallback)
{
    if ([AVCaptureDevice class]) {
        AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
        if ([device hasTorch]){
           successCallback();
        }else{
          errorCallback();
        }
    }
}

RCT_EXPORT_METHOD(isFlashOn: successCallback: (RCTResponseSenderBlock)callback)
{
    if ([AVCaptureDevice class]) {
        AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
        if ([device hasTorch]){
          callback(@[[device isTorchActive]]);
        }else{
          callback(@[false])
        }
    }
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeMagicFlashlightSpecJSI>(params);
}
#endif

@end
