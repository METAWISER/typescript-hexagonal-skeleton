//User Container
import { createContainer, asClass, asValue } from "awilix";

import { UserRepository } from "./UserRepository";
import { UserGetter } from "../application/UserGetter";
import HttpResponse from "../../shared/infrastructure/response/HttpResponse";
import { UserGetterController } from "../../api/controllers/users/UserGetter.controller";
import userModel from "../../shared/infrastructure/persistense/mongoose/models/user.model";

const container = createContainer();

container.register({
  userRepository: asClass(UserRepository).singleton(),
  userGetter: asClass(UserGetter).singleton(),
  httpResponse: asClass(HttpResponse).singleton(),
  userGetterController: asClass(UserGetterController).singleton(),
  userModel: asValue(userModel),
});

export { container };
