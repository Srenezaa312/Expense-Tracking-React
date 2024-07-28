import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TabBarIcon} from '../components/TabBarIcon';
import React from 'react';
import {ExpensesScreen} from './ExpensesScreen';
import {AddExpenseScreen} from './AddExpenseScreen';
import {SettingsScreen} from './SettingsScreen';
import {StyleSheet} from 'react-native';
import {Colors} from '../types/theme';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const HomeScreen = (): JSX.Element => {
  const theme = useTheme();
  const styles = createStyles(theme.colors as Colors);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBar,
        tabBarIcon: props => {
          switch (route.name) {
            case 'Expenses':
              return <TabBarIcon {...props} type="expenses" />;
            case 'Add':
              return <TabBarIcon {...props} type="add" />;
            case 'Settings':
              return <TabBarIcon {...props} type="settings" />;
          }
        },
      })}>
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Add" component={AddExpenseScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: colors.card,
    },
  });
