import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Routes
import auth from "./src/microservices/auth/auth.route";
import user from "./src/microservices/user/user.route";
import periodTracking from "./src/microservices/periodTracking/periodTracking.route";
import admin from "./src/microservices/admin/admin.route";
import videoProgressTracking from "./src/microservices/videoProgressTracking/videoProgressTracking.route";

import { cleaner } from "./src/middleware/cleaner";

// Import essential functions
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
import db from "./src/models";
import { users } from "./src/seeders/users";
import errorMiddleware from "./src/middleware/error";

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
app.use("/periodTracking", periodTracking);
app.use("/admin", admin);
app.use("/videoProgressTracking", videoProgressTracking);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// heahth check route
app.get("/health-check", (req, res, next) => {
  res.status(200).json({ message: "Health check successful" });
});

if (process.env.SYNC) {
  db.sequelize.sync({ alter: true }).then(() => {
    console.log(`DB sync completed`);
    process.exit(0);
  });
} else {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
