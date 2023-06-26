import { LogBox } from 'react-native';
LogBox.ignoreLogs([`Scripts "build/three.js"`]);
import { Provider } from 'react-redux';
import Navigation from './src/navigation';
import { store } from './src/store';
import { StatusBar } from 'expo-status-bar';
import Three from './src/screens/Three';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style='auto' />
    </Provider>
  );
}
