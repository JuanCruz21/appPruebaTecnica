import {Text,TouchableOpacity, View} from 'react-native'
import { useAuthStore } from '../../../src/presentation/auth/store/useAuthStore'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';
export default function Perfil() {
  const { logout } = useAuthStore();
  const handleLogout = async () => {
    try{
      await logout();
      router.push('/');
    }catch(error){
      console.error(error)
    }
  }
  return (
    <View style={{flex:1, justifyContent:'flex-start'}}>
      <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20, fontWeight: 'bold', color: "#000"}}>
        Perfil
      </Text>
      <View style={{justifyContent:'center', alignItems:'center', padding:20}}>
        <Ionicons name='person' size={50} color="black" />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          padding: 10,
          margin: 15,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={handleLogout}>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: "#fff"}}>
            Salir
          </Text>
          <Ionicons name="log-out-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}
