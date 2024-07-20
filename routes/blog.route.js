import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import VerifyJWT from "../middlewares/auth.middleware.js";
import Blog from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Comment from "../models/comment.model.js";
const router = Router();
router
  .route("/new-post")
  .post(upload.single("coverImage"), async (req, res) => {
    const { title, content } = req.body;
    console.log("hi");
    if ([title, content].some((field) => field.trim() == "")) {
      throw new ApiError(400, "the fields are required to be filled");
    }
    const coverImagePath = req.file?.path;
    if (!coverImagePath) {
      throw new ApiError(400, "the cover is required to me filled");
    }
    const document = await Blog.create({
      title,
      content,
      coverImage: coverImagePath,
      createdBy: req.user?._id,
    });
    if (!document) {
      throw new ApiError(400, "failed to create a document");
    }
    res.status(200).json(new ApiResponse(200, document, "sucess"));
  });

router.route("/").get(async (req, res) => {
  try {
    const posts = await Blog.find({}).populate("createdBy");
    console.log(posts);
    const comments = await Comment.find({}).populate("createdBy");

    if (!posts) {
      throw new ApiError(400, "error in finding posts");
    }
    if (!comments) {
      throw new ApiError(400, "error in finding comments");
    }
    res.status(200).json(new ApiResponse(200, { posts, comments }, "fetched"));
  } catch (error) {
    throw new ApiError(400, "failed to find");
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Blog.findById(id).populate("createdBy");
    if (!post) {
      throw new ApiError(400, "there is no blog");
    }
    res
      .status(200)
      .json(new ApiResponse(200, post, "sucessfully fetched posts"));
  } catch (error) {
    throw new ApiError(400, "error in getting id");
  }
});
router.route("/comment/:blogId").post(async (req, res) => {
  const { blogId } = req.params;
  const { content } = req.body;
  if (!blogId) {
    throw new ApiError(400, "blogid is invalid");
  }
  const comment = await Comment.create({
    content,
    blogId: blogId,
    createdBy: req.user?._id,
  });
  if (!comment) {
    throw new ApiError(400, "comment is not created");
  }
  res
    .status(200)
    .json(new ApiResponse(200, comment, "sucess to create a comment"));
});
export default router;
