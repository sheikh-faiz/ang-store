import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TodoService } from 'src/app/services/todo/todo.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectTask, selectUser } from 'src/app/selectors/selectors';
import { Store } from '@ngrx/store';
import { User } from 'src/app/services/models/user.model';
import { FetchTask } from 'src/app/action/actions';
import { Task } from 'src/app/services/models/task.model';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  myTask: string;
  loading = false;
  tasks: Task[];
  filteredTask: Task[];
  @ViewChild('table') table: MatTable<any>;
  user: User;
  displayedColumns: string[] = ['sno', 'description', 'status', 'action'];
  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    store.select(selectUser).subscribe((user) => {
      this.user = user;
      if (this.user.id) {
        this.store.dispatch(new FetchTask(this.user.id));
        this.getTasks();
      }
    });
  }

  ngOnInit(): void {}
  getTasks(): void {
    this.store.select(selectTask).subscribe((e) => {
      this.tasks = [...e];
      this.filteredTask = [...e];
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  updateStatus(e, id): void {
    if (e) {
      try {
        this.todoService.updateTask(id, { status: 'complete' });
        this.snackBar.open($localize`Task Completed`);
      } catch (err) {
        this.snackBar.open($localize`Something wend wrong please again`);
      }
    }
  }
  removeTodo(id): void {
    if (id) {
      try {
        this.todoService.deleteTask(id);
        this.snackBar.open($localize`Task Removed`);
      } catch (err) {
        this.snackBar.open($localize`Something wend wrong please again`);
      }
    }
  }
  drop(event: CdkDragDrop<string[]>): void {
    const prevIndex = this.filteredTask.findIndex((d) => d === event.item.data);
    moveItemInArray(this.filteredTask, prevIndex, event.currentIndex);
    this.table.renderRows();
  }
  search(e): void {
    this.filter(e.target.value);
  }
  filter(searchText): void {
    if (searchText === '') {
      this.filteredTask = this.tasks;
    } else {
      const task = this.tasks.filter((e) => {
        return (
          e.description?.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        );
      });
      this.filteredTask = task;
    }
  }
}
