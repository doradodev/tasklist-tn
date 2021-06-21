import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { TasksService } from 'src/services/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
@Get()
  getTasks(): Array<Task> {    
    return this.taskService.getTasks();
  }
  @Put(':uuid')
  update(@Param('uuid') uuid: string) {
      console.log(`Task with uuid: ${uuid} was done`);      
    return {
        uuid,
        message: 'the task was done'    
    }
  }
}
