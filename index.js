import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./connectDB.js";
dotenv.config({
  path: "./.env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running in port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection with mongoDB has resulted in a failure", err);
  });
