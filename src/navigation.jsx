import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsScreen from './screens/ProductsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ShoppingCart from './screens/ShoppingCart';
import { Pressable, Text } from 'react-native';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectNumberOfItems } from './store/cartSlice';
import TrackOrder from './screens/Tracker';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems);
  // const numberOfItems = 10;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
        <Stack.Screen
          name='Products'
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerTitle: '',
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Cart')}
                style={{ flexDirection: 'row' }}
              >
                <FontAwesome5 name='shopping-cart' size={18} color='gray' />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>{numberOfItems}</Text>
              </Pressable>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                onPress={() => navigation.navigate('Track')}
                name='truck-delivery'
                size={22}
                color='gray'
              />
            ),
          })}
        />
        <Stack.Screen
          name='Product Details'
          component={ProductDetailsScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen name='Cart' component={ShoppingCart} />
        <Stack.Screen name='Track' component={TrackOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
