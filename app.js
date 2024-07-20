import express from "express";
import path from "path";

import cookieParser from "cookie-parser";
const app = express();

//middlewares

app.use(express.static(path.resolve("public")));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import userRoutes from "./routes/user.route.js";
import blogRoutes from "./routes/blog.route.js";
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

export default app;
