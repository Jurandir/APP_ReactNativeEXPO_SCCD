import React, { useState, useEffect, useRef  } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

export default function Divice({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onPress = async () => {
    if(cameraRef){
        let photo = await cameraRef.takePictureAsync('photo');




        
        console.log('photo', photo);
        navigation.navigate('Imagens',{'photo':photo});
      }
    // navigation.navigate('Imagens')
  }

  return (
      <Camera style={styles.camera} type={type} ref={ref => {setCameraRef(ref)}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <MaterialCommunityIcons name="swap-vertical-bold" size={30} color="white" />
            <Text style={styles.text}>Frente/Verso</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={onPress}
            >

                <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 40}}
                />
               <Text style={styles.text}>Foto</Text>
            
          </TouchableOpacity>
        </View>
      </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'white',
  },
});

