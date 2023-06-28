import { LogBox } from 'react-native';
LogBox.ignoreLogs([`Scripts "build/three.js"`]);

import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import Navigation from './src/navigation';
import { store } from './src/store';

const STRIPE_PUBLIC_KEY =
  'pk_test_51JOBJnSA4EPPqs66VxVusJrEerUnYWuDGHkzasE78kNncq9UgLx4PwQdU8XPpn41qwz1vhNsxcY14rSQ7fC0c0gt00lNQYG9wa';

export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
      <Provider store={store}>
        <Navigation />
        <StatusBar style='auto' />
      </Provider>
    </StripeProvider>
  );
}
