import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useTheme} from '@react-navigation/native';
import ADI from '@expo/vector-icons/AntDesign';
import {Colors, Theme} from '../types/theme';
import DeleteIcon from './DeleteIcon';

type Props = {
  label: string;
  detail?: React.ReactNode;
  onClick?: () => void;
  swipeToDelete?: boolean;
  onDelete?: (direction: string) => void;
  isDestructive?: boolean;
};

export const ListItem = ({
  label,
  detail,
  onClick,
  swipeToDelete,
  onDelete,
  isDestructive,
}: Props) => {
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);

  const item = useMemo(
    () => (
      <TouchableOpacity
        style={[
          styles.itemWrapper,
          {justifyContent: !!detail ? 'space-between' : 'flex-start'},
        ]}
        onPress={onClick}
        disabled={!onClick}>
        <Text
          style={[
            styles.itemText,
            {color: isDestructive ? colors.error : colors.text},
          ]}>
          {label}
        </Text>
        {detail}
      </TouchableOpacity>
    ),
    [label, detail, onClick, isDestructive, colors, styles],
  );
  if (swipeToDelete) {
    return (
      <Swipeable
        renderRightActions={() => (
          <DeleteIcon
            alertTitle={'Remove ' + label}
            alertBody={`Confirm you want to delete ${label}. This action cannot be undone!`}
            onPressOk={() => onDelete && onDelete('right')}
          />
        )}
        onSwipeableOpen={onDelete}>
        {item}
      </Swipeable>
    );
  }
  return item;
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    itemWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',

      alignItems: 'center',
      minHeight: 44,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    itemText: {
      fontSize: 16,
    },
    deleteButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
    },
    deleteText: {color: colors.text},
  });
