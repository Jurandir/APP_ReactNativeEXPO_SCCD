import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home';
import Sobre from './src/pages/Sobre';
import TelaMapa from './src/pages/TelaMapa';
import Login from './src/pages/Login';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sobre" component={Sobre} />
        <Stack.Screen name="TelaMapa" component={TelaMapa} 
          options={{
            title: '',
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen name="Login" component={Login} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// APP

