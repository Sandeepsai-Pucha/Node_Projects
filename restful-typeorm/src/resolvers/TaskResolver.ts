import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Tasks } from "../entity/Task";
import { TaskRepository } from "../repositories/taskRepository";
import { TaskService } from "../services/taskServices";

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);

export interface CreateTaskArgs {
  input: {
    title: string
    description: string
    user_id: number
  }
}

export interface UpdateTaskArgs {
  input: {
    is_completed: boolean;
    id: number;
  }
}

export interface DeleteTaskArgs {
  id: number;
}

const TaskResolver = {
  Query: {
    getAllTasks: async(): Promise<Tasks[]> => {
      return await taskService.getAllTasks()
    },
    getTask: async (_: any, args: { id: number}): Promise<Tasks> => {
      const taskExist = await taskRepository.findOne(args.id)
      if (!taskExist) {
        const error: any = "Task With this ID Didn't Found"
        return error
      }
      const task = await taskService.getTask(args.id);
      if (!task) {
        return null
      }
      return task
    },
  },

  Mutation: {
    createTask: async(_: any, createTask: CreateTaskArgs ): Promise<Tasks | { message: string }> => {
      return await taskService.createTask(createTask)
    },

    updateTask: async(_: any, updateTask: UpdateTaskArgs ): Promise<Tasks | { message: string }> => {
      return await taskService.updateTask(updateTask)
    },

    deleteTask: async (
      _: any,
      { id }: DeleteTaskArgs
    ) => {
      const deletedTask =
        await taskService.deleteTask(id);
      return deletedTask;
    },
  }
}

export default TaskResolver;