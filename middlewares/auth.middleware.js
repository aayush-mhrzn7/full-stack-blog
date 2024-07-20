import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
const VerifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies.acessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(400, "there is no token to exist here");
    }
    const userDetails = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);
    if (!userDetails) {
      throw new ApiError(400, "the token is invalid ");
    }
    const user = await User.findById(userDetails._id);
    if (!user) {
      throw new ApiError(400, "the user is not correct ");
    }
    req.user = user;
    res.status(200).json(new ApiResponse(200, "sucess"));
    next();
  } catch (error) {
    throw new ApiError(400, "invalid tooken Request");
  }
};
export default VerifyJWT;
