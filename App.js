// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './src/screens/Index';
import Home from './src/screens/Home';
import RegisterForm from './src/screens/RegisterForm';
import AddTask from './src/components/AdcTask';
import { TasksProvider } from './src/context/TasksContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TasksProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RegisterForm" component={RegisterForm} />
          <Stack.Screen name="AddTask" component={AddTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
}
