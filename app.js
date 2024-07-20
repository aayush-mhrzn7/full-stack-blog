import express from "express";
import path from "path";

import cookieParser from "cookie-parser";
const app = express();

//middlewares

app.use(express.static(path.resolve("public")));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));

import userRoutes from "./routes/user.route.js";
app.use("/user", userRoutes);
export default app;
