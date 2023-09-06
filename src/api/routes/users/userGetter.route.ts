import { Router, Request, Response } from "express";
import { container } from "../../../Users/infrastructure/awilix.config";

export const register = (route: Router): void => {
  route.get("/user", async (req: Request, res: Response) => {
    const userGetterController = container.resolve("userGetterController");
    await userGetterController.run(req, res);
  });
};
