import React, {useState, useEffect} from 'react';
import {  View, 
          KeyboardAvoidingView, 
          Image, 
          TextInput, 
          TouchableOpacity,
          Button, 
          Text, 
          StyleSheet, 
          Animated, 
          Keyboard   } from 'react-native';

export default function CartaFrete( { navigation } ) {

  return (
    <View style={styles.background}>

        <TextInput
        style={styles.input}
        placeholder="Carta Frete"
        autoCorrect={false}
        onChangeText={(text)=> { console.log(text)}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text 
            style={styles.submitText}  
            onPress={ () => {
              console.log('Entrar-Frete')
              navigation.navigate('DadosFrete')}}> Entrar  </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSubmit}>
          <Text 
            style={styles.submitText}  
            onPress={ () => {
              console.log('Sair-Login')
              navigation.navigate('Login')}}> Sair  </Text>
        </TouchableOpacity>        

    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',

  },
  containerLogo:{
    flex:1,
    justifyContent: 'center',
    paddingTop: 10,
 
  },
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 20,
    
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
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,

  },
  submitText:{
    color: '#FFF',
    fontSize: 18,

  },
  btnRegister:{
    marginTop: 10,

  },
  RegisterText:{
    color: '#FFF',

  }


});

