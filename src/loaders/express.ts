import express,  { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import { ErrorHandler } from '../api/middlewares/error-handler';
import { BaseError } from '../api/middlewares/base-error';
import Logger from './logger';
import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";

export default ({ app }: { app: express.Application }) => {

  Sentry.init({
    dsn:  "https://0c739a755090401aa36e87771597cda8@o726296.ingest.sentry.io/5782639",
    tracesSampleRate: 1.0,
    debug: true,
    integrations: [
      new RewriteFrames({
        root: global.__dirname,
      }),
    ],
  });

  const errorHandler = new ErrorHandler(Logger);

  async function errorMiddleware(err: BaseError, req: Request, res: Response, next: NextFunction) {
    if (!errorHandler.isTrustedError(err)) {
      next(err);
      return;
    }
    await errorHandler.handleError(err);
    return next(err);
  }

  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    const now = new Date()
    const ep = Math.round(now.getTime() / 1000)
    res.status(200).send(ep.toString()).end();
  });

  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.enable('trust proxy');

  app.use(cors());

  app.set("view engine", "ejs");

  app.use(require('method-override')());

  app.use(bodyParser.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  app.use(errorMiddleware);

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: res.sentry + err.message,
      },
    });
  });
};
