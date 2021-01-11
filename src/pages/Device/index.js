import React, { useState, useEffect, useRef  } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import { getData, setData } from '../../utils/dataStorage';
 

export default function Divice( props ) {
  const { navigation } = props 
  let params = props.route.params 

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [modalOpen,setModalOpen] = useState(false);

  useEffect(() => {
    
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();

  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri)
      setModalOpen(true); 
      console.log(data);
    }
  }

  async function savePicture(){
    
    let listaFotos = []
    let foto       = {id:0, dados:{}, imagem:{}}

    const stoListaFotos = await getData('@ListaFotos')

    console.log('sto:',stoListaFotos)

    if(stoListaFotos.data){
       listaFotos.push(...stoListaFotos.data)
    }   


   console.log('===================================================(1)')
   console.log('@ListaFotos (01) :',listaFotos)

    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
    .then((img)=>{
      
      foto.id     = img.id
      foto.dados  = params.dadosCarta
      foto.imagem = img 

      console.log('foto:',foto)

      listaFotos.push(foto)
      

      console.log('===================================================')
      console.log('@ListaFotos (01) :',listaFotos)

      setData('@ListaFotos',listaFotos).then((a)=>{
          alert('Salvo com suvesso !!!')
          navigation.goBack()
      }).catch(err=>{
        alert('ERRO:',err)
      })

    })
    .catch( err => {
      console.log('Err:',err)
    })

  }


  // ref={ref => {setCameraRef(ref)}}

  return (
      <Camera style={styles.camera} type={type} ref={camRef}>
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
            onPress={takePicture}
            >

                <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 40}}
                />
               <Text style={styles.text}>Foto</Text>
            
          </TouchableOpacity>

          { capturedPhoto &&

          <Modal
          animationType="slide"
          transparent={false}
          visible={modalOpen}
          >

            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', margin:5}}>


                  <View style={{margin: 5, flexDirection: 'row'}}>
                        <TouchableOpacity style={{margin:5}} onPress={()=> setModalOpen(false)}>
                          <FontAwesome name="window-close" size={40} color="#FF0000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={{margin:5}} onPress={savePicture}>
                          <FontAwesome name="upload" size={40} color="#121212" />
                        </TouchableOpacity>

                  </View>


                  <Image
                    style={{width:'100%', height: 455, borderRadius: 20}}
                    source={{ uri: capturedPhoto }}                  
                  />


            </View>
          </Modal>


          }


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

