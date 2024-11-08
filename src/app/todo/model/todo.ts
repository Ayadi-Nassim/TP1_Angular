import { TodoStatus } from '../todo.status';

export interface Todo {
  id: number;
  name: string;
  content: string;
  status: TodoStatus;
}
