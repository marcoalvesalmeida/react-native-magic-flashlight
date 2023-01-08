package com.magicflashlight;

import androidx.annotation.NonNull;
import android.content.pm.PackageManager;
import android.content.Context;
import android.hardware.Camera;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.os.Build;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.Callback;

@ReactModule(name = MagicFlashlightModule.NAME)
public class MagicFlashlightModule extends ReactContextBaseJavaModule {
  public static final String NAME = "MagicFlashlight";
  ReactApplicationContext reactContext;
  private Boolean isTorchOn = false;
  private Camera camera;

  public MagicFlashlightModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public void hasFlash(Callback successCallback, Callback errorCallback) {
      // Check for whether the device has a flash or not
      if (reactContext.getApplicationContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_FLASH)) {
          successCallback.invoke();
      }else {
          errorCallback.invoke();
      }
  }

  @ReactMethod
  public void isFlashOn(Callback callback) {
      // Check for whether the device flash on
      if (this.isTorchOn == true) {
        callback.invoke(true);
      }else {
        callback.invoke(false);
      }
  }

  @ReactMethod
  public void switchState(Boolean newState, Callback successCallback, Callback failureCallback) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
          CameraManager cameraManager =
                  (CameraManager) this.reactContext.getSystemService(Context.CAMERA_SERVICE);

          try {
              String cameraId = cameraManager.getCameraIdList()[0];
              cameraManager.setTorchMode(cameraId, newState);
              successCallback.invoke(true);
          } catch (Exception e) {
              String errorMessage = e.getMessage();
              failureCallback.invoke("Error: " + errorMessage);
          }
      } else {
          Camera.Parameters params;

          if (newState && !isTorchOn) {
              camera = Camera.open();
              params = camera.getParameters();
              params.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);
              camera.setParameters(params);
              camera.startPreview();
              isTorchOn = true;
          } else if (isTorchOn) {
              params = camera.getParameters();
              params.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);

              camera.setParameters(params);
              camera.stopPreview();
              camera.release();
              isTorchOn = false;
          }
      }
  }
}
