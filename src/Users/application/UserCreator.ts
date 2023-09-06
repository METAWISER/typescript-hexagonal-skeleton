import { IsActiveUser } from "../domain/IsActiveUser";
import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserId } from "../domain/UserId";
import { UserName } from "../domain/UserName";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../infrastructure/UserRepository";
import { UserCreatorRequest } from "./request/UserCreatorRequest";

export class UserCreator {
  constructor(private repository: UserRepository) {}
  async run(data: UserCreatorRequest): Promise<void> {
    const user = new User(
      new UserId(),
      new UserName(data.name),
      new UserEmail(data.email),
      new UserPassword(data.password),
      new IsActiveUser(true),
    );
    await this.repository.create(user);
  }
}
