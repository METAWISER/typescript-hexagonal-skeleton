import { StringValueObject } from "../../shared/domain/value-objects/StringValueObject";

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    //Validation rules for password:
    if (value.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }
    super(value);
  }
}
