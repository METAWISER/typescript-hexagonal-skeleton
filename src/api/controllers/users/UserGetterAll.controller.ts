import { Request, Response } from "express";
import { UserGetterAll } from "../../../Users/application/UserGetterAll";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { IController } from "../IController";

export class UserGetterAllController implements IController {
  constructor(
    private readonly userGetterAll: UserGetterAll,
    private readonly httpResponse: HttpResponse,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userGetterAll.run();
      this.httpResponse.Ok(res, users);
    } catch (error) {
      if (error instanceof Error) {
        this.httpResponse.BadRequest(res, error.message);

        return;
      }

      this.httpResponse.InternalServerError(res);
    }
  }
}
