import {createSelector} from '@reduxjs/toolkit';
import {CategoriesState, ExpensesState} from './state';
import {RootState} from './store';

const expStateSelector = (state: RootState) => state.expenses;
const catStateSelector = (state: RootState) => state.categories;

/**
 * isLoading selector
 */
export const isFetchingSelector = createSelector(
  expStateSelector,
  (state: ExpensesState) => state?.isLoading,
);

/**
 * all expenses selector
 */
export const allExpensesSelector = createSelector(
  expStateSelector,
  (state: ExpensesState) => state?.expenses,
);

/**
 * all categories selector
 */
export const allCategoriesSelector = createSelector(
  catStateSelector,
  (state: CategoriesState) => state?.categories,
);

/**
 * isLoading selector
 */
export const isCategoriesFetchingSelector = createSelector(
  catStateSelector,
  (state: CategoriesState) => state?.isLoading,
);
