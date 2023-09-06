import { User } from "./User";
import { UserId } from "./UserId";
import { UserEmail } from "./UserEmail";

// This interface is the contract that UserRepository most Implement
// Feel free to modify it as needed

export interface IUserRepository {
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(uid: UserId): Promise<void>;
  search(uid: string): Promise<User | []>;
  searchByEmail(email: UserEmail): Promise<User | null>;
  searchAll(): Promise<User[]>;
}
