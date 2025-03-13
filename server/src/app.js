import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
import { currentUser, errorHandler, NotFoundError } from "@bhtickix/common";

import authRouter from "./routes/auth.route.js";
import usersRouter from "./routes/users.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_BASE_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.JWT_KEY],
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  })
);
app.use(currentUser);

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.all("*", async () => {
  throw new NotFoundError("Route not found");
});
app.use(errorHandler);

export default app;
