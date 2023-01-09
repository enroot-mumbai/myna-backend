import {clean} from './../common/functions/clean'
// const { sendEmailUsingNodemailer } = require("../functions/emailer");
import {logger} from './../common/functions/logger'

import { NextFunction, Request, Response } from 'express';

const errorMiddleWare = (err:any, req:Request, res:Response, next:NextFunction) => {
  !err.code ? console.log(err) : null;
  let uri = process.env.APP_BASE_URL;
  let method = req.method;
  res.locals.error = err;
  let message = err.customMessage ? err.customMessage : "Please contact the ADMIN";
  let data = err.customData ? err.customData : null;
 
  return res.status(err.code ? err.code : 500).json(
    clean({
      type: err.type || null,
      message: message,
      errors: err.errors ? err.errors : null,
      links: { self: `${uri}${req.originalUrl}` },
      method,
      data,
    })
  );
};

export default errorMiddleWare;

const sendErrorEmail = async (err:any, method:string, req:Request, message:string, res: Response, uri:string) => {
  let errCode = err.code ? err.code : 500;
  let subject = `Error in API ${method} ${req.path} ${errCode} ${message}`;
  let html = `
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
  <p>Client IP: ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}</p>
  <p>User: ${res.locals.user ? res.locals.user.email : "N/A"}</p>
  <p>Date: ${new Date()}</p>
  `;

  if (process.env.SERVER_NAME === "production") {
    // sendEmailUsingNodemailer(
    //   "harsh.vitra@sarva.com,sarvesh.warge@sarva.com,kewal.gangar@sarva.com,ankit.gupta@sarva.com",
    //   subject,
    //   html
    // );
  }
}
