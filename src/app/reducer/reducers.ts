import { Action, ActionReducerMap } from '@ngrx/store';
import * as UserActions from '../action/actions';
import { Task } from '../services/models/task.model';
import { User } from '../services/models/user.model';

function userReducer(
  state: User = {} as User,
  action: UserActions.Actions
): User {
  switch (action.type) {
    case UserActions.UserActionTypes.LOAD_USER:
      return action.payload;
    default:
      return state;
  }
}

function todoRecuder(
  state: Task[] = [] as Task[],
  action: UserActions.Actions
): Task[] {
  switch (action.type) {
    case UserActions.TaskActionTypes.LOAD_TASK:
      return [...action.payload];
    default:
      return state;
  }
}

export interface CoreState {
  user: User;
  todo: Task[];
}
/** Map of combined core reducers. */
export const reducers: ActionReducerMap<CoreState> = {
  user: userReducer,
  todo: todoRecuder,
};
