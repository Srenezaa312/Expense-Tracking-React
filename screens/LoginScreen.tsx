import React, {useState} from 'react';
import {
  Alert,
  Button,
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NavigationProp, useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicon from '@expo/vector-icons/Ionicons';
import SimpleLineIcon from '@expo/vector-icons/SimpleLineIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import {Keyboard} from 'react-native';
import {Colors, Theme} from '../types/theme';
import {UserCredential, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../database/config';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export const LoginScreen = ({navigation}: RouterProps): JSX.Element => {
  const [currentFocus, setCurrentFocus] = useState('');
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).catch(error =>
      Alert.alert('Please enter a valid email & password'),
    );
  };

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={styles.keyboardAvoid}>
        <View style={styles.moneyIconWrapper}>
          <Fontisto
            style={styles.moneyIcon}
            name="money-symbol"
            color={'grey'}
            size={75}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.loginText}>Login</Text>
          <Text style={styles.loginMsg}>Please sign in to continue</Text>

          <View style={{marginTop: 50}}>
            <View
              style={[
                styles.inputWrapper,
                currentFocus === 'email' && styles.inputShadow,
              ]}>
              <Ionicon name="mail-outline" color={'grey'} size={24} />
              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                onFocus={() => setCurrentFocus('email')}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={'grey'}
                inputAccessoryViewID="dismissKeyboard"
                style={styles.text}
              />
            </View>

            <View
              style={[
                styles.inputWrapper,
                currentFocus === 'password' && styles.inputShadow,
              ]}>
              <SimpleLineIcon name="lock" color={'grey'} size={24} />
              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                onFocus={() => setCurrentFocus('password')}
                placeholder="Password"
                placeholderTextColor={'grey'}
                inputAccessoryViewID="dismissKeyboard"
                style={styles.text}
              />
            </View>
          </View>

          <View style={{marginTop: 24, alignItems: 'flex-end'}}>
            <Button title="Login" onPress={() => login()} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.signupLine}>
        <Text style={{color: colors.text, marginRight: 4}}>
          Don't have an account?
        </Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={{color: colors.primary}}>Sign up</Text>
        </Pressable>
      </View>
      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID="dismissKeyboard">
          <View style={styles.dismissWrapper}>
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
              <MaterialIcons
                name="keyboard-hide"
                size={28}
                style={{color: colors.primary}}
              />
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </>
  );
};
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    moneyIcon: {position: 'absolute', right: 20, top: 60, lineHeight: 77},
    moneyIconWrapper: {position: 'relative', width: '100%'},
    container: {
      flex: 1,
      paddingHorizontal: 40,
      justifyContent: 'center',
    },
    keyboardAvoid: {margin: 16, flex: 1, alignItems: 'center'},
    loginText: {
      color: colors.text,
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    loginMsg: {color: 'grey', fontSize: 20, fontWeight: 'bold'},
    text: {
      width: '100%',
      fontSize: 16,
      color: colors.text,
    },
    loginContainer: {
      borderRadius: 12,
      backgroundColor: colors.card,
      width: '50%',
      padding: 12,
    },

    inputWrapper: {
      marginTop: 12,
      backgroundColor: colors.background,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 12,
      width: '100%',

      display: 'flex',
      flexDirection: 'row',
      gap: 12,
    },

    inputShadow: {
      shadowColor: '#1F51FF',
      shadowOffset: {width: 2, height: 6},
      shadowOpacity: 0.75,
      shadowRadius: 8,
    },
    dismissWrapper: {
      height: 44,
      display: 'flex',
      justifyContent: 'center',
      paddingHorizontal: 16,
      alignItems: 'flex-end',
      backgroundColor: colors.card,
      borderTopColor: colors.border,
      borderTopWidth: 1,
    },
    signupLine: {
      paddingBottom: 60,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });


