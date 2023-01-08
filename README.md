# react-native-magic-flashlight

A simple library to turn on or off flash on Android/iOS device.

## Installation

```sh
npm install react-native-magic-flashlight
```

## Usage

```js
import {
  toggleFlash,
  isFlashOn,
  hasFlash,
} from 'react-native-magic-flashlight';

// ...

function deviceHasFlash() {
  hasFlash(
    () => console.log('Has Flash'),
    () => console.log('No Flash')
  );
}

function turnOn() {
  toggleFlash(
    true,
    () => console.log('Success'),
    () => console.log('Error')
  );
}

function flashIsOn() {
  const result = isFlashOn((on) => on);
  console.log(result);
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Created by [Marco Almeida](https://github.com/marcoalvesalmeida)
