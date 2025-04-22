import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
import { TasksContext } from '../context/TasksContext';

function Tasks() {
    const { tasks, deleteTask } = useContext(TasksContext);

    const handleDelete = (id) => {
        Alert.alert('Tem certeza?', 'Deseja concluír a tarefa?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancelado'),
            },
            {
                text: 'Concluír',
                onPress: () => deleteTask(id)
            }
        ])
    }

    return (
       <SafeAreaView style={{ flex: 1}}>
            <FlatList 
                    data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.taskCard} onPress={() => handleDelete(item.id)}>
                        <Text style={styles.taskId}>ID: {item.id}</Text>
                        <Text style={styles.taskTitle}>{item.titulo}</Text>
                        <Text style={styles.taskDescription}>{item.descricao}</Text>
                        <Text style={styles.taskMeta}>Cliente: {item.cliente}</Text>
                        <Text style={styles.taskMeta}>Consultor: {item.consultor}</Text>
                        <Text style={styles.taskMeta}>Urgência: {item.urgencia}</Text>
                        <Text style={[styles.taskStatus, item.status === 'Concluida' && { color: 'green'}]}>Status: {item.status}</Text>
                        </TouchableOpacity>
                    )}
                />
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    taskCard: {
      backgroundColor: '#29292e',
      borderRadius: 10,
      padding: 15,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    taskId: {
      color: '#aaa',
      fontSize: 12,
      marginBottom: 4,
    },
    taskTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    taskDescription: {
      color: '#ccc',
      fontSize: 14,
      marginBottom: 6,
    },
    taskMeta: {
      color: '#bbb',
      fontSize: 14,
      marginBottom: 2,
    },
    taskStatus: {
      color: '#61dafb',
      fontSize: 14,
      fontStyle: 'italic',
      marginTop: 6,
    },
  });  

export default Tasks;
