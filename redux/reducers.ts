import {createSlice, ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {Category} from './../models/category';
import {
  addCategoryAction,
  fetchCategoriesAction,
} from './actions/categoryActions';
import {
  CategoriesState,
  initialCategoriesState,
  ExpensesState,
  initialExpensesState,
} from './state';
import {Expense} from './../models/expense';
import {
  addExpenseAction,
  deleteAllExpenses,
  deleteExpense,
  fetchExpensesAction,
} from './actions/expenseActions';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: initialExpensesState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<ExpensesState>) {
    builder
      // Fetch Expense
      .addCase(fetchExpensesAction.pending, (state, {payload}) => {
        state.isLoading = true;
      })
      .addCase(fetchExpensesAction.fulfilled, (state, {payload}) => {
        const expenses = (payload as {data: Expense[]}).data as Expense[];
        return {...state, expenses, isLoading: false};
      })
      .addCase(fetchExpensesAction.rejected, (state, {payload}) => {
        state.isLoading = false;
      })

      // Add Expense
      .addCase(addExpenseAction.pending, (state, {payload}) => {
        state.isLoading = true;
      })
      .addCase(addExpenseAction.fulfilled, (state, {payload}) => {
        const expense = (payload as {data: Expense}).data as Expense;
        const expenses = [...state.expenses, expense];
        return {...state, expenses, isLoading: false};
      })
      .addCase(addExpenseAction.rejected, (state, {payload}) => {
        state.isLoading = false;
      })

      // Delete Expense
      .addCase(deleteExpense.pending, (state, {payload}) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, {payload}) => {
        const expenseid = payload.data;
        const expenses = state.expenses.filter(e => e.id !== expenseid);
        return {...state, expenses, isLoading: false};
      })
      .addCase(deleteExpense.rejected, (state, {payload}) => {
        state.isLoading = true;
      })
      .addCase(deleteAllExpenses.fulfilled, (state, {payload}) => {
        return {...state, expenses: [], isLoading: false};
      });
  },
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialCategoriesState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<CategoriesState>) {
    builder

      // Fetch categories
      .addCase(fetchCategoriesAction.pending, (state, {payload}) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoriesAction.fulfilled, (state, {payload}) => {
        const categories = (payload as {data: Category[]}).data as Category[];
        return {...state, categories, isLoading: false};
      })
      .addCase(fetchCategoriesAction.rejected, (state, {payload}) => {
        state.isLoading = false;
      })

      // Add category
      .addCase(addCategoryAction.pending, (state, {payload}) => {
        state.isLoading = true;
      })
      .addCase(addCategoryAction.fulfilled, (state, {payload}) => {
        const category = (payload as {data: Category}).data as Category;
        const categories = [...state.categories, category];
        return {...state, categories, isLoading: false};
      })
      .addCase(addCategoryAction.rejected, (state, {payload}) => {
        state.isLoading = false;
      });
  },
});

const expensesReducer = expensesSlice.reducer;
const categoriesReducer = categoriesSlice.reducer;

export {categoriesReducer, expensesReducer};
