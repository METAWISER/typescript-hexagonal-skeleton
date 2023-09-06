import { User } from "../domain/User";
import { UserRepository } from "../infrastructure/UserRepository";

export class UserGetter {
  constructor(private readonly repository: UserRepository) {}
  async run({ email }: { email: string }): Promise<User | []> {
    const user = this.repository.search(email);
    return user;
  }
}
