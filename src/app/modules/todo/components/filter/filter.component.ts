import { Component, OnInit } from '@angular/core';
import { Filter } from '../../models/filter.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{

  counter: number = 0;
  total: number = 0;
  states: string[] = [Filter.ALL, Filter.COMPLETED, Filter.ACTIVE];
  state: string = Filter.ALL;

  constructor(private todoService: TodoService) {  }

  ngOnInit(): void {
    this.todoService.todos$.subscribe((todos) => {
      this.counter = todos.length;
    });

    this.todoService.length$.subscribe((total) => {
      this.total = total;
    });
  }

  handleStateChange(st:string) {
    this.state = st;
    this.todoService.setCurrentState(st);
    this.todoService.filterTodos();  
  }
}
