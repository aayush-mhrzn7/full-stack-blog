import { Router } from "express";
import ApiError from "../utils/ApiError";

const router = Router();
router.route("/:blogId").post(async (req, res) => {
  const { blogId } = req.params;
  if (!blogId) {
    throw new ApiError(400, "blogid is invalid");
  }
});
export default router;
