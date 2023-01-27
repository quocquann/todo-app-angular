import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/modules/todo/models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit{

  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }



  ngOnInit(): void {
    this.todoService.fetchTodo();
    this.todoService.todos$.subscribe((todos) => {
      this.todos = todos;
    });
  }

  onToggleState(todo: Todo) {  
    this.todoService.editTodo(todo);
  }

  onDeleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  onEditTodo(todo: Todo) {
    this.todoService.editTodo(todo);
  }
}
