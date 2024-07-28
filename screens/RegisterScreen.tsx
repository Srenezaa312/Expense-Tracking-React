import React, {useState} from 'react';
import {
  Alert,
  InputAccessoryView,
  Keyboard,
  Platform,
  Pressable,
  View,
} from 'react-native';
import {TextInput} from 'react-native';
import {KeyboardAvoidingView, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';
import SimpleLineIcon from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import {Button} from 'react-native';
import {NavigationProp, useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Colors, Theme} from '../types/theme';
import {auth, firestore} from '../database/config';
import {UserCredential, createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, doc, setDoc} from 'firebase/firestore';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export const RegisterScreen = ({navigation}: RouterProps): JSX.Element => {
  const [currentFocus, setCurrentFocus] = useState('');
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors as Colors);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = () => {
    if (password !== confirmPassword) {
      Alert.alert('Make sure to input the same password');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        const uid = response.user.uid;
        const usersRef = collection(firestore, 'users');
        setDoc(doc(usersRef, uid), {
          userId: uid,
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: password.toLowerCase(),
        });

        return response;
      })
      .then((user: UserCredential) => {
        navigation.navigate('Home');
      })
      .catch(error =>
        Alert.alert('Failed to register... Please try again later.'),
      );
  };

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={styles.keyboardAvoid}>
        <View style={styles.container}>
          <Text style={styles.loginText}>Create Account</Text>

          <View>
            <View
              style={[
                styles.inputWrapper,
                currentFocus === 'username' && styles.inputShadow,
              ]}>
              <Feather name="user" color={'grey'} size={24} />
              <TextInput
                value={username}
                onChangeText={text => setUsername(text)}
                onFocus={() => setCurrentFocus('username')}
                placeholder="Your name"
                keyboardType="default"
                placeholderTextColor={'grey'}
                inputAccessoryViewID="dismissKeyboard"
                style={styles.text}
              />
            </View>
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
            <View
              style={[
                styles.inputWrapper,
                currentFocus === 'cpassword' && styles.inputShadow,
              ]}>
              <SimpleLineIcon name="lock" color={'grey'} size={24} />
              <TextInput
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry={true}
                onFocus={() => setCurrentFocus('cpassword')}
                placeholder="Confirm password"
                placeholderTextColor={'grey'}
                inputAccessoryViewID="dismissKeyboard"
                style={styles.text}
              />
            </View>
          </View>
          <View style={{marginTop: 24, alignItems: 'flex-end'}}>
            <Button title="Sign up" onPress={() => register()} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.signupLine}>
        <Text style={{color: colors.text, marginRight: 4}}>
          Already have an account?
        </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={{color: colors.primary}}>Login</Text>
        </Pressable>
      </View>
      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID="dismissKeyboard">
          <View style={styles.dismissWrapper}>
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
              <MaterialIcon
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
    text: {
      width: '100%',
      fontSize: 16,
      color: colors.text,
    },
    signupLine: {
      paddingBottom: 60,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
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
  });
