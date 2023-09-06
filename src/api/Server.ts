/* eslint-disable no-console */
import express, { Application, Request, Response, Router } from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import HttpResponse from "../shared/infrastructure/response/HttpResponse";

import { registerRoutes } from "./routes";
import mongoConnect from "../shared/infrastructure/persistense/config";

class Server {
  private readonly express: Application;
  private httpServer?: http.Server;
  constructor(private readonly port: string) {
    this.express = express();
    //Database connection
    this.dbConnect();
    //Middlewares
    this.middlewares();
    //Routes
    const router = Router();
    this.express.use(router);
    registerRoutes(router);
    router.use((err: Error, req: Request, res: Response) => {
      new HttpResponse().InternalServerError(res, "Contact admin");
    });
    this.express.use((err: Error, req: Request, res: Response) => {
      new HttpResponse().InternalServerError(res, "Server error");
    });
  }

  private middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(morgan("dev"));
  }

  private async dbConnect() {
    //Database connection
    await mongoConnect();
  }

  public async start(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `\n✅ Backend App is running at http://localhost:${
            this.port
          } in ${this.express.get("env")} mode`,
        );
        console.log("✋ Press CTRL-C to stop");

        resolve();
      });
    });
  }

  public getHTTPServer(): Server["httpServer"] | undefined {
    return this.httpServer;
  }

  async close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      }
    });
  }
}

export default Server;
