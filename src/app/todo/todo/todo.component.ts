import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { TodoStatus } from '../todo.status';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  styleUrls: ['./todo.component.css'],
  imports: [FormsModule, CommonModule],
})
export class TodoComponent {
  name: string = '';
  content: string = '';

  // Accès direct aux signaux dérivés
  waitingTodos = this.todoService.waitingTodos;
  inProgressTodos = this.todoService.inProgressTodos;
  doneTodos = this.todoService.doneTodos;

  constructor(public todoService: TodoService) {}

  addTodo() {
    if (this.name && this.content) {
      console.log('appel');
      this.todoService.addTodo(this.name, this.content);
      this.name = '';
      this.content = '';
    }
  }

  changeStatus(id: number, newStatus: TodoStatus) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
}
