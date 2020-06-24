import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Sobre({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Sobre</Text>
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
});


// SOBRE
