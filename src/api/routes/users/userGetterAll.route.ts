import { Router, Request, Response } from "express";
import { UserRepository } from "../../../Users/infrastructure/UserRepository";
import userModel from "../../../shared/infrastructure/persistense/mongoose/models/user.model";
import { UserGetterAll } from "../../../Users/application/UserGetterAll";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { UserGetterAllController } from "../../controllers/users/UserGetterAll.controller";

export const register = (route: Router): void => {
  const userRepository = new UserRepository(userModel);
  const userGetterAll = new UserGetterAll(userRepository);
  const httpResponse = new HttpResponse();
  const userGetterAllController = new UserGetterAllController(
    userGetterAll,
    httpResponse,
  );

  route.get(
    "/users",
    async (req: Request, res: Response) =>
      await userGetterAllController.run(req, res),
  );
};
