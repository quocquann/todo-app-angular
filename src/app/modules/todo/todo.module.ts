import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { HeaderComponent } from './components/header/header.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { FilterComponent } from './components/filter/filter.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TodoService } from './services/todo.service';
import { HttpService } from './services/http.service';


@NgModule({
  declarations: [
    TodoComponent,
    HeaderComponent,
    TodolistComponent,
    FilterComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [TodoService, HttpService]

})
export class TodoModule { }
