import { FlatList, Image, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { productsSlice } from '../store/productsSlice';
// import products from '../data/products';

const ProductsScreen = ({ navigation }) => {
  // @ts-ignore
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          style={styles.container}
          onPress={() => {
            dispatch(productsSlice.actions.setSelectedProduct(item.id));
            navigation.navigate('Product Details');
          }}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
