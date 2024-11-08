import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoStatus } from '../todo.status';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos = signal<Todo[]>([]); // Signal pour la liste des tâches

  // Méthodes pour filtrer les tâches par statut
  get waitingTodos() {
    return this.todos().filter((todo) => todo.status === 'waiting');
  }

  get inProgressTodos() {
    return this.todos().filter((todo) => todo.status === 'in progress');
  }

  get doneTodos() {
    return this.todos().filter((todo) => todo.status === 'done');
  }

  // Ajouter une nouvelle tâche
  addTodo(name: string, content: string) {
    const newTodo: Todo = {
      id: Date.now(),
      name,
      content,
      status: 'waiting', // Assurez-vous que le statut est "waiting" par défaut
    };
    this.todos.update((todos) => [...todos, newTodo]);
    console.log('Tâche ajoutée:', this.todos());
  }

  // Changer le statut d'une tâche
  updateTodoStatus(id: number, newStatus: TodoStatus) {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  }
}
