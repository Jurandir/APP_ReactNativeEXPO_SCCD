import React, {useState, useEffect, useRef} from 'react';
import {  
          Alert,
          View, 
          SafeAreaView,
          FlatList,
          Image, 
          TouchableOpacity,
          Text, 
          StyleSheet,
          StatusBar, 
          Dimensions } from 'react-native';
import { getData, setData } from '../../utils/dataStorage';

const deviceWidth = Dimensions.get('window').width
import { AntDesign } from '@expo/vector-icons'; 
import * as MediaLibrary from 'expo-media-library';

export default function Pictures( { navigation } ) {

  const [dadosFotos  , setDadosFotos]   = useState({});
  const refFoto = useRef(null)
  let listaFotos = []


  const Validade =( {DADOS, INDEX} ) => {
    let icon_name  = dadosFotos[INDEX].valida ? 'check' : 'close'
    let icon_color = dadosFotos[INDEX].valida ? '#5cb85c' : '#d9534f'
  return ( 
     <View style={styles.validade}>
        <AntDesign name={icon_name} size={35} color={icon_color} /> 
    </View>
  )}

  const renderItem = ({ item }) => (
    <Item ITEM={item}/>
  );

  const Item = ( params ) => { 
    let valida = dadosFotos[params.ITEM.index].valida
    return (
    <View style={styles.item}>
      <Text style={styles.LabelTitulo}>{params.ITEM.title}</Text>
      <Image
          style={styles.imagem}
          source={ getImagem( params.ITEM ) }
      />

      <Validade DADOS={dadosFotos} INDEX={params.ITEM.index}/>

      <TouchableOpacity style={styles.delete} onPress={()=>deleteItem(params.ITEM,params)}>
          <AntDesign name="delete" size={35} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.filename}>{'Placas: '+params.ITEM.placas}</Text>
      <Text style={styles.filename}>{'Motorista: '+params.ITEM.motorista}</Text>
      <Text style={styles.filename}>{'Tipo Veículo: '+params.ITEM.tipoVeiculo}</Text>
      <Text style={styles.filename}>{'Obs: '+params.ITEM.observacao}</Text>
      <Text style={styles.filename}>{'Valida: '+params.ITEM.valida}</Text>
    </View>
  )};

  const getImagem = (obj) =>{
    return { isStatic: true , uri: obj.uri }
  }

  
  const deleteItem = (item) => {
    let { index, valida }  = item

    valida = !valida
    setValidaFoto(index,valida)

    console.log(' >>>>>>>>>>>>>>>>> deleteItem:',valida)

  }

  const enviasDados = () => {

    console.log('Testando....1')

    Alert.alert('Confirmação:', 'Envia dados para o servidor?',
      [{
        text: 'SIM',
        onPress: () => {enviaDadosServidor()},
        style: 'default'
      },{
        text: 'NÃO',
        onPress: () => {},
        style: 'default'
      }],
      { cancelable: false })
  }

  const enviaDadosServidor = () => {


  }


  const setValidaFoto = (index,valida) => {
    let tmp_dados = dadosFotos
    tmp_dados[index].valida = valida
    setDadosFotos(tmp_dados)
    refFoto.current.forceUpdate()
  }

  useEffect(() => {   
    (async () => {
      let stoListaFotos = await getData('@ListaFotos')
      let varDados      = []
      let index         = 0

      console.log('@ListaFotos:',stoListaFotos)

      for await ( let it of stoListaFotos.data ) {
        varDados.push( {id: it.id, 
                        title: it.dados.cartaFrete+' - '+it.dados.operacao, 
                        uri: it.imagem.uri,
                        cartaFrete: it.dados.cartaFrete,
                        data: it.dados.data,
                        motorista: it.dados.motorista,
                        placas: it.dados.placas,
                        observacao: it.dados.observacao || '',
                        operacao: it.dados.operacao,
                        tipoVeiculo: it.dados.tipoVeiculo,
                        valida: true,
                        index: index++,
           })
      }
      setDadosFotos( varDados )
    })();

  }, []);
  
  const existeMarcadosParaExcluir = async () => {
    let ret = false
    for await (let i of dadosFotos) {
      if(i.valida===false) { ret = true }
    }
    return ret
  }

  const sairTela = async () => {
    
    let marcados = await existeMarcadosParaExcluir()
    if (marcados) {
        Alert.alert('Confirmação:', 'Exclui dados marcados, para exclusão?',
        [{
          text: 'SIM',
          onPress: () => {excluiMarcadosParaExclusao()},
          style: 'default'
        },{
          text: 'NÃO',
          onPress: () => {},
          style: 'default'
        }],
        { cancelable: false })
        navigation.goBack()

    } else {
      navigation.goBack()
    }


  }


  const excluiMarcadosParaExclusao = async () =>{
    let IDs = []
    let newListaFotos = []
    let ok  = false
    let idx

    let stoListaFotos = await getData('@ListaFotos')
    let listaFotos = stoListaFotos.data
    console.log('####################### listaFotos',listaFotos)


    for await ( let i of dadosFotos) {   
      idx = i.index
      if(!i.valida) {
        IDs.push( i.id )
      } else {

        console.log(`listaFotos[${idx}] : ${listaFotos[idx]}`)

        if(listaFotos[idx]) {
          console.log('idx',idx)
          newListaFotos.push( listaFotos[idx] )
        }  
      }
    }



    if(IDs) {     

      await MediaLibrary.deleteAssetsAsync(IDs).then((ok)=>{
        console.log('Midia Excluida:',ok)

        console.log('(Picture-excluiMarcadosParaExclusao)  newListaFotos:',newListaFotos)

        setData('@ListaFotos',newListaFotos).then((a)=>{
          Alert.alert('Dados excluido com sucesso.')
          console.log('++++++++++++++++++++++++++++++++++++++++++++++++++')
          console.log(a)
          console.log('++++++++++++++++++++++++++++++++++++++++++++++++++')
        })
      })

    }
  }

  return (
    <View style={styles.background}>

       <SafeAreaView style={styles.container}>
        <FlatList
          ref={refFoto}
          data={dadosFotos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      </SafeAreaView>

      <SafeAreaView
            style={styles.btnContainer}
            >
      <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={ sairTela }
        >
          <Text style={styles.submitText}> 
              Sair
          </Text>
      </TouchableOpacity>        

      <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={ enviasDados }
        >
          <Text style={styles.submitText}> 
              Enviar
          </Text>
      </TouchableOpacity>        
      </SafeAreaView>

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
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 1,
    margin: 1,
    marginTop: StatusBar.currentHeight-12 || 0,
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18,
  },
  LabelTitulo:{
    color: '#000',
    textAlign: "center",
    margin: 0,
    padding: 0,
    fontSize: 16
  },
  imagem:{
    width: '100%',
    height: 410,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 7,
    marginVertical: 8,
    marginHorizontal: 8,
    width: deviceWidth-15,
  },
  title: {
    color: '#000',
    fontSize: 22,
  },    
  filename: {
    color: '#121212',
    fontSize: 12,
  },    
  delete:{
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15,
    right: 5,
    position: 'absolute',
    margin:2,
    backgroundColor: '#35AAFF',
    height: 50,
    width: 50,
    borderRadius: 7,
    zIndex: 1,
  },
  validade:{
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15,
    right: 50,
    position: 'absolute',
    margin:2,
    backgroundColor: 'transparent',
    height: 50,
    width: 50,
    borderRadius: 7,
    zIndex: 1,
  },
  btnContainer: {
    flexDirection: 'row',

  },

});
