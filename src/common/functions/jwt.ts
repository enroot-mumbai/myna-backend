import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET || '';

export const jwtSign = (token:any ) => {

  if (Object.keys(token).includes("dataValues")) {
    token = token.dataValues;
  }

  if (Object.keys(token).includes("employeeToken")) {
    token = {
      employeeToken: token.employeeToken,
    };
  }

  if (Object.keys(token).includes("userToken")) {
    token = {
      userToken: token.userToken,
    };
  }

  return `Bearer ${jwt.sign(JSON.parse(JSON.stringify(token)), jwtSecretKey, {
    expiresIn: "90d",
  })}`;
};

export const jwtVerify = (req: { headers: { [x: string]: any; }; }) => {
  try {
    let token = req.headers["authorization"]
      ? req.headers["authorization"]
      : req.headers["Authorization"];
    return jwt.verify(token.split(" ")[1], jwtSecretKey);
  } catch (error) {
    throw {
      customMessage: error,
      statusCode: 401,
    };
  }
};
