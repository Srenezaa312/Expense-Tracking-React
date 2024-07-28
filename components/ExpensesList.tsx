import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {ExpensesGroup} from '../types/expenses-group';
import {ExpenseRow} from './ExpenseRow';
import {Colors, Theme} from '../types/theme';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {isFetchingSelector} from '../redux/selectors';

type Props = {
  groups: ExpensesGroup[];
};

export const ExpensesList = ({groups}: Props) => {
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);
  const loading = useSelector(isFetchingSelector);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading list!</Text>
        <Text style={styles.loadingText}>Please wait...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={groups}
      keyExtractor={item => item.day}
      renderItem={({item: {day, expenses, total}}) => (
        <View style={styles.itemWrapper}>
          <Text style={styles.itemDayText}>{day}</Text>
          <View style={styles.expenseWrapper} />
          {expenses.map(expense => (
            <ExpenseRow key={expense.id} expense={expense} />
          ))}
          <View style={styles.border} />
          <View style={styles.totalWrapper}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.total}>USD {total}</Text>
          </View>
        </View>
      )}
    />
  );
};
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    list: {height: '100%'},
    itemWrapper: {display: 'flex', flexDirection: 'column', marginBottom: 24},
    itemDayText: {
      marginBottom: 4,
      color: colors.textSecondary,
      fontSize: 17,
      fontWeight: '600',
    },
    expenseWrapper: {
      borderBottomColor: colors.border,
      borderBottomWidth: 2,
      marginBottom: 8,
    },
    border: {
      borderBottomColor: colors.border,
      borderBottomWidth: 2,
      marginBottom: 4,
    },
    totalWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: {
      fontSize: 17,
      color: colors.textSecondary,
    },
    total: {
      fontSize: 17,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 20,
      marginTop: 10,
    },
  });
