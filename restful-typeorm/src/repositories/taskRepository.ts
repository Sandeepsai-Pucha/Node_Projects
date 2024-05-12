import { Repository, QueryRunner } from "typeorm";
import { Tasks } from "../entity/Task";
import { AppDataSource } from "../data-source";
import { ENTITIES, RELATIONS } from "../typeorm/constants";

interface TaskStatus {
  message: string;
}

export class TaskRepository {
  private repo: Repository<Tasks>;

  constructor() {
    this.repo = AppDataSource.getRepository(Tasks);
  }

  async findAll(): Promise<Tasks[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Tasks> {
    const task = await this.repo
      .createQueryBuilder(ENTITIES.tasks)
      .leftJoinAndSelect(`${ENTITIES.tasks}.${RELATIONS.USER}`, RELATIONS.USER)
      .where(`${RELATIONS.TASKS}.user_id = :id`)
      .setParameters({ id })
      .getOne();
    return task;
  }

  async addTask(task: Tasks): Promise<TaskStatus> {
    console.log(task, "details");
    const queryRunner = AppDataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const user_id = task.user_id;
      const doesTaskExistToUser = await this.repo.findOne({
        where: { user_id, title: task.title },
      });
      if (doesTaskExistToUser) {
        await queryRunner.rollbackTransaction();
        return { message: "Already this Task has Been Assigned to this User" };
      }
      await queryRunner.manager.save(task);
      await queryRunner.commitTransaction();
      return { message: "Successfully Created a Task for User" };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { message: "Error In Creating a Task" };
    } finally {
      await queryRunner.release();
    }
  }

  async updateTask(updateTask: Tasks): Promise<TaskStatus> {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const doesTaskExist = await this.repo.findOneBy({ id: updateTask.id });
      if (!doesTaskExist) {
        queryRunner.rollbackTransaction();
        return { message: "No Task Found" };
      }
      const { is_completed, created, updated } = updateTask;
      await this.repo.update(
        { id: updateTask.id },
        { is_completed, created, updated }
      );

      await queryRunner.commitTransaction();
      return { message: "Task Status Updated Successfully" };
    } catch (error) {
      console.log(error, "error");
      try {
        await queryRunner.rollbackTransaction();
      } catch (rollbackError) {
        console.error("Rollback failed!", rollbackError);
      }
      return { message: "Failed to Update the Task" };
    } finally {
      try {
        await queryRunner.release();
      } catch (releaseError) {
        console.error("Release failed!", releaseError);
      }
    }
  }

  async delete(taskId: number): Promise<TaskStatus> {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const doesTaskExist: any = await this.repo.findOneBy({ id: taskId });
      if (!doesTaskExist) {
        return { message: "No Task found with this ID" };
      }
      await this.repo.delete(taskId);
      await queryRunner.commitTransaction();

      return { message: "Task deleted successfully" };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }
  }
}
