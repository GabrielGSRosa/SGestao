import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const handleTasks = async (data) => {
        const updatedTasks = [...tasks, data];
        setTasks(updatedTasks);
    
        try {
            await AsyncStorage.setItem('@TaskList', JSON.stringify(updatedTasks));
        } catch (e) {
            console.error("Erro ao salvar tarefa:", e);
        }
    };

    const loadTasks = (data) => {
        setTasks(data);
    };

    const deleteTask = async (id) => {
        try {
            const data = await AsyncStorage.getItem('@TaskList');
            const response = JSON.parse(data).filter((item) => item.id !== id)
            setTasks(response);
            console.log('Tarefa apagada com sucesso!');
        } catch (e) {
            console.error('Erro ao apagar as tarefas:', e);
        }
    };

    return (
        <TasksContext.Provider value={{ tasks, handleTasks, loadTasks, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
};
