import React, {useState, useEffect} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import {  View, 
          ScrollView,
          SafeAreaView,
          KeyboardAvoidingView, 
          Image, 
          TextInput, 
          TouchableOpacity,
          Button, 
          Text, 
          StyleSheet, 
          Animated, 
          Keyboard   } from 'react-native';

export default function DadosFrete( { navigation } ) {

  return (
    <SafeAreaView style={styles.background}>

        <Text style={styles.LabelTitulo}>Carta Frete</Text>

        <Text style={styles.LabelText}>Placas</Text>
        <TextInput
        style={styles.input}
        placeholder="Placas"
        autoCorrect={false}
        onChangeText={(text)=> { console.log(text)}}
        />

        <Text style={styles.LabelText}>Motorista</Text>
        <TextInput
        style={styles.input}
        placeholder="Motorista"
        autoCorrect={false}
        onChangeText={(text)=> { console.log(text)}}
        />

        <Text style={styles.LabelText}>Operação</Text>
        <TextInput
        style={styles.input}
        placeholder="Operação"
        autoCorrect={false}
        onChangeText={(text)=> { console.log(text)}}
        />

        <Text style={styles.LabelText}>Tipo Veiculo</Text>
        <TextInput
        style={styles.input}
        placeholder="Tipo Veiculo"
        autoCorrect={false}
        onChangeText={(text)=> { console.log(text)}}
        />

        <Text style={styles.LabelText}>Observações</Text>
        <TextInput
        style={styles.input}
        placeholder="Observações"
        autoCorrect={false}
        onChangeText={(text)=> { console.log(text)}}
        />

        <View style={styles.containerBTN}>
          <TouchableOpacity 
              style={styles.btnImagens}
              onPress={ () => {
                console.log('Entrar-Frete')
                navigation.navigate('Divice')}}
              >

              <Text style={styles.submitText}>Imagens</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={styles.btnSair}
              onPress={ () => {
                  console.log('Sair-Login')
                  navigation.navigate('CartaFrete')}}
              >
            <Text style={styles.submitText}>Sair</Text>
          </TouchableOpacity>        
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',

  },
  containerBTN:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#191919',
    marginTop:20,

  },
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 10,
    
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginTop:5,
    marginBottom:10,
    color:'#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 5,

  },
  btnImagens:{
    backgroundColor: '#35AAFF',
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  btnSair:{
    backgroundColor: '#35AAFF',
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  submitText:{
    color: '#FFF',
    fontSize: 20,

  },
  scrollView: {
    marginHorizontal: 5,
  },
  LabelText:{
    color: '#FFF',
    textAlign: "left",
    alignSelf: 'stretch',
    marginLeft: 20,
  },
  LabelTitulo:{
    color: '#FFF',
    textAlign: "center",
    marginTop: 10,
    fontSize: 20
  }

});

