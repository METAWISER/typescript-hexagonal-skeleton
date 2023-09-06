/* eslint-disable no-console */
import { Request, Response } from "express";
import { Bcrypt } from "../../../shared/domain/value-objects/Bcrypt";
import { UserCreator } from "../../../Users/application/UserCreator";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { IController } from "../IController";
import { UserCreatorRequest } from "../../../Users/application/request/UserCreatorRequest";

export class UserCreatorController implements IController {
  constructor(
    readonly userCreator: UserCreator,
    readonly httpResponse: HttpResponse,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const hashedPassword = (
      await Bcrypt.create(password as string)
    ).toPrimitives();
    const user: UserCreatorRequest = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      await this.userCreator.run(user);
      this.httpResponse.Created(res);
      console.log(user);
    } catch (error) {
      if (error instanceof Error) {
        this.httpResponse.InternalServerError(res, { error: error.message });
        console.log(error.message, "Error");

        return;
      }
      this.httpResponse.InternalServerError(res, {
        error: "Unknown Error",
      });
    }
  }
}
