import { Injectable } from '@nestjs/common';
import { Task } from 'src/entities/task.entity';


@Injectable()
export class TasksService {
    data = [{
        "uuid": "641f4888-ae62-4576-b6a0-72b43d175585",
        "title": "task 1"
    },
    {
        "uuid": "d2cb6105-d95b-4702-a0f5-8d605893cde3",
        "title": "task 2"
    },
    {
        "uuid": "00fb4b10-4f9a-4100-8a7a-17d3606cd19a",
        "title": "task 3"
    },
    {
        "uuid": "500c165e-75ae-466a-981e-6e2f465bcec3",
        "title": "task 4"
    },
    {
        "uuid": "db6858d6-fa16-4163-9472-4199def524b0",
        "title": "task 5"
    },
    {
        "uuid": "644822fe-8ad8-4ec5-b708-cefb046b2f43",
        "title": "task 6"
    },
    {
        "uuid": "84a49a63-6814-40fe-a8bb-c0f4824115e9",
        "title": "task 7"
    }]
    getTasks(): Array<Task> {  
        
        return this.data;
    }
}
