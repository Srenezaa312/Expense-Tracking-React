import {createAsyncThunk} from '@reduxjs/toolkit';
import {collection, deleteDoc, doc, getDocs, setDoc} from 'firebase/firestore';
import {auth, firestore} from '../../database/config';
import {Expense} from '../../models/expense';

export const fetchExpensesAction = createAsyncThunk(
  'expenses/fetch',
  async (_, {rejectWithValue}) => {
    const userid = auth.currentUser?.uid;

    if (!userid) return rejectWithValue('You are not logged in!');

    try {
      const ref = collection(firestore, 'users', userid, 'expense-list');
      const querySnapshot = await getDocs(ref);
      let expenses: any[] = [];

      querySnapshot?.forEach(doc => {
        const data = doc.data();
        const expense = {...data, id: doc.id, date: new Date(data.date)};
        expenses.push(expense);
      });

      return {data: expenses};
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  },
);

export const addExpenseAction = createAsyncThunk(
  'expenses/add',
  async (expense: Expense, {rejectWithValue}) => {
    const userid = auth.currentUser?.uid;

    if (!userid) return rejectWithValue('You are not logged in!');

    try {
      const expenseFire = expense.toFirestoreObject();
      const id = doc(collection(firestore, 'users', userid, 'expense-list')).id;

      // save in firestore
      await setDoc(
        doc(firestore, 'users', userid, 'expense-list', id),
        expenseFire,
      );

      return {data: expense};
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteExpense = createAsyncThunk(
  'expenses/delete',
  async (expenseId: string, thunkAPI) => {
    try {
      const userid = auth.currentUser?.uid;

      if (!userid) return thunkAPI.rejectWithValue('You are not logged in!');

      await deleteDoc(
        doc(firestore, 'users', userid, 'expense-list', expenseId),
      );

      await thunkAPI.dispatch(fetchExpensesAction());
      return {data: expenseId};
    } catch (error: any) {
      console.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteAllExpenses = createAsyncThunk(
  'expenses/deleteAll',
  async (_, thunkAPI) => {
    try {
      const userid = auth.currentUser?.uid;

      if (!userid) return thunkAPI.rejectWithValue('You are not logged in!');

      const ref = collection(firestore, 'users', userid, 'expense-list');
      const querySnapshot = await getDocs(ref);

      querySnapshot?.forEach(doc => {
        deleteDoc(doc.ref);
      });

      await thunkAPI.dispatch(fetchExpensesAction());
      return {data: null};
    } catch (error: any) {
      console.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
