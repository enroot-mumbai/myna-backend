import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import auth from './src/microservices/auth/auth.route'
import user from './src/microservices/user/user.route'

import { cleaner } from './src/middleware/cleaner';

// Import essential functions
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
import db from './src/models';
import { users } from './src/seeders/users';
import errorMiddleware from './src/middleware/error'

// Add functions to app
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// enable body parser
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ limit: "5mb" }));
app.set("etag", false);

// remove any null or undefined keys from the request body
app.use("/", cleaner);


app.use("/auth", auth);
app.use("/user", user);
app.use(errorMiddleware);


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// heahth check route
app.get("/health-check", (req, res, next) => {
    res.status(200).json({ message: "Health check successful" });
});

// db.sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
// })

