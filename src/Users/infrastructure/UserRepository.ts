import { Model } from "mongoose";
import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";
import { IUserModel } from "../../shared/infrastructure/persistense/mongoose/models/user.model";

export class UserRepository implements IUserRepository {
  constructor(readonly Model: Model<IUserModel>) {}
  async create(user: User): Promise<void> {
    //Verify if user exists
    const { email } = user.toPrimitives();
    const userExists = await this.Model.findOne({ email });
    if (userExists) {
      throw new Error("Already exists");
    }
    //Create user
    const newUser = new this.Model(user.toPrimitives());
    await newUser.save();
  }
  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async search(email: string): Promise<User | []> {
    const user = await this.Model.findOne({ email });
    if (!user) {
      return [];
    }
    return user.toObject();
  }
  searchByEmail(): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async searchAll(): Promise<User[]> {
    const users = await this.Model.find();
    return users.map((user) => User.fromPrimitives(user));
  }
}
