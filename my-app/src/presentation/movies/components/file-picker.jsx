import * as DocumentPicker from 'expo-document-picker';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import {shareAsync} from 'expo-sharing';
import { Platform } from 'react-native';

const save = async (uri, filename, mimetype) => {
  if (Platform.OS === "android") {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const archivo = await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
        })
        .catch(e => console.error(e));
      return base64
    } else {
      shareAsync(uri);
    }
  } else {
    shareAsync(uri);
  }
};

export default FilePicker = ({ onSelect }) => {
  const guardarDocumento = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log('Resultado:', result);

      if (result.type === 'cancel') {
        console.log('Document picking cancelled');
        return null;
      }

      const fileUri = result.assets[0].uri;
      const results = await save(fileUri, result.assets[0].name,result.assets[0].mimeType);
      console.log('Archivo guardado:', results);

      // Obtener información del archivo guardado
      const fileInfo = FileSystem.getContentUriAsync(fileUri, fileUri);
      console.log('File info', fileInfo)
      // Pasar el archivo simulado al callback
      onSelect(fileInfo);
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