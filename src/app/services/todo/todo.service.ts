import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';

const config = {
  collection_endpoint: 'todolist',
};
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  tasks: AngularFirestoreCollection<Task>;
  private taskDoc: AngularFirestoreDocument<Task>;
  constructor(private db: AngularFirestore) {}

  getTask(userId: string): Observable<any> {
    return this.db
      .collection('todolist', (ref) => ref.where('user_id', '==', userId))
      .snapshotChanges();
  }
  addTask(task: Task): void {
    this.tasks.add(task);
  }
  updateTask(id, update): void {
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);
    this.taskDoc.update(update);
  }
  deleteTask(id: string): void {
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);
    this.taskDoc.delete();
  }
}
