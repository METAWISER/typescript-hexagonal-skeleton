import { StringValueObject } from "../../shared/domain/value-objects/StringValueObject";

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (!this.validateEmail(value)) {
      throw new Error(
        "El valor proporcionado no es un correo electrónico válido.",
      );
    }
  }

  private validateEmail(value: string): boolean {
    // Regex taken from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(value);
  }
}
