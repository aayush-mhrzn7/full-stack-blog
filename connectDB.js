import mongoose from "mongoose";
import ApiError from "./utils/ApiError.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    if (!connectionInstance) {
      throw new ApiError(400, "error with connection with the database");
    }
    console.log("the mongodb is connected sucessfully ");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
