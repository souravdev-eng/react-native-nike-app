import { StyleSheet, View } from 'react-native';
import ProductsScreen from './src/Screens/ProductsScreen';
import { StatusBar } from 'expo-status-bar';
import ProductDetailsScreen from './src/Screens/ProductDetailsScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ProductsScreen /> */}
      <ProductDetailsScreen />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
