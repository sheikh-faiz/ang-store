import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// from //third_party/javascript/ngrx:ngrx_effects
import { Action } from '@ngrx/store'; // from //third_party/javascript/ngrx:ngrx_store
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  FetchUser,
  LoadTask,
  LoadUser,
  TaskActionTypes,
  UserActionTypes,
} from '../action/actions';
import { Task } from '../services/models/task.model';
import { User } from '../services/models/user.model';
import { TodoService } from '../services/todo/todo.service';

export declare interface UserEffectsInterface {
  loadUsers$: Observable<Action>;
  loadTasks$: Observable<Action>;
}
@Injectable()
export class UsersEffect implements UserEffectsInterface {
  loadUsers$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActionTypes.FETCH_USER),
      switchMap(() => this.getUserInfo())
    )
  );
  loadTasks$ = createEffect(() =>
    this.actions.pipe(
      ofType(TaskActionTypes.FETCH_TASK),
      switchMap((action) => this.getTasks(action))
    )
  );
  constructor(
    private readonly actions: Actions,
    private firebaseAuth: AngularFireAuth,
    private todoService: TodoService
  ) {}
  getUserInfo(): Observable<LoadUser> {
    return this.firebaseAuth.user.pipe(
      map((e) => {
        return new LoadUser({
          displayName: e?.displayName,
          email: e?.email,
          id: e?.uid,
          photoURL: e.photoURL,
        });
      })
    );
  }

  getTasks(action): Observable<LoadTask> {
    return this.todoService.getTask(action.payload).pipe(
      map((data) => {
        const tasks = data.map((e) => {
          const d = e.payload.doc.data() as Task;
          const id = e.payload.doc.id;
          return { id, ...d };
        });
        return new LoadTask(tasks);
      })
    );
  }
}
