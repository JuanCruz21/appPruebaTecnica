import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import FilePicker from "../../src/presentation/movies/components/file-picker";
import { useState } from "react";
import DropdownCategory from "../../src/presentation/movies/components/dropdown-Category";
import ToastManager, { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";
import { postContent } from "../../core/content/actions/content-actions";

export default function CreateContent() {
  const route = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urldata, setUrlData] = useState(""); // Estado para la URL
  const [category_id, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const nuevoContenido = async () => {
    if (!title || !description || !category_id) {
      Toast.error("Todos los campos son obligatorios");
      return;
    }
    const response = await postContent(title, description, urldata, category_id);
    console.log(response);
    if (response.status === 201) {
      Toast.success("Contenido creado exitosamente");
      route.push("/(tabs)/home");
    } else {
      Toast.error("Error al crear el contenido");
    }
    console.log("Título:", title);
    console.log("Descripción:", description);
    console.log("Categoría seleccionada:", category_id);
  };

  const handleblobSelect = (blob) => {
    if (blob instanceof Blob) {
        console.log('Es un Blob');
    }
    
    if (blob instanceof File) {
        console.log('Es un File');
    }
    setUrlData(blob);
  };
  
  return (
    <View style={styles.container}>
      <ToastManager />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu título"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>URL de la imagen o video</Text>
        <TextInput
          style={styles.input}
          placeholder="Opcional..."
          value={urldata}
          onChangeText={setUrlData}
        />
      </View>
      <DropdownCategory onSelect={handleCategorySelect} />
      <FilePicker onSelect={handleblobSelect}/>
      <TouchableOpacity style={styles.boton} onPress={nuevoContenido}>
        <Text style={styles.texto}>Crear Contenido</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => route.back()}>
        <Text style={styles.textoback}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
  boton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 14,
  },
  texto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textoback: {
    width: "100%",
    height: 50,
    textAlign: "center",
    fontSize: 18,
    color: "blue",
  },
});