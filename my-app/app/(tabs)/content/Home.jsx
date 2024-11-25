import { Text, View, StyleSheet, ScrollView, Image,RefreshControl, TouchableOpacity } from 'react-native';
import FloatingButton from '../../../src/presentation/movies/components/FloatingButton';
import { router, Link } from 'expo-router';
import DropdownCategory from '../../../src/presentation/movies/components/dropdown-Category';
import { indexContent, deleteContent } from '../../../core/content/actions/content-actions';
import { useEffect, useState } from 'react';
import {Ionicons} from '@expo/vector-icons';

export default function Home() {
  const [content, setContent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [category_id, setCategory] = useState(null); 
  const [favorite, setFavorite] = useState(false)

  const getContent = async (category_id,favorite) => {
    try {
      const response = await indexContent(category_id,favorite);
      setContent(response);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleCategory = (categoryId) => {
    setCategory(categoryId);
  }

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    getContent(category_id,favorite);
    console.log('categoria ', category_id)
  }, [category_id,favorite]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getContent(category_id,favorite);
    setRefreshing(false);
  };

  const deleteCont = async (id) => {
    try {
      const resp = await deleteContent(id);
      await getContent();
      console.log(resp)
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };
  return (
    <>
      <View style={styles.row}>
      <DropdownCategory onSelect={handleCategory}/>
      <TouchableOpacity onPress={()=> setFavorite(!favorite)}>
        {favorite ? (
          <View style={styles.row}> 
            <Ionicons name="star" size={24} color="gold" />
            </View> ): (<View style={styles.row}>
            <Ionicons name="star-outline" size={24} color="gold" />
          </View> )}
      </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {content.map((element, index) => (
          <View style={styles.itemContainer} key={index}>
          <Link key={index} href={{pathname:'/content/[detail]', params:{id:element.id}}}>
            <View key={index}  style={styles.itemContainer}>
                <Image
                  source={{ uri: element.urldata.startsWith('http') 
                    ? element.urldata  // Si ya tiene 'http', no lo agregues
                    : 'http://127.0.0.1:8000' + element.urldata }}
                  style={{ width: '90%', height: 250, resizeMode: 'cover', alignSelf: 'center', borderRadius:20 }}
                />
              <Text style={styles.title}>{element.title}</Text>
              <Text style={styles.subtitle}>{element.description}</Text> 
            </View>
          </Link>
          <View style={{flexDirection:'row'}}>
            <Link key={index+10}
            style={{backgroundColor:'black', color:'white', padding:20, borderRadius:10, margin:10}} 
            href={{pathname:'/content/update/[edit]',params:{edit:element.id}}}>
                  Editar contenido {element.title}
            </Link>
            <TouchableOpacity 
              style={{backgroundColor:'red', color:'black', padding:20, borderRadius:10, margin:10,fontWeight:'bold'}}
              onPress={()=>deleteCont(element.id)}>
                  <Ionicons name="trash-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          </View>
        ))}
      </ScrollView>
      <FloatingButton
        onTap={() => router.push('/content/create')}
        backgroundColor="#000"
        icon="+"
        style={styles.floatingButton}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  itemContainer: {
    width: '100%',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  floatingButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    bottom: 10,
  },
  row: {
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
});