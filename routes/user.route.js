import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const router = Router();
const createAcessToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const acessToken = user.generateAcessToken();
    await user.save({ validateBeforeSave: false });
    console.log(acessToken);
    return acessToken;
  } catch (error) {
    throw new ApiError("error with access token generation ");
  }
};
//signup
router
  .route("/signup")
  .post(upload.single("profileImage"), async (req, res) => {
    const { fullname, email, password } = req.body;
    console.log("data:", fullname, email, password);
    if ([fullname, email, password].some((field) => field.trim() == "")) {
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

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  console.log("body", email);
  /*   if ([email, password].some((field) => field.trim() == "")) {
    throw new ApiError(400, "the data is incorrect ");
  } */

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "the user doesnt exist ");
  }
  const passwordMatch = await user.comparePasswords(password);
  if (!passwordMatch) {
    throw new ApiError(400, "the password doesnt match incorrect ");
  }

  const acessToken = await createAcessToken(user._id);
  console.log("Acess token", acessToken);
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("acessToken", acessToken, options)
    .json(new ApiResponse(200, user, " user login done sucessfully "));
});
//signin
export default router;
