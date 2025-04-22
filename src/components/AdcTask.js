import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TasksContext } from '../context/TasksContext';
import BackButton from '../components/BackButton';
const { height, width } = Dimensions.get('window');

export default function AdcTask() {
    const clientes = ['Agante', 'Panco', 'Galvani', 'XamegoBom', 'Agility', 'Senior', 'Valemobi', 'MDS'];
    const status = ['Pendente', 'Andamento', 'Concluida', 'Retorno cliente', 'Retorno Senior', 'Retorno consultor'];
    const lUrgencia = ["Baixo", "Médio", "Alto"];
    const consultores = ['Gabriel'];
    const [gestor, setGestor] = useState(1) // Apenas para teste do modal

    const navigation = useNavigation();

    const { handleTasks } = useContext(TasksContext);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [consultor, setConsultor] = useState('');
    const [cliente, setCliente] = useState('');
    const [urgencia, setUrgencia] = useState('')
    const [consultorVisible, setConsultorVisible] = useState(false);
    const [clienteVisible, setClienteVisible] = useState(false);
    const [statusVisible, setStatusVisible] = useState(false);
    const [urgenciaVisible, setUrgenciaVisible] = useState(false);

    const handleAddTask = () => {
      if(cliente !== '' && taskTitle !== '' && taskDescription !== '' && taskStatus !== '' && consultor !== '' && urgencia !== ''){
        const data = {
            id: new Date().getTime().toString(),
            titulo: taskTitle,
            descricao: taskDescription,
            consultor,
            cliente,
            status: taskStatus,
            urgencia
        };
        
        handleTasks(data);
          setCliente('')
          setTaskTitle('');
          setTaskDescription('');
          setTaskStatus('');
          setConsultor('');
          setUrgencia('');
          navigation.navigate('Home');
        } else{
          return Alert.alert('Preencha todos os campos para continuar.')
        }
    };

    const handleSelectClient = (cliente) => {
        setCliente(cliente);
        setClienteVisible(false);
    }

    const handleSelectConsultor = (consultor) => {
        setConsultor(consultor);
        setConsultorVisible(false);
    };

    const handleSelectStatus = (status) => {
        setTaskStatus(status);
        setStatusVisible(false);
    }
    
    const handleSelectUrgencia = (urgencia) => {
        setUrgencia(urgencia);
        setUrgenciaVisible(false);
    }

    const backHome = () => {
      nagivigation.navigate('Home');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

  {/* Modal escolha cliente */}
  <Modal animationType="slide" visible={clienteVisible} transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.dropdownText}>Escolha um cliente:</Text>
        {clientes.map((cliente, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelectClient(cliente)}>
            <Text style={styles.optionText}>{cliente}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cancelButton} onPress={() => setClienteVisible(false)}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>

  {/* Modal escolha consultor (somente para gestores) */}
  {gestor === 1 && (
    <Modal animationType="slide" visible={consultorVisible} transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.dropdownText}>Escolha um consultor:</Text>
          {consultores.map((consultor, index) => (
            <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelectConsultor(consultor)}>
              <Text style={styles.optionText}>{consultor}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancelButton} onPress={() => setConsultorVisible(false)}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )}

  {/* Modal escolha status */}
  <Modal animationType="slide" visible={statusVisible} transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.dropdownText}>Status da atividade:</Text>
        {status.map((statusItem, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelectStatus(statusItem)}>
            <Text style={styles.optionText}>{statusItem}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cancelButton} onPress={() => setStatusVisible(false)}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>

  {/* Modal escolha urgência */}
  <Modal animationType="slide" visible={urgenciaVisible} transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.dropdownText}>Urgência da atividade:</Text>
        {lUrgencia.map((urgenciaItem, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelectUrgencia(urgenciaItem)}>
            <Text style={styles.optionText}>{urgenciaItem}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cancelButton} onPress={() => setUrgenciaVisible(false)}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>

  {/* Modal principal do formulário de tarefa */}
  <Modal animationType="slide" visible={true} transparent>
    <View style={styles.taskModalOverlay}>
      <View style={styles.taskModalContent}>
        <BackButton />
        <Text style={styles.taskTitle}>Nova Tarefa</Text>

        {/* 1. Título */}
        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          placeholder="Título da tarefa"
          placeholderTextColor="#ccc"
          onChangeText={setTaskTitle}
          value={taskTitle}
        />

        {/* 2. Cliente */}
        <TouchableOpacity style={styles.inputButton} onPress={() => setClienteVisible(true)}>
          <Text style={styles.inputButtonText}>{cliente !== '' ? cliente : "Escolha um cliente"}</Text>
        </TouchableOpacity>

        {/* 3. Descrição */}
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Descrição..."
          placeholderTextColor="#ccc"
          onChangeText={setTaskDescription}
          value={taskDescription}
          multiline
        />

        {/* 4. Consultor (se for gestor) */}
        {gestor === 1 && (
          <TouchableOpacity style={styles.inputButton} onPress={() => setConsultorVisible(true)}>
            <Text style={styles.inputButtonText}>{consultor !== '' ? consultor : "Selecione um Consultor"}</Text>
          </TouchableOpacity>
        )}

        {/* 5. Status */}
        <TouchableOpacity style={styles.inputButton} onPress={() => setStatusVisible(true)}>
          <Text style={styles.inputButtonText}>{taskStatus !== '' ? taskStatus : "Escolha o Status"}</Text>
        </TouchableOpacity>
        
        {/* 6. Status */}
        <TouchableOpacity style={styles.inputButton} onPress={() => setUrgenciaVisible(true)}>
          <Text style={styles.inputButtonText}>{urgencia !== '' ? urgencia : "Urgência da Atividade"}</Text>
        </TouchableOpacity>

        {/* 7. Botão Adicionar */}
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleAddTask}>
          <Text style={styles.textButton}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
</SafeAreaView>

    );
}

const styles = StyleSheet.create({
    taskModalOverlay: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    taskModalContent: {
      height: height,
      width: width,
      backgroundColor: '#121214',
      padding: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    taskTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      backgroundColor: '#1E1E1E',
      color: '#FFF',
      padding: 12,
      borderRadius: 10,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#333',
    },
    multilineInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    label: {
      color: '#ccc',
      fontSize: 16,
      marginBottom: 5,
    },
    inputButton: {
      backgroundColor: '#1E1E1E',
      borderRadius: 10,
      padding: 12,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#333',
    },
    inputButtonText: {
      color: '#ccc',
      fontSize: 16,
    },
    button: {
      backgroundColor: '#FFA832',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    textButton: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalBox: {
      marginHorizontal: 30,
      backgroundColor: '#1E1E1E',
      borderRadius: 10,
      padding: 20,
    },
    dropdownText: {
      color: '#FFF',
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#7d7d7d',
    },
    optionText: {
      color: '#FFF',
      fontSize: 16,
    },
    cancelButton: {
      marginTop: 15,
      alignItems: 'center',
    },
    cancelText: {
      color: '#FF5A5F',
      fontWeight: 'bold',
    },
  });
  