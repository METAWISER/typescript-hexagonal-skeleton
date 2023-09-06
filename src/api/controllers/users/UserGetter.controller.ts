import { Request, Response } from "express";
import { UserGetter } from "../../../Users/application/UserGetter";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { IController } from "../IController";

export class UserGetterController implements IController {
  constructor(
    private userGetter: UserGetter,
    private httpResponse: HttpResponse,
  ) {}
  async run(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    try {
      const user = await this.userGetter.run({ email });
      this.httpResponse.Ok(res, user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          error: error.message,
        });

        return;
      }
    }
  }
}
