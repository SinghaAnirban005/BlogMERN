import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getPost,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT);
router.route("/add-post").post(upload.single("image"), createBlog);
router.route("/all-posts").get(getAllBlogs);
router.route("/post/:id").get(getPost);

router.route("/post/:id").post(deleteBlog);
export default router;
