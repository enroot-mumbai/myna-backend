import jwt from 'jsonwebtoken';
import { getUserByToken } from './../microservices/user/user.repository';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/error-handler';
import {NO_TOKEN, INVALID_TOKEN} from './../common/constants/messages'

import dotenv from 'dotenv';
dotenv.config();

// const { getEmployeeByUid } = require("../../repository/employeeRepository");


declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userToken: string
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers["authorization"]
      ? req.headers["authorization"]
      : req.headers["Authorization"];
    if (null == token || "null" == token) {
      throw { statusCode: 403, customMessage: "forbiddened" };
    }
    let userJwt:jwt.UserIDJwtPayload | string;
    const JWT_SECRET = process.env.JWT_SECRET || '';
    try {
      userJwt = <jwt.UserIDJwtPayload>jwt.verify(String(token).split(" ")[1], JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedError(INVALID_TOKEN);
    }

    if (null === userJwt) {
      throw new UnauthorizedError(NO_TOKEN);
    }

    if (!Object.keys(userJwt).includes("userToken")) {
      throw new UnauthorizedError(INVALID_TOKEN);
    }
    let user = await getUserByToken(Number(userJwt.userToken), null);

    if (null == user) {
      throw new UnauthorizedError(INVALID_TOKEN);
    }

    res.locals.user = user;
    res.locals.userJwt = userJwt;
    next();
  } catch (error) {
    next(error);
  }
};

// exports.verifyOrIgnoreToken = async (req:Request, res:Response, next:NextFunction) => {
//   try {
//     let token = req.headers["authorization"]
//       ? req.headers["authorization"]
//       : req.headers["Authorization"];
//     if (undefined === token || null === token || "null" === token) {
//       return next();
//     }
//     let userJwt = null;
//     try {
//       userJwt = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//     } catch (error) {
//       throw INVALID_TOKEN;
//     }

//     if (!Object.keys(userJwt).includes("userToken")) {
//       throw INVALID_TOKEN;
//     }
//     let user = await getUserByToken(userJwt.userToken);

//     if (null == user) {
//       throw INVALID_TOKEN;
//     }

//     res.locals.user = user;
//     res.locals.userJwt = userJwt;
//     next();
//   } catch (error) {
//     next(INVALID_TOKEN);
//   }
// };


// exports.verifyPtAdminToken = (roles = []) => {
//   return async (req, res, next) => {
//     try {
//       let token = req.headers["authorization"]
//         ? req.headers["authorization"]
//         : req.headers["Authorization"];
//       if (null == token) {
//         throw INVALID_TOKEN;
//       }

//       let jwtResponse = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//       let employee = await getEmployeeByUid(jwtResponse.employeeToken);

//       if ((!roles.includes("all") && roles == null) || roles.length == 0) {
//         throw { customMessage: "Must provide role to access this route" };
//       }

//       if (!roles.includes("all") && !roles.includes(employee.role)) {
//         throw { code: 403, customMessage: "Cannot access this route" };
//       }

//       if (!Object.keys(jwtResponse).includes("employeeToken")) {
//         throw INVALID_TOKEN;
//       }

//       res.locals.userJwt = employee;
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };
