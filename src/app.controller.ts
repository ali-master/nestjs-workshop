import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TodoDto } from './dtos/todo.dto';

@Controller('/todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTodos(@Query() filters: Partial<TodoDto>): Array<TodoDto> {
    return this.appService.getTodos(filters);
  }

  @Put('/toggle-done/:id')
  toggleDone(@Param('id') id: string): Array<TodoDto> {
    return this.appService.updateTodo(id, {
      done: !this.appService.getTodos({ id })[0].done,
    });
  }
  @Post()
  createTodo(@Body() todo: Omit<TodoDto, 'id'>): TodoDto {
    return this.appService.createTodo(todo);
  }
  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() todo: Omit<TodoDto, 'id'>,
  ): Array<TodoDto> {
    return this.appService.updateTodo(id, todo);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): Array<TodoDto> {
    return this.appService.deleteTodo(id);
  }
}
