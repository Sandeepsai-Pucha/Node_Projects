// import { Resolver, Query, Mutation, Arg } from "type-graphql";
// // import { User } from "../src/models/User.model";
// import { User } from "../entity/User";
// import { CreateUserInput } from "../src/inputs/CreateUserInput";

// @Resolver()
// export class UserResolver {
//   @Query(() => [User])
//   async users() {
//     const users =  User.find();
//     return users;
//   }
// }
// //   @Mutation(() => User)
// //   async createUser(@Arg("data") data: CreateUserInput) {
// //     const user = await User.create(data).save();
// //     return user;
// //   }
// // }

// // @Resolver()
// // export class UserResolver {
// //   @Query(() => [User])
// //   async users() {
// //     const users = await User.find(); // Retrieve all users
// //     return users; // Return the array of users
// //   }

// //   @Mutation(() => User)
// //   async createUser(@Arg("data") data: CreateUserInput) {
// //     const user = User.create(data); // Create a new user instance
// //     await user.save(); // Save the user to the database
// //     return user; // Return the newly created user
// //   }
// // }