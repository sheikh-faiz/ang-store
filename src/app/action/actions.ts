// Section 1
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Task } from '../services/models/task.model';
import { User } from '../services/models/user.model';

// Section 2
export enum UserActionTypes {
  LOAD_USER = 'LOAD USER',
  FETCH_USER = 'FETCH_USER',
}

// Section 3
export class LoadUser implements Action {
  readonly type = UserActionTypes.LOAD_USER;
  constructor(public payload: User) {}
}

export class FetchUser implements Action {
  readonly type = UserActionTypes.FETCH_USER;

  constructor() {}
}
// Section 2
export enum TaskActionTypes {
  LOAD_TASK = 'LOAD TASK',
  FETCH_TASK = 'FETCH_TASK',
}

// Section 3
export class LoadTask implements Action {
  readonly type = TaskActionTypes.LOAD_TASK;
  constructor(public payload: Task[]) {}
}

export class FetchTask implements Action {
  readonly type = TaskActionTypes.FETCH_TASK;
  constructor(public payload: string) {}
}
// Section 4
export type Actions = LoadUser | FetchUser | LoadTask | FetchTask;
