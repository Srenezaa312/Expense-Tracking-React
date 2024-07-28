import React, {useEffect, useState} from 'react';
import {
  Button,
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';
import {CategoryRow} from '../components/CategoryRow';
import {Category} from '../models/category';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {Colors, Theme} from '../types/theme';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  addCategoryAction,
  fetchCategoriesAction,
} from '../redux/actions/categoryActions';
import {allCategoriesSelector} from '../redux/selectors';

export const CategoriesScreen = (): JSX.Element => {
  const categories: Category[] = useSelector(allCategoriesSelector);
  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors.primary);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const onSelectColor = (hex: string) => {
    setSelectedColor(hex);
  };

  const createCategory = () => {
    if (newName.length === 0) {
      return;
    }

    const category = new Category({
      id: uuid(),
      name: newName,
      color: selectedColor,
    });
    dispatch(addCategoryAction(category));
    setNewName('');
    setSelectedColor(colors.primary);
  };


  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 112 : -220}
        style={styles.keyAvoidView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.categoriesWrapper}>
            {categories.map(({id, color, name}) => (
              <CategoryRow key={id!} id={id!} color={color} name={name} />
            ))}
          </View>
        </ScrollView>
        <View style={styles.newCategoryWrapper}>
          <TouchableOpacity
            onPress={() => setShowColorPicker(!showColorPicker)}>
            <View
              style={[
                styles.categoryColor,
                {
                  backgroundColor: selectedColor,
                },
              ]}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Category name"
            inputAccessoryViewID="dismissKeyboard"
            placeholderTextColor={colors.textSecondary}
            onChange={event => setNewName(event.nativeEvent.text)}
            value={newName}
            style={styles.newCategoryInput}
          />
          <TouchableOpacity onPress={createCategory} style={styles.sendButton}>
            <FontAwesome name="plus" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        transparent
        visible={showColorPicker}
        animationType="fade"
        onRequestClose={() => setShowColorPicker(false)}>
        <View style={styles.colorPickerModal}>
          <View style={styles.colorPickerWrapper}>
            <ColorPicker
              hideSliders
              color={selectedColor}
              onColorChange={color => onSelectColor(fromHsv(color))}
              style={styles.colorPicker}
            />
            <Button onPress={() => setShowColorPicker(false)} title="Select" />
          </View>
        </View>
      </Modal>
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
    keyAvoidView: {margin: 16, flex: 1},
    scrollView: {flex: 1},
    categoriesWrapper: {
      borderRadius: 11,
      overflow: 'hidden',
    },
    categoryItemWrapper: {
      backgroundColor: colors.error,
      width: 75,
    },
    categoryButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    newCategoryWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 8,
    },
    categoryColor: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 3,
      borderColor: colors.border,
    },
    newCategoryInput: {
      color: colors.text,
      height: 40,
      borderColor: colors.border,
      borderWidth: 1,
      flex: 1,
      borderRadius: 8,
      paddingLeft: 8,
      marginLeft: 16,
    },
    colorPickerModal: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    colorPickerWrapper: {
      padding: 24,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
      overflow: 'hidden',
      borderRadius: 12,
    },
    colorPicker: {width: '100%', height: 300},
    sendButton: {padding: 12},
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
