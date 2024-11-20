import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuthStore } from '../../src/presentation/auth/store/useAuthStore';
import { router } from 'expo-router';
import ToastManager, { Toast } from "toastify-react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {register} = useAuthStore();

  const handleRegister = async () => {
    try{
        setIsLoading(true);
        if (!email || !password || !password_confirmation || !name) {
            Toast.warn('Por favor, completa todos los campos.');
            setIsLoading(false);
            return;
        }
        if (password !== password_confirmation) {
            Toast.warn('Las contraseñas no coinciden.');    
            setIsLoading(false);
            return;
        }
        const resp = await register(name,email, password,password_confirmation);
        if (resp) {
            Toast.success('Se ha creado el ususario correctamente')
            router.push('(tabs)/movies/home')
            setIsLoading(false);
        }
        if (!resp) {
            Toast.error('El usuario ya existe')
            setIsLoading(false);
        }
        setIsLoading(false);
    }catch(error){
        Toast.error('Ha ocurrido un error al crear el usuario')
        setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.card}>
            <Image
            source={require('../../assets/icon.png')}
            style={styles.logo}
            />
            <Text style={styles.subtitle}>Gestión de Contenidos Multimedia</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="tu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Tú nombre"
                value={name}
                onChangeText={setName}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password_confirmation}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Crear Cuenta</Text>
              {isLoading &&
              <ActivityIndicator size="small" color="#fff" />
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.backbutton} onPress={()=>(router.back())}>
              <Text style={{textAlign: 'center', color: '#007AFF', fontSize: 16, fontWeight: '600'}}>Volver</Text>
            </TouchableOpacity>
          </View>
          <ToastManager />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  backbutton: {
    margin:10,
    color: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  registerLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  registerLinkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
