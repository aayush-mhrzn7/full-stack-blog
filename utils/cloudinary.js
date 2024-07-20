import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./ApiError.js";
cloudinary.config({
  cloud_name: "aayushmhrznn",
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log(localFilePath);
    if (!localFilePath) {
      console.log("no file");
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(response);
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
const deleteFilesFromCloudinary = async (id) => {
  try {
    const response = await cloudinary.uploader.destroy(id);
    if (!response) {
      throw new ApiError(400, "error when deleting the old document partt 1");
    }
  } catch (error) {
    throw new ApiError(400, "error when deleting the old document");
  }
};
export { uploadOnCloudinary, deleteFilesFromCloudinary };
