import * as DocumentPicker from 'expo-document-picker';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default FilePicker = ({ onSelect }) => {
  const guardarDocumento = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (result.type === 'cancel') {
        console.log('Document picking cancelled');
        return null;
      }

      // Crear un archivo simulando el objeto `File`
      const file = {
        uri: result.assets[0].uri, // URI del archivo
        name: result.assets[0].name, // Nombre del archivo
        type: result.assets[0].mimeType, // Tipo MIME del archivo
      };

      // Llamar al callback con el archivo
      onSelect(file);
    } catch (err) {
      console.log('Error picking document:', err);
      return null;
    }
  };

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
  TouchableOpacity: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  Text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});