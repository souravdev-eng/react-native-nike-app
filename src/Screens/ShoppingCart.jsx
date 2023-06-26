// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import CartListItem from '../components/CartListItem.jsx';
import { selectDeliveryPrice, selectSubtotal, selectTotal, cartSlice } from '../store/cartSlice';
import { useCreateOrderMutation } from '../store/apiSlice.js';

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{deliveryFee} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  );
};

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  if (error) {
    return <Text>Error fetching data {error?.error}</Text>;
  }

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: 'Sourav',
        address: 'Kolkata',
        email: 'sourav_test@gmail.com',
      },
    });
    if (result?.data?.status === 'OK') {
      Alert.alert(
        'Order has been submitted',
        `Your order reference is: ${result?.data?.data?.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
  };

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={onCreateOrder}>
        <Text style={styles.buttonText}>Checkout {isLoading && <ActivityIndicator />}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },

  button: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ShoppingCart;
