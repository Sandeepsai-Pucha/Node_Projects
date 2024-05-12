import { Tasks } from "../entity/Task";
import { TaskRepository } from "../repositories/taskRepository";
import { CreateTaskArgs, UpdateTaskArgs } from "../resolvers/TaskResolver";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks(): Promise<Tasks[]> {
    return this.taskRepository.findAll();
  }

  async getTask(id: number): Promise<Tasks> {
    return this.taskRepository.findOne(id)
  }

  async createTask(taskArgs: CreateTaskArgs) {
    const task = new Tasks();
    task.updated = new Date();
    task.created = new Date();
    task.title = taskArgs.input.title;
    task.description = taskArgs.input.description;
    task.user_id = taskArgs.input.user_id;
    return this.taskRepository.addTask(task);
  }

  async updateTask(updateTaskArgs: UpdateTaskArgs) {
    const updateTask = new Tasks()
    updateTask.is_completed = updateTaskArgs.input.is_completed
    updateTask.updated = new Date();
    updateTask.created = new Date();
    return this.taskRepository.updateTask(updateTask)

  }
  async deleteTask(taskId: number) {
    return this.taskRepository.delete(taskId)
  }
}

// import { Service } from 'typedi';
// import { Task } from '../entity/Task';
// import { CreateTaskInput, UpdateTaskInput } from '../schemas/taskSchema';
// @Service()
// export class TaskService {
//   getAll = async (): Promise<Task[]> => {
//     return await Task.find();
//   };

//   getOne = async (id: number): Promise<Task | undefined> => {
//     const task = await Task.findOne({ where: { id } });

//     if (!task) {
//       throw new Error(`The task with id: ${id} does not exist!`);
//     }
//     return task;
//   };

//   create = async (createTaskInput: CreateTaskInput): Promise<Task> => {
//     const task = Task.create(createTaskInput as Partial<Task>)
//     return await task.save()
//   };

//   update = async (
//     id: number,
//     updateTaskInput: UpdateTaskInput,
//   ): Promise<Task> => {
//     const taskFound = await Task.findOne({ where: { id } });

//     if (!taskFound) {
//       throw new Error(`The task with id: ${id} does not exist!`);
//     }

//     Object.assign(taskFound, updateTaskInput);
//     const updatedTask = await taskFound.save();

//     return updatedTask;
//   };

//   delete = async (id: number): Promise<boolean> => {
//     const taskFound = await Task.findOne({ where: { id } });

//     if (!taskFound) {
//       throw new Error(`The task with id: ${id} does not exist!`);
//     }

//     await taskFound.remove();

//     return true;
//   };
// }
