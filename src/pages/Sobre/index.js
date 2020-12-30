import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Sobre({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Sobre</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Carta Frete"
        autoCorrect={false}
        onChangeText={()=> {}}
        />

      <Button 
        title="Home" 
        onPress={ () => navigation.navigate('Home')}
      />      
    </View>
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
});


// SOBRE
