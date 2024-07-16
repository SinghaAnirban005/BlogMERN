import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getPost,
  deleteBlog,
  updateBlog,
  getBlogDetails
} from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT);
router.route("/add-post").post(upload.single("image"), createBlog);
router.route("/all-posts").get(getAllBlogs);
router.route("/post/:id").get(getPost);
router.route("/get-post/:id").get(getBlogDetails)
router.route("/post/:id").post(deleteBlog);
router.route("/update-post/:id").post(upload.single("image"), updateBlog)

export default router;
