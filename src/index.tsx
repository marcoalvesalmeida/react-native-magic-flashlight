import {
  Alert,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-magic-flashlight' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const MagicFlashlight = NativeModules.MagicFlashlight
  ? NativeModules.MagicFlashlight
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

async function showRationaleDialog(
  title: string,
  message: string
): Promise<any> {
  let done: (a?: unknown) => void;
  const result = new Promise((resolve) => {
    done = resolve;
  });

  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: () => done(),
      },
    ],
    { cancelable: false }
  );

  return result;
}

async function requestCameraPermission(
  title: string,
  message: string
): Promise<boolean> {
  try {
    const hasCameraPermission = await PermissionsAndroid.check(
      //@ts-ignore
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if (hasCameraPermission) {
      return true;
    }

    await showRationaleDialog(title, message);

    const granted = await PermissionsAndroid.request(
      //@ts-ignore
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export function hasFlash(
  successCallback: () => void,
  errorCallback: () => void
): void {
  return MagicFlashlight.hasFlash(successCallback, errorCallback);
}

export function isFlashOn(callback: (a: boolean) => boolean): boolean {
  return MagicFlashlight.isFlashOn(callback);
}

export async function toggleFlash(
  state = true,
  successCallback: () => void,
  errorCallback: () => void
): Promise<void> {
  await requestCameraPermission(
    'Permissions',
    'We need permission to access the camera'
  );
  return MagicFlashlight.switchState(state, successCallback, errorCallback);
}
