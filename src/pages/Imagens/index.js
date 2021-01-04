import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function ImagemAnteriorScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Imagem Anterior!</Text>
    </View>
  );
}

function ImagemPosteriorScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Imagem Posterior!</Text>
    </View>
  );
}

function FotografarScreen() {

  //let navigation = nav
  //function SetDivice() {
  //    navigation.navigate('Divice')
  //    return 'Foto'
 // }

  console.log('IMG:',img)

  return (
    <View style={styles.fotoDevice}>
      <Text>{img}</Text>

      <ImageBackground
        source={{uri: img && img.uri}}
        style={{
          flex: 1
        }}
      />

    </View>
  );

}

function ExcluirImagemScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Excluir Imagem!</Text>
    </View>
  );
}

function ConfirmarScreen() {
  let navigation = nav
  alert('Dados Confirmados !!!')
  navigation.navigate('DadosFrete')
  return (
    <View style={styles.container}>
      <Text>Confirmar!</Text>
    </View>
  );
}


const Tab = createBottomTabNavigator();
var nav;
var img;

export default function Imagens({ route, navigation }) {
  const { photo } = route.params
  console.log('>> Photo:', photo.uri)
  
  nav = navigation
  img = photo.uri

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Fotografar') { iconName = focused ? 'camera' : 'camerao' } 
            else 
            if (route.name === 'Anterior')   { iconName = focused ? 'leftcircle' : 'leftcircleo' }
            else 
            if (route.name === 'Proximo')    { iconName = focused ? 'rightcircle' : 'rightcircleo' }
            else 
            if (route.name === 'Excluir')    { iconName = focused ? 'closecircle' : 'closecircleo' }
            else 
            if (route.name === 'Confirmar')  { iconName = focused ? 'checkcircle' : 'checkcircleo' }


            // You can return any component that you like here!
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#35AAFF',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Fotografar" component={FotografarScreen} />
        <Tab.Screen name="Anterior"   component={ImagemAnteriorScreen} />
        <Tab.Screen name="Proximo"    component={ImagemPosteriorScreen} />
        <Tab.Screen name="Excluir"    component={ExcluirImagemScreen} />
        <Tab.Screen name="Confirmar"  component={ConfirmarScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom:15,
    color:'#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,

  },
  fotoDevice:{
    flex: 1,
    width: '100%',
    height: '100%'    

  },  
});


// SOBRE
