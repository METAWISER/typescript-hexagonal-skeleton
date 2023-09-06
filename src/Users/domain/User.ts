import { IsActiveUser } from "./IsActiveUser";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";
import { UserPlainData } from "./UserPlainData";

// Basic domain model for User entity feel free to modify it as needed

export class User {
  constructor(
    readonly uid: UserId,
    readonly name?: UserName,
    readonly email?: UserEmail,
    readonly password?: UserPassword,
    readonly isActive?: IsActiveUser,
  ) {}

  static fromPrimitives(plainData: UserPlainData): User {
    return new User(
      new UserId(plainData.uid),
      plainData.name ? new UserName(plainData.name) : undefined,
      plainData.email ? new UserEmail(plainData.email) : undefined,
      plainData.password ? new UserPassword(plainData.password) : undefined,
      plainData.isActive ? new IsActiveUser(plainData.isActive) : undefined,
    );
  }

  toPrimitives(): UserPlainData {
    return {
      uid: this.uid.value,
      name: this.name?.value,
      email: this.email?.value,
      password: this.password?.value,
      isActive: this.isActive?.value,
    };
  }
}
