import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, concatMap, of } from 'rxjs';
import { Filter } from '../models/filter.model';
import { Todo } from '../models/todo.model';
import { HttpService } from './http.service';

@Injectable()
export class TodoService {

  private todos: Todo[] = [];
  private filteredTodos: Todo[] = []; 
  private todoSubject = new BehaviorSubject<Todo[]>([]);
  private lengthSubject = new BehaviorSubject<number>(0);
  private currentState: string = Filter.ALL;
  
  todos$ = this.todoSubject.asObservable();
  length$ = this.lengthSubject.asObservable();
 
  constructor(private httpService: HttpService) { }

  update(data: Todo[]) {
    this.todos = data;
    this.filterTodos();
    this.todoSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }
  
  fetchTodo() {
    this.httpService.getTodo().pipe(
      catchError((e) => of(e))
    ).subscribe((data) => {
      this.update(data);
    });
  }

  setCurrentState(state: string) {
    this.currentState = state;
  }

  filterTodos() {
    if (this.currentState === Filter.ALL) {
      this.filteredTodos = this.todos;
      this.todoSubject.next(this.filteredTodos);
    }
    else if (this.currentState === Filter.ACTIVE) {
      this.filteredTodos = this.todos.filter((td) => !td.isCompleted);
      this.todoSubject.next(this.filteredTodos);
    }
    else {
      this.filteredTodos = this.todos.filter((td) => td.isCompleted);
      this.todoSubject.next(this.filteredTodos);
    }   
  }
  
  editTodo(todo: Todo) {    
    this.httpService.editTodo(todo).pipe(
      catchError((e) => of(e)),
      concatMap((e) => {
        if (!(e instanceof HttpErrorResponse)) {
          return this.httpService.getTodo().pipe(
            catchError((e) => of(e)));
        }
        return of(e);
      })
    ).subscribe((data) => {
      if (!(data instanceof HttpErrorResponse)) {
        this.update(data);
      }
    });
  }

  deleteTodo(todo: Todo) {
    this.httpService.deleteTodo(todo).pipe(
      catchError((e) => of(e)),
      concatMap((e) => {
        if (!(e instanceof HttpErrorResponse)) {
          return this.httpService.getTodo().pipe(
            catchError((e) => of(e)));
        }
        return of(e);
      })
    ).subscribe((data) => {
      if (!(data instanceof HttpErrorResponse)) {
        this.update(data);
      }
    });
  }

  addTodo(todo: Todo) {
    this.httpService.addTodo(todo).pipe(
      catchError((e) => of(e)),
      concatMap((e) => {
        if (!(e instanceof HttpErrorResponse)) {
          return this.httpService.getTodo().pipe(
            catchError((e) => of(e)));
        }
        return of(e);
      })
    ).subscribe((data) => {
      if (!(data instanceof HttpErrorResponse)) {
        this.update(data);
      }
    });
  }

}
