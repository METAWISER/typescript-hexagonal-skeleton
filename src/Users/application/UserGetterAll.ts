import { UserRepository } from "../infrastructure/UserRepository";
import { User } from "../domain/User";

export class UserGetterAll {
  constructor(private repository: UserRepository) {}
  async run(): Promise<User[]> {
    return this.repository.searchAll();
  }
}
