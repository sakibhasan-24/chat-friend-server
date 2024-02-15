// import package
import express from "express";
import dotenv from "dotenv";
// import files
import authRoutes from "./routes/auth.routes.js";
import connectToDb from "./db/databaseConnection.js";
// middleWare
dotenv.config();
const app = express();
const port = process.env.port || 5000;

// app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/auth", authRoutes);
app.listen(port, () => {
  // call db
  connectToDb();
  console.log(`Example app listening on port ${port}!`);
});
