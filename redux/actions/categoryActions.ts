import {createAsyncThunk} from '@reduxjs/toolkit';
import {collection, deleteDoc, doc, getDocs, setDoc} from 'firebase/firestore';
import {auth, firestore} from '../../database/config';
import {Category} from '../../models/category';

export const fetchCategoriesAction = createAsyncThunk(
  'categories/fetch',
  async (_, {rejectWithValue}) => {
    const userid = auth.currentUser?.uid;

    if (!userid) return rejectWithValue('You are not logged in!');

    try {
      const ref = collection(firestore, 'users', userid, 'category-list');
      const querySnapshot = await getDocs(ref);
      let categories: any[] = [];

      querySnapshot?.forEach(doc => {
        const data = doc.data();
        const category = {...data, id: doc.id};
        categories.push(category);
      });

      return {data: categories};
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  },
);

export const addCategoryAction = createAsyncThunk(
  'categories/add',
  async (category: Category, {rejectWithValue}) => {
    const userid = auth.currentUser?.uid;

    if (!userid) return rejectWithValue('You are not logged in!');

    try {
      const id = doc(
        collection(firestore, 'users', userid, 'category-list'),
      ).id;

      // save in firestore
      await setDoc(
        doc(firestore, 'users', userid, 'category-list', id),
        category.toFirestoreObject(),
      );

      return {data: category};
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (categoryId: string, thunkAPI) => {
    const userid = auth.currentUser?.uid;

    if (!userid) return thunkAPI.rejectWithValue('You are not logged in!');

    try {
      await deleteDoc(
        doc(firestore, 'users', userid, 'category-list', categoryId),
      );
      await thunkAPI.dispatch(fetchCategoriesAction());
      return {data: null};
    } catch (error: any) {
      console.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const deleteAllCategory = createAsyncThunk(
  'categories/deleteAll',
  async (_, thunkAPI) => {
    try {
      const userid = auth.currentUser?.uid;

      if (!userid) return thunkAPI.rejectWithValue('You are not logged in!');

      const ref = collection(firestore, 'users', userid, 'category-list');
      const querySnapshot = await getDocs(ref);

      querySnapshot?.forEach(doc => {
        deleteDoc(doc.ref);
      });

      await thunkAPI.dispatch(fetchCategoriesAction());
      return {data: null};
    } catch (error: any) {
      console.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
