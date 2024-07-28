import React, {useContext} from 'react';
import {View, Alert, StyleSheet, Text} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import {ListItem} from '../components/ListItem';
import {NavigationProp, useTheme} from '@react-navigation/native';
import {Switch} from 'react-native';
import {Theme} from '../types/theme';
import {ThemeContext} from '../theme/context';
import useAuth from '../lib/AuthProvider';
import {signOut} from 'firebase/auth';
import {auth} from '../database/config';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {deleteAllExpenses} from '../redux/actions/expenseActions';
import {deleteAllCategory} from '../redux/actions/categoryActions';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export const SettingsScreen = ({navigation}: RouterProps): JSX.Element => {
  const {colors} = useTheme() as Theme;
  const {user} = useAuth();

  const {setTheme, theme} = useContext(ThemeContext);
  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            signOut(auth);
          },
        },
      ],
      {
        userInterfaceStyle: 'dark',
      },
    );
  };
  const dipatch = useDispatch<AppDispatch>();

  const onClickErase = () => {
    Alert.alert(
      'Are you sure?',
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Erase data',
          style: 'destructive',
          onPress: () => {
            dipatch(deleteAllExpenses());
            dipatch(deleteAllCategory());
          },
        },
      ],
      {
        userInterfaceStyle: 'dark',
      },
    );
  };

  return (
    <>
      <View style={{padding: 26, paddingBottom: 8}}>
        <Text style={{fontSize: 16, color: colors.text}}>{user?.email}</Text>
      </View>
      <View style={styles.container}>
        <ListItem
          label="Categories"
          detail={
            <Entypo
              name="chevron-thin-right"
              color={colors.text}
              style={{opacity: 0.3}}
              size={20}
            />
          }
          onClick={() => {
            navigation.navigate('Categories');
          }}
        />
        <ListItem
          label="Dark Appearance"
          detail={
            <Switch
              trackColor={{
                false: colors.textSecondary,
                true: colors.primary,
              }}
              onValueChange={isDark => setTheme(isDark ? 'dark' : 'light')}
              value={theme === 'dark'}
            />
          }
        />
        <ListItem
          isDestructive
          label="Erase all data"
          onClick={() => onClickErase()}
        />
        <ListItem
          isDestructive
          label="Log out"
          onClick={() => logout()}
          detail={
            <Ionicons
              name="log-out-outline"
              style={{opacity: 0.3}}
              color={colors.text}
              size={25}
            />
          }
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 11,
    overflow: 'hidden',
  },
});
