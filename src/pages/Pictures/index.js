import React, {useState, useEffect} from 'react';
import {  View, 
          SafeAreaView,
          FlatList,
          Image, 
          TouchableOpacity,
          Text, 
          StyleSheet,
          StatusBar, 
          Dimensions } from 'react-native';
import { getData } from '../../utils/dataStorage';

const deviceWidth = Dimensions.get('window').width
import { AntDesign } from '@expo/vector-icons'; 


const renderItem = ({ item }) => (
  <Item ITEM={item}/>
);

const Item = ( params ) => (
  <View style={styles.item}>
    <Text style={styles.LabelTitulo}>{params.ITEM.title}</Text>
    <Image
        style={styles.imagem}
        source={ getImagem( params.ITEM ) }
     />

     <TouchableOpacity style={styles.delete} onPress={()=> {}}>
        <AntDesign name="delete" size={30} color="#111" />
     </TouchableOpacity>

    <Text style={styles.filename}>{'Placas: '+params.ITEM.placas}</Text>
    <Text style={styles.filename}>{'Motorista: '+params.ITEM.motorista}</Text>
    <Text style={styles.filename}>{'Tipo Veículo: '+params.ITEM.tipoVeiculo}</Text>
    <Text style={styles.filename}>{'Obs: '+params.ITEM.observacao}</Text>
  </View>
);

const getImagem = (obj) =>{
  console.log('OBJ:',obj)
  return { isStatic: true , uri: obj.uri }
}

export default function Pictures( { navigation } ) {

  const [dadosFotos  , setDadosFotos]   = useState({});

  useEffect(() => {
    
    (async () => {
      let stoDadosFotos = await getData('@ListaFotos')
      let varDados = []

      // setCartaFrete(stoDadosFotos.data.)
      console.log('===================================================================(useEffect)')
      console.log('@ListaFotos  (DATA):',stoDadosFotos.data )

      for await ( let it of stoDadosFotos.data ) {
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
           })
      }
      setDadosFotos( varDados )

      // "file:///storage/emulated/0/DCIM/67a84fc7-cded-4c3d-bebb-6897ff589757.jpg"
      // it.imagem.uri

      console.log('@ListaFotos  (varDados):', varDados )
  
    })();

  }, []);
  
  const sairTela = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.background}>

       

       {/* Flatlist */}

       <SafeAreaView style={styles.container}>
        <FlatList
          data={dadosFotos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      </SafeAreaView>




 


        <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={ sairTela }
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
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 2,
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
    bottom: -10,
    right: -20,
    position: 'absolute',
    margin:30,
    backgroundColor: '#35AAFF',
    height: 50,
    width: 50,
    borderRadius: 7,


  }
});
