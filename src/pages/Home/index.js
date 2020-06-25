import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home( { navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button 
        title="Sobre" 
        onPress={ () => navigation.navigate('Sobre')}
      />
      <Button 
        title="Mapa" 
        onPress={ () => navigation.navigate('TelaMapa')}
      />
      <Button 
        title="Login" 
        onPress={ () => navigation.navigate('Login')}
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


// HOME