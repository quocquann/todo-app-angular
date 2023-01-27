import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Todo } from '../models/todo.model';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getTodo(): Observable<Todo[]>{
    return this.http.get<Todo[]>(environment.apiUrl);
  }

  editTodo(todo: Todo): Observable<Todo>{
    return this.http.put<Todo>(`${environment.apiUrl}/${todo.id}`, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo>{
    return this.http.delete<Todo>(`${environment.apiUrl}/${todo.id}`);
  }

  addTodo(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(environment.apiUrl, todo, httpOptions);
  }
}
