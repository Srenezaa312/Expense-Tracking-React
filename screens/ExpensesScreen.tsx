import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPlainRecurrence} from '../utils/recurrence';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {Recurrence} from '../types/recurrence';
import {ExpensesList} from '../components/ExpensesList';
import {getGroupedExpenses} from '../utils/expenses';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {Expense} from '../models/expense';
import {useTheme} from '@react-navigation/native';
import {Colors, Theme} from '../types/theme';
import {allExpensesSelector} from '../redux/selectors';
import {fetchExpensesAction} from '../redux/actions/expenseActions';

export const ExpensesScreen = (): JSX.Element => {
  const expenses: Expense[] = useSelector(allExpensesSelector);

  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);
  const [recurrence, setRecurrence] = useState(Recurrence.Weekly);
  const recurrenceSheetRef = useRef<BottomSheet>(null);

  const groupedExpenses = getGroupedExpenses(expenses, recurrence);
  const total = groupedExpenses.reduce((sum, group) => (sum += group.total), 0);

  const changeRecurrence = (newRecurrence: Recurrence) => {
    setRecurrence(newRecurrence);
    recurrenceSheetRef.current?.close();
  };
  useEffect(() => {
    dispatch(fetchExpensesAction());
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalLabel}>Total for:</Text>
          <TouchableOpacity
            style={styles.groupByFilter}
            onPress={() => recurrenceSheetRef.current?.expand()}>
            <Text style={styles.groupByLabel}>
              This {getPlainRecurrence(recurrence)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.amountWrapper}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.amount}>{total}</Text>
        </View>
        <ExpensesList groups={groupedExpenses} />
      </View>
      <BottomSheet
        ref={recurrenceSheetRef}
        index={-1}
        handleStyle={styles.bottomSheetHandleStyle}
        handleIndicatorStyle={styles.handle}
        enablePanDownToClose
        snapPoints={['25%', '50%']}>
        <BottomSheetFlatList
          style={{backgroundColor: colors.card}}
          data={[
            Recurrence.Daily,
            Recurrence.Weekly,
            Recurrence.Monthly,
            Recurrence.Yearly,
          ]}
          renderItem={({item}) => (
            <TouchableHighlight
              style={styles.groupByItem}
              underlayColor={colors.border}
              onPress={() => changeRecurrence(item)}>
              <Text
                style={[
                  styles.groupBy,
                  {
                    color: recurrence === item ? colors.primary : colors.text,
                  },
                ]}>
                This {getPlainRecurrence(item)}
              </Text>
            </TouchableHighlight>
          )}
        />
      </BottomSheet>
    </>
  );
};
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
      paddingHorizontal: 16,
      width: '100%',
      paddingTop: 16,
    },
    totalWrapper: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    totalLabel: {color: colors.textPrimary, fontSize: 17},
    amountWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 16,
    },
    currency: {
      color: colors.textSecondary,
      fontSize: 17,
      marginTop: 2,
    },
    amount: {
      color: colors.textPrimary,
      fontSize: 40,
      fontWeight: '600',
      marginLeft: 2,
    },
    bottomSheetHandleStyle: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    handle: {backgroundColor: '#FFFFFF55'},
    groupBy: {
      fontSize: 18,
      textTransform: 'capitalize',
    },
    groupByItem: {paddingHorizontal: 18, paddingVertical: 12},
    groupByLabel: {color: colors.primary, fontSize: 17},
    groupByFilter: {marginLeft: 16},
  });
