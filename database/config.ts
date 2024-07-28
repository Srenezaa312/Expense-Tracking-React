import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJG4c1mt-WEYRpm2ubKE856OWr-_KXGkM',
  authDomain: 'expenseapp-fanshawe.firebaseapp.com',
  projectId: 'expenseapp-fanshawe',
  storageBucket: 'expenseapp-fanshawe.appspot.com',
  messagingSenderId: '726413986466',
  appId: '1:726413986466:web:1afee192df9a13030765fb',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
