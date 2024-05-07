import { Injectable } from '@nestjs/common';
import { TodoDto } from './dtos/todo.dto';

@Injectable()
export class AppService {
  private todos: Array<TodoDto> = [
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d478',
      title: 'Todo 1',
      description: 'Description 1',
      done: false,
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      title: 'Todo 2',
      description: 'Description 2',
      done: true,
    },
  ];

  getTodos(filters: Partial<TodoDto>): Array<TodoDto> {
    if (!filters) return this.todos;

    return this.todos.filter((todo) => {
      return Object.entries(filters).every(([key, value]) => {
        const todoValue = todo[key];
        if (typeof todoValue === 'string') {
          return todoValue.includes(value as string);
        }

        if (typeof todoValue === 'boolean') {
          value = value === 'true';

          return todoValue === value;
        }

        return todoValue === value;
      });
    });
  }

  createTodo(todo: Omit<TodoDto, 'id'>): TodoDto {
    const createdTodo = {
      id: Math.random().toString(36).substr(2, 9),
      ...todo,
    };
    this.todos.push(createdTodo);

    return createdTodo;
  }

  deleteTodo(id: string): Array<TodoDto> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos;
  }

  updateTodo(id: string, todo: Omit<Partial<TodoDto>, 'id'>): Array<TodoDto> {
    this.todos = this.todos.map(($todo) => {
      if ($todo.id === id) {
        $todo = Object.assign($todo, todo);
      }
      return $todo;
    });
    return this.todos;
  }
}
