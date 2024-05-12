import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { ENTITIES, RELATIONS } from "../typeorm/constants";

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.repo.find();
  }

  async searchUser(search: string): Promise<User[]> {
    try {
      const users = await this.repo
      .createQueryBuilder("user")
      .where("user.first_name LIKE :first_name", { first_name: `${search}%` })
      .getMany()
      return users;
    } catch (err) {
      console.log("error getting user", err);
    }
  }

  async getUser(id: number): Promise<User> {
    const user = await this.repo
      .createQueryBuilder(ENTITIES.user)
      .leftJoinAndSelect(`${ENTITIES.user}.${RELATIONS.TASKS}`, RELATIONS.TASKS)
      .where(`${RELATIONS.USER}.id = :id`)
      .setParameters({ id })
      .getOne();
    return user;
  }

  async addUser(Tasks: User): Promise<User> {
    return this.repo.save(Tasks);
  }

  async deleteUser(TasksId: number) {
    const deletedTasks = this.repo.delete(TasksId);
    return deletedTasks;
  }
}
