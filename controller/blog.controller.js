/* import Blog from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const handleNewPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if ([title, content].some((field) => field.trim() == "")) {
    throw new ApiError(400, "the fields are required to be filled");
  }
  const coverImagePath = req.file?.path;
  if (!coverImagePath) {
    throw new ApiError(400, "the cover is required to me filled");
  }
  const document = Blog.create({
    title,
    content,
    coverImage: coverImagePath,
    createdBy: req.user?._id,
  });
  if (!document) {
    throw new ApiError(400, "failed to create a document");
  }
  res.status(200, document, "the document has been created sucessfully");
});

export { handleNewPost };
 */
