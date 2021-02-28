import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { TodoComponent } from './todo/todo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardRoutingModule } from './dashboard.routing';
import { MatTableModule } from '@angular/material/table';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [LayoutComponent, TodoComponent, TodoFormComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    DragDropModule,
    MatGridListModule,
    MatTableModule,
    DashboardRoutingModule,
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    MatTableModule,
    MatCheckboxModule,
    MatIconModule,

    FormsModule,
    MatGridListModule,
  ],
})
export class DashboardModule {}
