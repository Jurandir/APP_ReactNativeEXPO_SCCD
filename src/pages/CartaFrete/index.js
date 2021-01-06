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
import { getData, setData } from '../../utils/dataStorage';

export default function CartaFrete( { navigation } ) {

  const [cartaFrete  , setCartafrete]   = useState(''); 


  useEffect(() => {
    
    (async () => {
      let stoCartaFrete = await getData('@CartaFrete')
      console.log('CARTAFRETE:',stoCartaFrete)
      setCartafrete(stoCartaFrete.data.cartaFrete);
    })();

  }, []);
  
  const entrarDetalhes = () => {
    setData('@CartaFrete',{ cartaFrete: cartaFrete })
    navigation.navigate('DadosFrete')
  }

  const sairLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.background}>

       <Text style={styles.LabelTitulo}>Carta Frete</Text>

        <TextInput
            value={cartaFrete}
            autoCapitalize="characters"
            autoFocus={true}
            style={styles.input}
            placeholder="Carta Frete"
            autoCorrect={false}
            onChangeText={(text)=> { setCartafrete(text) }}
        />

        <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={ entrarDetalhes }
        >
          <Text style={styles.submitText}> 
             Entrar  
          </Text>

        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={ sairLogin }
        >
          <Text style={styles.submitText}> 
              Sair
          </Text>

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

  },
  LabelTitulo:{
    color: '#FFF',
    textAlign: "center",
    marginBottom: 30,
    fontSize: 20
  }

});

