import React, {useState} from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

import BackButton from '../components/BackButton'



export default function RegisterForm() {
    const navigation = useNavigation();
    const [empresa, setEmpresa] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState(''); 
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const clean = () => {
        setEmpresa('');
        setNome('');
        setCpf('');
        setEmail('');
        setSenha('');
    }

    const registerUser = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log('Usuário cadastrado:', userCredential.user);
        } catch (error) {
            Alert.alert('Erro ao se cadastrar', `Erro ao se cadastrar na plataforma, entre em contato com o suporte. \n${error.code} : ${error.message}`, [
                { text: 'OK' }
            ]);
        }
    };

    const sendForms = () => {
        if (!empresa || !nome || !cpf || !email || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        registerUser(email, senha);
        clean()
        backHome()
    };

    const backHome = () => {
        navigation.navigate('Home')
    }

    const options = ['Funcionario', 'Gestor']

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <BackButton />

            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.label}>Nome da Empresa:</Text>
            <TextInput style={styles.input} placeholder="Digite o nome da Empresa..." placeholderTextColor='#6a6a6a' value={empresa} onChangeText={setEmpresa} />
            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} placeholder="Digite seu Nome..." placeholderTextColor='#6a6a6a' value={nome} onChangeText={setNome} />
            <Text style={styles.label}>CPF:</Text>
            <TextInput style={styles.input} placeholder="Digite seu CPF..." placeholderTextColor='#6a6a6a' value={cpf} onChangeText={setCpf} />
            <Text style={styles.label}>E-mail:</Text>
            <TextInput style={styles.input} placeholder="Digite seu E-mail..." placeholderTextColor='#6a6a6a' value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Senha:</Text>
            <TextInput style={styles.input} placeholder="Digite sua Senha..." placeholderTextColor='#6a6a6a' value={senha} onChangeText={setSenha} secureTextEntry />
            {/*<Text style={styles.label}>Cargo:</Text>
            <View style={styles.button}>
                <TouchableOpacity style={styles.textButton} onPress={() => setVisible(true)}>
                    <Text style={styles.buttonText}>{selectedOption ? selectedOption : "Selecione um cargo"}</Text>
                </TouchableOpacity>

                    <Modal style={styles.dropdownContainer} animationType="slide" visible={visible}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <Text style={styles.dropdownText}>Escolha uma opção</Text>
                                {options.map((option, index) => (
                                    <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelect(option)}>
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setVisible(false)}>
                                    <Text style={styles.cancelText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
            </View> */}
            <TouchableOpacity style={styles.registerButton} onPress={() => sendForms(empresa, nome, cpf, email, senha)}>
                <Text style={styles.registerText}>Cadastrar</Text>
            </TouchableOpacity>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121214',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#29292e',
        color: '#f1f1f1',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginVertical: 10,
        borderRadius: Platform.OS === 'ios' ? 10 : 8,
    },
    button: {
        backgroundColor: '#FFA832',
        padding: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121214',
    },
    dropdownContainer: {
        marginVertical: 10,
    },
    dropdownButton: {
        backgroundColor: '#29292e',
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownText: {
        fontSize: 18,
        color: '#f1f1f1',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#29292e',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    optionText: {
        fontSize: 18,
        color: '#f1f1f1',
    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFA832',
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121214',
    },
    registerButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFA832',
        borderRadius: 8,
        alignItems: 'center',
    },
    registerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121214',
    },
});
