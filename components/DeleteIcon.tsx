import {Alert, StyleSheet, View} from 'react-native';
import {Colors, Theme} from '../types/theme';
import {RectButton} from 'react-native-gesture-handler';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {useTheme} from '@react-navigation/native';

type DeleteIconProps = {
  onPressOk: () => void;
  alertTitle: string;
  alertBody: string;
};

export default function DeleteIcon({
  onPressOk,
  alertTitle,
  alertBody,
}: DeleteIconProps) {
  const handleRemovePress = () => {
    Alert.alert(alertTitle, alertBody, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: () => onPressOk(),
      },
    ]);
  };
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);

  return (
    <View style={styles.deleteItemWrapper}>
      <RectButton
        style={styles.deleteButton}
        onPress={() => handleRemovePress()}>
        <EvilIcons name="trash" size={40} color={colors.error} />
      </RectButton>
    </View>
  );
}
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    deleteItemWrapper: {
      backgroundColor: colors.background,
      width: 60,
    },
    deleteButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
