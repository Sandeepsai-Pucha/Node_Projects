import { User } from "../entity/User";
import { UserRepository } from "../repositories/userRepository";
import { CreateUserArgs } from "../resolvers/UserResolver";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async searchUsers(search: string) {
    return this.userRepository.searchUser(search)
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.getUser(id);
  }

  async createUser(userArgs: CreateUserArgs) {
    const user = new User();
    user.first_name = userArgs.input.first_name;
    user.last_name = userArgs.input.last_name;
    user.age = userArgs.input.age;
    user.updated_at = new Date();
    user.created_at = new Date();
    return this.userRepository.addUser(user);
  }

  async deleteUser(userId: number) {
    return this.userRepository.deleteUser(userId);
  }
}
