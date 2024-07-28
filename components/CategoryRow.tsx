import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors, Theme} from '../types/theme';
import {Swipeable} from 'react-native-gesture-handler';
import DeleteIcon from './DeleteIcon';
import {AppDispatch} from '../redux/store';
import {useDispatch} from 'react-redux';
import {deleteCategory} from '../redux/actions/categoryActions';

export const CategoryRow = ({
  id,
  color,
  name,
}: {
  id: string;
  color: string;
  name: string;
}) => {
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Swipeable
      renderRightActions={() => (
        <DeleteIcon
          alertTitle="Remove Category"
          alertBody={`Confirm you want to delete ${name}. This action cannot be undone!`}
          onPressOk={() => dispatch(deleteCategory(id!))}
        />
      )}>
      <View style={styles.container}>
        <View style={[styles.color, {backgroundColor: color}]} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </Swipeable>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'flex-start',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    color: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: colors.border,
    },
    name: {color: colors.text, fontSize: 16, marginLeft: 8},
  });
