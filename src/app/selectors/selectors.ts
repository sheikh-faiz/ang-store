import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from '../reducer/reducers';

export const selectCore = createFeatureSelector<CoreState>('core');
export const selectUser = createSelector(selectCore, (state) => state.user);
export const selectTask = createSelector(selectCore, (state) => state.todo);
