import { Request, Response, NextFunction } from "express";
// import { sendEmailUsingNodemailer } from '../common/communications/sendEmailUsingNodemailer';
import { clean } from "../common/functions/clean";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  !err.code ? console.log(err) : null;
  const uri = process.env.APP_BASE_URL;
  const method = req.method;
  res.locals.error = err;
  const errCode = err.code ? err.code : 500;
  const message = err.customMessage
    ? err.customMessage
    : "Please contact the ADMIN";
  const data = err.customData ? err.customData : null;
  const subject = `Error in API ${method} ${req.path} ${errCode} ${message}`;
  const html = `
      <p>Error Message: ${message}</p>
      <p>Error Code: ${errCode}</p>
      <p>Stack: ${err.stack}</p>
      <p>URL: ${uri}${req.originalUrl}</p>
      <p>Method: ${method}</p>
      <p>Body: ${JSON.stringify(req.body, null, 2)}</p>
      <p>Query: ${JSON.stringify(req.query, null, 2)}</p>
      <p>Cookies: ${JSON.stringify(req.cookies, null, 2)}</p>
      <p>Headers: ${JSON.stringify(req.headers, null, 2)}</p>
      <p>Route: ${JSON.stringify(req.route, null, 2)}</p>
      <p>Client IP: ${
        req.headers["x-forwarded-for"] || req.connection.remoteAddress
      }</p>
      <p>User: ${res.locals.user ? res.locals.user.email : "N/A"}</p>
      <p>Date: ${new Date()}</p>
      `;

  if (process.env.SERVER_NAME === "production") {
    console.log("Email", subject);
    // sendEmailUsingNodemailer(
    //     'harshvitra@gmail.com',
    //     subject,
    //     html,
    // );
  }
  return res.status(err.code ? err.code : 500).json(
    clean({
      type: err.type || null,
      message,
      errors: err.errors ? err.errors : null,
      links: { self: `${uri}${req.originalUrl}` },
      method,
      data,
    })
  );
}

// Notes - https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/

export class BadRequestError extends Error {
  public code: number;
  public customMessage: string;

  constructor(message: string) {
    super(message);
    this.code = 400;
    this.customMessage = message;
  }
}

export class UnauthorizedError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

export class ForbiddenError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 403;
  }
}

export class NotFoundError extends Error {
  public code: number;
  public customMessage: string;

  constructor(message: string) {
    super(message);
    this.code = 404;
    this.customMessage = message;
  }
}

export class RequestTimeoutError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 408;
  }
}

export class ConflictError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 409;
  }
}

export class UnprocessableEntityError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 422;
  }
}

export class InternalServerError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 500;
  }
}

export class BadGatewayError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 502;
  }
}

export class ServiceUnavailableError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 503;
  }
}

export class GatewayTimeoutError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 504;
  }
}
