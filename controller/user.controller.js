/* import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
const createAcessToken = async (userid) => {
  try {
    const user = User.findById(userid);
    const acessToken = user.generateAcessToken();
    return acessToken;
  } catch (error) {
    throw new ApiError("error with access token generation ");
  }
};
const handleSignup = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log("data:", fullname, email, password);
  if ([fullname, email, password].some((field) => field.trim() !== "")) {
    throw new ApiError(400, "all the fields are required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "user with this email exists try another email ");
  }
  console.log(req.file);
  const profile = req.file?.path;

  console.log("profile", profile);
  const user = await User.create({
    fullname,
    email,
    password,
    profileImage: profile,
  });
  const updatedUser = await User.findById(user._id).select("-password");
  console.log(user);
  console.log(updatedUser);
  if (!user) {
    throw new ApiError(400, "error creating user   ");
  }
  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "sucesfully created a user"));
});
const handleLogin = asyncHandler(async);

export { handleSignup, handleLogin };
 */
