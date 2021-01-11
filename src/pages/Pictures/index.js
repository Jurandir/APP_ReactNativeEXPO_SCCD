import React, {useState, useEffect} from 'react';
import {  View, 
          SafeAreaView,
          FlatList,
          Image, 
          TouchableOpacity,
          Text, 
          StyleSheet, 
          Dimensions } from 'react-native';
import { getData } from '../../utils/dataStorage';

const deviceWidth = Dimensions.get('window').width

const getImagem = (obj) =>{
  console.log('OBJ:',obj)
  return { isStatic: true , uri: obj.uri }
}

const renderItem = ({ item }) => (
  <Item title={item.title} id={item.id} uri={item.uri} />
);

// { id, title, source }

const Item = ( params ) => (
  <View style={styles.item}>
    <Text style={styles.filename}>{params.title}</Text>
    <Image
        style={styles.imagem}
        source={ getImagem( params ) }
      />
  </View>
);

// "file:///storage/emulated/0/DCIM/67a84fc7-cded-4c3d-bebb-6897ff589757.jpg"
// source={{ isStatic: true , uri: "file:///storage/emulated/0/DCIM/67a84fc7-cded-4c3d-bebb-6897ff589757.jpg" }}


export default function Pictures( { navigation } ) {

  const [dadosFotos  , setDadosFotos]   = useState({}); 
  
  //dadosFotos = []


  useEffect(() => {
    
    (async () => {
      let stoDadosFotos = await getData('@ListaFotos')
      let varDados = []
      console.log('===================================================================(useEffect)')
      //console.log('@ListaFotos  (DATA):',stoDadosFotos.data )

      for await ( let it of stoDadosFotos.data ) {
        varDados.push( {id: it.id, 
                        title: it.imagem.filename, 
                        uri: it.imagem.uri,
          
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

       <Text style={styles.LabelTitulo}>Imagens:</Text>

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
    margin: 1
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
  LabelTitulo:{
    color: '#FFF',
    textAlign: "center",
    marginBottom: 0,
    fontSize: 20
  },
  imagem:{
    width: '100%',
    height: 410,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
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
    fontSize: 15,
  },    
});
