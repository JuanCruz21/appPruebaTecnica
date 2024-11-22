import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import FloatingButton from '../../../src/presentation/movies/components/FloatingButton';
import { router, Link } from 'expo-router';
import DropdownCategory from '../../../src/presentation/movies/components/dropdown-Category';
import { indexContent } from '../../../core/content/actions/content-actions';
import { useEffect, useState } from 'react';

export default function Home() {
  const [content, setContent] = useState([]);
  const getContent = async () => {
    try {
      const response = await indexContent();
      setContent(response);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <DropdownCategory />
      <ScrollView style={styles.container}>
        {content.map((element, index) => (
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
    padding: 30,
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
});