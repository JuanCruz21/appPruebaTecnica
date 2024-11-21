import {Text, View, StyleSheet } from 'react-native'
import FloatingButton from '../../../src/presentation/movies/components/FloatingButton'
import { router } from 'expo-router';
import DropdownCategory  from '../../../src/presentation/movies/components/dropdown-Category'

export default function Home() {

  return (
    <View>
      <DropdownCategory />
      <FloatingButton 
        onTap={()=>router.push('/content/create')}
        backgroundColor="#000"
        icon="+"
        right={10}
        bottom={10}
        top={600}
      />
    </View>
  )
}