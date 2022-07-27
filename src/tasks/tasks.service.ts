import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindAllTasksFilterDto } from './dto/find-all-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    const savedTask = await this.tasksRepository.save(task);

    return savedTask;
  }

  async findAll(filters: FindAllTasksFilterDto) {
    const [values, count] = await this.tasksRepository.findAndCount(
      filters.getPaginationParams(),
    );

    return {
      ...filters,
      count,
      values,
    };
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    const updatedTask = this.tasksRepository.merge(task, updateTaskDto);

    return this.tasksRepository.save(updatedTask);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);

    await this.tasksRepository.remove(task);
  }
}
