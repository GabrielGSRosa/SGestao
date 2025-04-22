import React, { useState, useEffect, useContext } from "react";
import { StatusBar, Platform, SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Tasks from '../components/Tasks';
import Menu from '../components/Menu';
import AdcTask from '../components/AdcTask';
import { TasksContext } from "../context/TasksContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const { tasks, loadTasks } = useContext(TasksContext);
    const [addTaskVisible, setAddTaskVisible] = useState(false);

    const navigation = useNavigation();

    const handleFormTask = () => {
        navigation.navigate('AddTask');
    };


    // Procura as tasks armazenadas em memória/cache
    async function getItem() {
        const response = await AsyncStorage.getItem('@TaskList');
        if (response) {
            loadTasks(JSON.parse(response));
        }
    }

    
    useEffect(() => {
        getItem();
    }, []);

    
    useEffect(() => {
        AsyncStorage.setItem('@TaskList', JSON.stringify(tasks));
        console.log(tasks)
    }, [tasks]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
            barStyle="light-content"  
            />

            <Menu />

            <View style={styles.view}>
                <Text style={styles.text}>Adicone uma nova tarefa</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={handleFormTask}
                >
                    <Text style={styles.textButton}>Adicionar</Text>
                </TouchableOpacity>
                
                <Text style={styles.textTasks}>Minhas tarefas</Text>
                <Tasks />

                {addTaskVisible ? <AdcTask /> : null}
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121214'
    },
    view: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 70,
    },
    text: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    textTasks: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginVertical: 20,
    },
    input: {
        backgroundColor: '#29292e',
        color: '#f1f1f1',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 10,
        borderRadius: Platform.OS === 'ios' ? 10 : 8,
    },
    button: {
        backgroundColor: '#FFA832',
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
