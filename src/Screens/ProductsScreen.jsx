// @ts-nocheck
import { FlatList, Image, StyleSheet, Pressable, ActivityIndicator, Text } from 'react-native';
import { useGetProductsQuery } from '../store/apiSlice';

const ProductsScreen = ({ navigation }) => {
  const { error, data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error fetching data {error.error}</Text>;
  }
  const products = data.data;

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          style={styles.container}
          onPress={() => {
            // dispatch(productsSlice.actions.setSelectedProduct(item.id));
            navigation.navigate('Product Details', { id: item?._id });
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
