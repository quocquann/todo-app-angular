import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval, Subject, takeUntil } from 'rxjs';
import { Todo } from 'src/app/modules/todo/models/todo.model';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit,OnDestroy {

  @Input() todo !: Todo;

  @Output() toggleState: EventEmitter<Todo> = new EventEmitter();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter();

  @ViewChildren(TextFieldComponent) textField!: QueryList<TextFieldComponent>;
  
  private destroy$ = new Subject();

  isEdit: boolean = false;
  todoItemGr!: FormGroup;

  get todoControl() {
    return this.todoItemGr.get('todoControl');
  }

  set todoControlValue(val: string) {
    this.todoItemGr.controls['todoControl'].setValue(val);
  }

  get deadlineControl() {
    return this.todoItemGr.get('deadlineControl');
  }

  set deadlineControlValue(val: Date) {
    this.todoItemGr.controls['deadlineControl'].setValue(val);
  }
  
  constructor() { }

  ngOnDestroy(): void {
    this.destroy$.next('');
  }

  ngOnInit(): void {
    this.todoItemGr = new FormGroup({
      todoControl: new FormControl(this.todo.name),
      deadlineControl: new FormControl(this.todo.deadline)
    });

    this.timeCalculate();
  }

  timeCalculate() {
    if (!this.isReminder()) {
      interval(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (this.isReminder()) {
          this.destroy$.next('');
        }
      });
    }
  }

  isReminder(): boolean {
    const timeWarning = 3600000;
    return !this.todo.isCompleted && new Date(this.todo.deadline).getTime() - Date.now() <= timeWarning;
  }

  handleToggleState(todo: Todo) {
    const newTodo: Todo = {
      ...todo,
      isCompleted: !todo.isCompleted
    };
    this.toggleState.emit(newTodo);
  }

  handleDeleteTodo(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

  cancelEdit() {
    this.isEdit = false;
    this.todoControlValue = this.todo.name;
    this.deadlineControlValue = this.todo.deadline;
    this.destroy$.next('');
  }

  onEdit() {
    this.isEdit = true;
    this.textField.changes.pipe(takeUntil(this.destroy$)).subscribe((item) => {
      item.first?.input.nativeElement.focus();
    });
  }

  handleEditTodo(todo: Todo) {
    if (this.todoControl?.value.trim()) { 
      const newTodo: Todo = {
        ...todo,
        name: this.todoControl.value,
        deadline: this.deadlineControl?.value
      };
      this.editTodo.emit(newTodo);
      this.isEdit = false;
      this.destroy$.next('');
    } else {
      this.deleteTodo.emit(todo);
    }   
  }
}
