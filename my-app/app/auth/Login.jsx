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
  ToastAndroid,
} from 'react-native';
import { useAuthStore } from '../../src/presentation/auth/store/useAuthStore';
import { router } from 'expo-router';
import { Toast } from 'toastify-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuthStore();
  const handleLogin = async () => {
    try{
      setIsLoading(true);
      if (!email && !password) {
        Toast.warn('Por favor, ingresa tu correo electrónico y contraseña.');
        return
      }
      const resp = await login(email, password);
      if (resp) {
        router.push('(tabs)/movies/home');
      } else {
         Toast.error('Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.');
      }
    }catch(error){
      console.log('Error al iniciar sesión:', error);
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
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
              {isLoading &&
              <ActivityIndicator size="small" color="#fff" />
              }
            </TouchableOpacity>
            
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                ¿No tienes una cuenta? 
              </Text>
              <TouchableOpacity onPress={()=>router.push('/auth/Register')}><Text style={styles.registerLink}> Regístrate aquí</Text></TouchableOpacity>
            </View>
          </View>
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  registerContainer: {
    marginTop: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 16,
  },
  registerText: {
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
