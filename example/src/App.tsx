import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  toggleFlash,
  isFlashOn,
  hasFlash,
} from 'react-native-magic-flashlight';

export default function App() {
  const [hasFlashState, setHasFlashState] = React.useState<boolean>(false);
  const [flashState, setFlashState] = React.useState<boolean>(false);

  React.useEffect(() => {
    hasFlash(
      () => setHasFlashState(true),
      () => setHasFlashState(false)
    );
  }, []);

  function turnOn() {
    toggleFlash(
      !flashState,
      () => setFlashState(true),
      () => setFlashState(false)
    );
  }

  function verifyFlashOn() {
    if (isFlashOn((on) => on)) {
      return 'Desligar Flash';
    } else {
      return 'Ligar Flash';
    }
  }

  return (
    <View style={styles.container}>
      <Text>Dispositivo com flash? {hasFlashState ? 'Sim' : 'Não'}</Text>
      <TouchableOpacity onPress={turnOn} style={styles.button}>
        <Text style={styles.buttonText}>{verifyFlashOn()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    padding: 20,
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
});
