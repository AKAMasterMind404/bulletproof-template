import { Service, Inject, Container } from 'typedi';
import { BaseError } from "./base-error";
import * as Sentry from "@sentry/node";


export class ErrorHandler {
    constructor(@Inject('logger') private logger) {
        this.logger = logger;
    }

    public async handleError(err: BaseError): Promise<void> {
        this.logger.error("error in method " + err.methodName);     
        // Sentry.captureException(err);
        Sentry.captureException(new Error('test exception'));
        this.logger.error(err);

    }

    public isTrustedError(error: Error) {
        return error instanceof BaseError && error.isOperational;
    }
}