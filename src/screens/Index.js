import React, { useState } from 'react';
import {
  StatusBar, SafeAreaView, View, Text, TextInput,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário Autenticado:', user);
        navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert('Erro ao logar', 'E-mail e/ou senha incorretos', [
          { text: 'Ok' }
        ]);
        console.error('Erro ao Autenticar:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.authText}>Login</Text>

      <View>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="E-mail@email.com.br"
          style={styles.authForms}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Senha"
          secureTextEntry
          style={styles.authForms}
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginBtn}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => navigation.navigate('RegisterForm')}
      >
        <Text style={styles.registerBtn}>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    alignItems: "center",
    justifyContent: "center",
  },
  authText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  authForms: {
    width: 275,
    height: 40,
    backgroundColor: '#FFA832',
    borderRadius: 7,
    margin: 10,
  },
  loginBtn: {
    color: '#fff',
    fontSize: 30,
    marginTop: 10,
    marginBottom: 30,
    alignSelf: 'center'
  },
  registerContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  registerBtn: {
    fontSize: 18,
    color: '#fff',
  },  
})