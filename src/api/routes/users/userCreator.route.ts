import { Router, Request, Response } from "express";
import { body, checkExact } from "express-validator";
import { validateReqSchema } from "..";

import userModel from "../../../shared/infrastructure/persistense/mongoose/models/user.model";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { UserCreator } from "../../../Users/application/UserCreator";
import { UserRepository } from "../../../Users/infrastructure/UserRepository";
import { UserCreatorController } from "../../../api/controllers/users/UserCreator.controller";

export const register = (router: Router): void => {
  // field validation here
  const reqValues = [
    body("name").exists().isString(),
    body("email").isEmail().isString(),
    body("password").exists().isString(),
  ];

  const userRepository = new UserRepository(userModel);
  const userCreator = new UserCreator(userRepository);
  const httpResponse = new HttpResponse();
  const userController = new UserCreatorController(userCreator, httpResponse);

  router.post(
    "/users/create",
    checkExact(reqValues),
    validateReqSchema,
    async (req: Request, res: Response) => await userController.run(req, res),
  );
};
