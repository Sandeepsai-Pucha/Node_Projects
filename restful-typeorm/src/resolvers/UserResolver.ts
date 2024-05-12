import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export interface CreateUserArgs {
  input: {
    first_name: string;
    last_name: string;
    age: number;
  };
}

export interface UpdateUserArgs {
  input: {
    id: number;
    first_name: string;
    last_name: string;
    age: number;
  };
}

export interface DeleteUserArgs {
  id: number;
}

const UserResolver = {
  Query: {
    getAllUsers: async (_: any, {search}: {search?: string}): Promise<User[]> => {
      if (search) {
        return await userService.searchUsers(search);
     } else {
      return await userService.getAllUsers()
     }
    },
    
    getUser: async (_: any, args: { id: number }): Promise<User> => {
      const user = await userService.getUser(args.id);
      if (!user) {
        return null;
      }
      return user;
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      createUser: CreateUserArgs,
      __: any
    ): Promise<User> => {
      return await userService.createUser(createUser);
    },
    deleteUser: async (_: any, { id }: DeleteUserArgs) => {
      const deletedUser = await userService.deleteUser(id);
      return deletedUser;
    },
  },
};

export default UserResolver;
