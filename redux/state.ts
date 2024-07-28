import {User} from 'firebase/auth';
import {Category} from '../models/category';
import {Expense} from '../models/expense';

export interface ExpensesState {
  isLoading: boolean;
  expenses: Expense[];
  error: string | undefined;
}

export const initialExpensesState: ExpensesState = {
  isLoading: false,
  error: undefined,
  expenses: [],
};

export interface CategoriesState {
  isLoading: boolean;
  error: undefined,
  categories: Category[];
}

export const initialCategoriesState: CategoriesState = {
  isLoading: false,
  error: undefined,
  categories: [],
}