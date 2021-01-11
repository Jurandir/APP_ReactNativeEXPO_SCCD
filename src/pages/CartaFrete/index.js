import React, {useState, useEffect} from 'react';
import {  View, 
          TextInput, 
          TouchableOpacity,
          Text, 
          StyleSheet, 
          Alert
                   } from 'react-native';
import GetCartaFrete from '../../interface/GetCartaFrete';
import { delData, getData, setData } from '../../utils/dataStorage';

export default function CartaFrete( { navigation } ) {

  const [cartaFrete  , setCartafrete]   = useState(''); 


  useEffect(() => {
    
    (async () => {
      let stoCartaFrete = await getData('@CartaFrete')
      setCartafrete(stoCartaFrete.data.cartaFrete);
    })();

  }, []);

  const zeraDados = () => {
    delData('@ListaFotos').then((a)=>{
      alert('Dados zerados !!!')
    })
  }
  
  const entrarDetalhes = () => {
    let w = cartaFrete.replace('-','')
    let emp = w.substring(0,3)
    let cod = w.substring(3,12).replace(/([^\d])+/gim, '');
    let token
    let success

    setCartafrete(`${emp}-${cod}`)
    setData('@CartaFrete',{ cartaFrete: cartaFrete, empresa: emp, codigo: cod })

    getData('@Credencial').then((sto)=>{
        success = sto.success
        if (success) {
            token = sto.data.token
            GetCartaFrete(emp,cod,token).then((ret)=>{
              //console.log('API CARTAFRETE:',ret)
              success = ret.success  
              if (success) {
                let dadosCarta = 
                  { cartaFrete: ret.CARTAFRETE, 
                    empresa: emp, 
                    codigo: cod ,
                    placas: ret.PLACAS,
                    motorista: ret.MOTORISTA,
                    data: ret.DATA
                  }
                  setData('@CartaFrete',dadosCarta)

                  navigation.navigate('DadosFrete',{dadosCarta})

              } else {
                  Alert.alert('Aviso:', ret.message, [{
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                    style: 'default'
                  }],{ cancelable: false })                  
              }

            }).catch(err=>{ console.log('ERRO:',err)})
        }
    })
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

        <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={ zeraDados }
        >
          <Text style={styles.submitText}> 
              Zera Dados
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
