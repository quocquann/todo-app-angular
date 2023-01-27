import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  todoGr = new FormGroup({
    todoName: new FormControl<string>('',Validators.required),
    deadline: new FormControl<Date|null>(null, Validators.required)
  });

  get todoName() {
    return this.todoGr.get('todoName');
  }

  set todoNameValue(val: string) {
    this.todoGr.controls['todoName'].setValue(val);
  }

  get deadline() {
    return this.todoGr.get('deadline');
  }

  set deadlineValue(val: Date|null) {
    this.todoGr.controls['deadline'].setValue(val);
  }

  constructor(private todoService: TodoService) { }


  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.todoName?.value && this.deadline?.value) {
      const todo: Todo = {
        name: this.todoName?.value,
        deadline: this.deadline?.value,
        isCompleted: false
      };
      this.todoService.addTodo(todo);
      this.todoGr.reset();
    }
  }
}
