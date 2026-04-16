import { Body, Controller, Get, Post, Param, Delete, Patch, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }else { 
      return this.tasksService.getAllTasks();
    }

    
  }

  @Delete('/:id')
  deleteTaskById(@Param('id')id:string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskById(@Param('id') id: string, @Body('status') status: TaskStatus): Task | undefined  {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Get('/:id')
  getTaskById(@Param('id')id:string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    return this.tasksService.createTask(createTaskDto);
  }
}
