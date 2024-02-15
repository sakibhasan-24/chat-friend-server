// import package
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import files
import authRoutes from "./routes/auth.routes.js";
import connectToDb from "./db/databaseConnection.js";
import { sendMessage } from "./controller/message.controller.js";
import messageRoutes from "./routes/message.routes.js";
// middleWare
dotenv.config();
const app = express();
const port = process.env.port || 5000;
app.use(cookieParser());
// app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/", userRoutes);
app.listen(port, () => {
  // call db
  connectToDb();
  console.log(`Example app listening on port ${port}!`);
});
