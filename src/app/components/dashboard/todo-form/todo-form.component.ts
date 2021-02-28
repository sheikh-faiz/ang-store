import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/selectors/selectors';
import { Task } from 'src/app/services/models/task.model';
import { User } from 'src/app/services/models/user.model';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  myTask: string;
  loading = false;
  user: User;
  constructor(
    private todoService: TodoService,
    private store: Store,
    public dialogRef: MatDialogRef<TodoFormComponent>
  ) {
    store.select(selectUser).subscribe((e) => {
      this.user = e;
    });
  }

  ngOnInit(): void {}
  saveTask(): void {
    if (this.myTask !== null) {
      const task = {
        description: this.myTask,
        status: 'open',
        user_id: this.user.id,
      };

      this.todoService.addTask(task);
      this.myTask = '';
    }
  }
}
