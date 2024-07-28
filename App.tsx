import React, {useCallback, useState} from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {ThemeContext} from './theme/context';
import useAuth, {AuthProvider} from './lib/AuthProvider';
import Navigation from './Navigation';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App(): JSX.Element {
  const [theme, setTheme] = useState('light');
  const themeData = {theme, setTheme};

  return (
    <GestureHandlerRootView style={{flex: 1}} >
      <Provider store={store}>
        <AuthProvider>
          <ThemeContext.Provider value={themeData}>
            <Navigation theme={theme} />
          </ThemeContext.Provider>
        </AuthProvider>
      </Provider>

      <Toast />
    </GestureHandlerRootView>
  );
}
