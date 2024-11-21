import { View,Text,StyleSheet,TouchableOpacity,TextInput } from "react-native";
import FilePicker from "../../src/presentation/movies/components/file-picker";
import {useState} from 'react'
import { Stack } from "expo-router";
import { Dropdown } from 'react-native-element-dropdown';
import DropdownCategory from "../../src/presentation/movies/components/dropdown-Category";
export default function CreateContent(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const nuevoContenido = () => {
        console.log(title,description)
    }
    return(
        <View style={styles.container}>
            <Stack.Screen options={{title:'Crear Contenido'}}/>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Titulo</Text>
              <TextInput
                style={styles.input}
                placeholder="tu titulo"
                value={title}
                onChangeText={setTitle}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={styles.input}
                placeholder="tu@email.com"
                value={description}
                onChangeText={setDescription}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>

            <DropdownCategory/>
            <FilePicker/>
            <TouchableOpacity style={styles.boton} onPress={nuevoContenido}>
                <Text style={styles.texto}>Crear Contenido</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin: 20,
        justifyContent:'center',
    },
    boton:{
        width:'100%',
        height:50,
        backgroundColor:'#000',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginBottom:14
    },
    texto:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold'
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
})
