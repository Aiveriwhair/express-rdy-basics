import helmet from "helmet";
import express, { Express } from "express";
import { rateLimiterConfig } from "@middlewares/config/rate-limiter";
import { morganConfig } from "@middlewares/config/morgan";
import { corsConfig } from "@middlewares/config/cors";
import { bodyParserConfig } from "@middlewares/config/body-parser";
import { appEnv } from "@utils/env-loader";
import { errorLoggingHandlerMiddleware } from "@middlewares/error-logging.middleware";
import { errorHandlerMiddleware } from "@middlewares/error-handler.middleware";
import cookieParser from "cookie-parser";
import baseRouter from "@routers/baseV1.router";

export class Server {
  private static instance: Server;
  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  public app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandlers();
  }

  public config() {
    this.app.use(rateLimiterConfig);
    this.app.use(morganConfig);
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParserConfig);
    this.app.use(helmet());
    this.app.use(corsConfig);
  }

  public errorHandlers() {
    this.app.use(errorLoggingHandlerMiddleware);
    this.app.use(errorHandlerMiddleware);
  }

  private routes() {
    this.app.use(appEnv.server.baseRouterUrl + "/v1", baseRouter);
  }
}
