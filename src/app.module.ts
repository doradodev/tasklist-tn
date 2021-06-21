import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks/tasks.service';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
