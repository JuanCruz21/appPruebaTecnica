import * as DocumentPicker from 'expo-document-picker';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
export default FilePicker = () => {
  const guardarDocumento = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({});
        if (result.type === 'success') {
          return result.uri;
        } else {
          console.log('Document picking cancelled');
          return null;
        }
      } catch (err) {
        console.log('Error picking document:', err);
        return null;
      }
  }
  return (
    <View>
        <TouchableOpacity style={style.TouchableOpacity} onPress={guardarDocumento}>
            <Text style={style.Text}>Seleccionar archivo</Text>
            <Ionicons name="cloud-upload" size={24} color="white" />
        </TouchableOpacity>
    </View>
  );
};

export const style = StyleSheet.create({
    TouchableOpacity:{
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
         justifyContent: 'space-around',
         marginVertical: 20,
    },
    Text:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})