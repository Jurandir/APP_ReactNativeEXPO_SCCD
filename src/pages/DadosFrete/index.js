import React, {useState, useEffect} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import {  Alert,
          View,
          Modal, 
          ScrollView,
          SafeAreaView,
          KeyboardAvoidingView, 
          Image, 
          TextInput, 
          TouchableOpacity,
          TouchableHighlight,
          Button, 
          Text, 
          StyleSheet, 
          Animated, 
          Keyboard
             } from 'react-native';

export default function DadosFrete( { navigation } ) {

  const [modalVisible, setModalVisible] = useState(false);
  const [placas      , setPlacas]       = useState('AAA-0000');
  const [motorista   , setMotorista]    = useState('JOSE FRANCISCO SILVA');
  const [operacao    , setOperacao]     = useState('CARGA');
  const [tipoVeiculo , setTipoveiculo]  = useState('NORMAL');
  const [observacao  , setObservacao]   = useState('');    
  const [cartaFrete  , setCartafrete]   = useState('');    
  

  useEffect(() => {
    setPlacas('WWW-8888')
    setCartafrete('SPO-87654')
  }, []);


  return (
    <SafeAreaView style={styles.background}>

        <Text style={styles.LabelTitulo}
              onPress={() => { setModalVisible(!modalVisible)}}        
        >
          Carta Frete
        </Text>
        <Text style={styles.LabelCartaFrete}>
          {cartaFrete}
        </Text>

        <Text style={styles.LabelText}>Placas</Text>
        <TextInput
          value={placas}
          style={styles.input}
          editable = {false}
          placeholder="Placas"
          autoCorrect={false}
          onChangeText={(text)=> { setPlacas(text)}}
        />

        <Text style={styles.LabelText}>Motorista</Text>
        <TextInput
          value={motorista}
          style={styles.input}
          editable = {false}
          placeholder="Motorista"
          autoCorrect={false}
          onChangeText={(text)=> { setMotorista(text)}}
        />

        <Text style={styles.LabelText}>Observações</Text>
        <TextInput
          value={observacao}
          style={styles.input}
          placeholder="Observações"
          autoCorrect={false}
          onChangeText={(text)=> { setObservacao(text)}}
        />

        <Text style={styles.LabelTituloBTN}>Operação:</Text>
        <TextInput
          value={operacao}
          style={styles.input}
          editable = {false}
          placeholder="Operação"
          autoCorrect={false}
          onChangeText={(text)=> { setOperacao(text)}}
        />

        <Text style={styles.LabelTituloBTN}>Tipo Veiculo:</Text>
        <TextInput
          value={tipoVeiculo}
          style={styles.input}
          editable = {false}
          placeholder="Tipo Veiculo"
          autoCorrect={false}
          onChangeText={(text)=> { setTipoveiculo(text)}}
        />

        <View style={styles.containerBTN}>
          <TouchableOpacity 
              style={styles.btnImagens}
              onPress={ () => { navigation.navigate('Divice')}}
          >
            <Text style={styles.submitText}>
                Foto
            </Text>

          </TouchableOpacity>

          <TouchableOpacity 
              style={styles.btnImagens}
              onPress={ () => { navigation.navigate('Imagens')}}
          >
            <Text style={styles.submitText}>
                Imagens
            </Text>

          </TouchableOpacity>


          <TouchableOpacity 
              style={styles.btnSair}
              onPress={ () => { navigation.navigate('CartaFrete')}}
          >
            <Text style={styles.submitText}>
                Sair
            </Text>

          </TouchableOpacity>        
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { Alert.alert("Modal has been closed."); }}
        >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Operação:</Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setOperacao('CARGA')
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Carga</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setOperacao('DESCARGA')
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Descarga</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setOperacao('VAZIO')
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Vazio</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setOperacao('AVARIA')
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Avaria</Text>
                </TouchableHighlight>

              </View>
            </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',

  },
  containerBTN:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#191919',
    marginTop:20,

  },
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 10,
    
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginTop:5,
    marginBottom:10,
    color:'#000',
    fontSize: 17,
    borderRadius: 7,
    padding: 5,

  },
  btnImagens:{
    backgroundColor: '#35AAFF',
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  btnSair:{
    backgroundColor: '#35AAFF',
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  submitText:{
    color: '#FFF',
    fontSize: 20,

  },
  scrollView: {
    marginHorizontal: 5,
  },
  LabelText:{
    color: '#FFF',
    textAlign: "left",
    alignSelf: 'stretch',
    marginLeft: 20,
  },
  LabelTituloBTN:{
    color: '#FFF',
    backgroundColor: "#35AAFF",
    borderRadius: 5,    
    textAlign: "left",
    alignSelf: 'baseline',
    padding: 2,
    marginLeft: 20,
  },
  LabelTitulo:{
    color: '#FFF',
    textAlign: "center",
    marginTop: 2,
    fontSize: 14
  },
  LabelCartaFrete:{
    color: '#FFF',
    textAlign: "center",
    marginTop: 0,
    marginBottom: 10,
    fontSize: 30
  },  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    margin: 5,
    width: '90%',
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  }  

});

