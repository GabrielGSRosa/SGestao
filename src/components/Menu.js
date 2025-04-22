import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
const { width } = Dimensions.get('window');

const Menu = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

            <View style={styles.containerButtons}>
                <TouchableOpacity>
                    <Text style={styles.modalText}>Minhas Tarefas</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.modalText}>Tarefas Concluídas</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.modalText}>Tarefas do Time</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.footerMenu}>
            <Text style={styles.footerText}>Meu ID: {}</Text>
            <Text style={styles.footerText}>Versão: 1.0.3</Text>
            <Text style={styles.footerText}>Dev: Gabriel Schoenfelder</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10, // Garante que o botão fique acima de outros elementos
  },
  menuButton: {
    width: 30,
    height: 25,
    justifyContent: 'space-around',
  },
  hamburgerLine: {
    width: 30,
    height: 3,
    backgroundColor: 'white',
  },
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
    width: width * 0.8,
  },
  modalContent: {
    backgroundColor: '#121214',
    // width: '80%', // Largura do modal conforme necessário
    height: '100%',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 30,
    color: 'white'
  },
  containerButtons: {
    marginTop: 60, // Distância do conteúdo do menu em relação ao botão de fechar
  },
  modalText: {
    color: 'white',
    fontSize: 22,
    marginTop: 15,
    textAlign: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    borderTopColor: '#FFA832',
  },
  footerMenu: {
    position: 'absolute',
    bottom: 10,
    left: '20%',
  },
  footerText: {
    color: 'grey',
  },
});

export default Menu;