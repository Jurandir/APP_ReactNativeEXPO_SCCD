import React, {useState, useEffect} from 'react';
import {  View, 
          TextInput, 
          TouchableOpacity,
          Text, 
          StyleSheet, 
          Alert,
          BackHandler
                   } from 'react-native';
                   
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
                   
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

    getData('@ListaFotos').then((dados)=>{
      console.log('@ListaFotos:',dados)

       if(!dados.data){
        dados.data=[]
       }

      let qtde_fotos = dados.data.length || 0;
      console.log('@ListaFotos: qtde:',qtde_fotos) 


      Alert.alert('Confirmação:',`
        (Limpeza de dados)

        Total em memória: ${qtde_fotos}
        Pendentes de envio: ${qtde_fotos}
        Fotos já enviadas: ${0}
       `,
      [{
        text: 'Não Realiza a Limpeza',
        onPress: () => {},
        style: 'default'
      },{
        text: 'Os dados já Enviados',
        onPress: () => {},
        style: 'default'
      },{
        text: 'Todos os dados',
        onPress: () => {zeraTodosDados()},
        style: 'default'
      }],
      { cancelable: false })
    })
  }

  const zeraTodosDados = () => {

    console.log('0) ZERA DADOS:')

    delData('@ListaFotos').then((a)=>{
      console.log('1) ZERA DADOS:',a)
       setData('@ListaFotos',[]).then((b)=>{
        
        Alert.alert('Dados zerados !!!')
        console.log('2) ZERA DADOS:',b)
       
      })

     })
  }

  const zeraDadosJaEnviados = () => {
    //delData('@ListaFotos').then((a)=>{
    //  alert('Dados zerados !!!')
    //})
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
                  let msg = ret.message
                  if (!ret.message) {
                    msg = 'Problemas com o servidor.'
                  }
                  Alert.alert('Aviso:', msg, [{
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
          <MaterialCommunityIcons name="location-enter" size={35} color="#FFF" />
          <Text style={styles.submitText}> 
             Entrar  
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={ sairLogin }
        >
          <AntDesign name="user" size={35} color="#FFF" />
          <Text style={styles.submitText}> 
              Trocar usuário
          </Text>
        </TouchableOpacity>        

        <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={ zeraDados }
        >
          <MaterialCommunityIcons name="broom" size={35} color="#FFF" />
          <Text style={styles.submitText}> 
              Limpeza de Dados
          </Text>
        </TouchableOpacity>        

        <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={ () => BackHandler.exitApp() }
        >
          <MaterialCommunityIcons name="exit-run" size={35} color="#FFF" />
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
    flexDirection: 'row',
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 7,
    margin: 3,

  },
  submitText:{
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
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
    marginBottom: 25,
    fontSize: 20
  }
});
