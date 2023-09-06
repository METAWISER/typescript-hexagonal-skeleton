import { BooleanValueObject } from "../../shared/domain/value-objects/BooleanValueObject";

export class IsActiveUser extends BooleanValueObject {
  constructor(value: boolean) {
    super(value);
  }
}
