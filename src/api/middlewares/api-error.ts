import { BaseError } from './base-error';

export class APIError extends BaseError {
    constructor(message: string, methodName = '', httpCode = 500, isOperational = true) {
        super('', message, methodName, httpCode, isOperational);
    }
}