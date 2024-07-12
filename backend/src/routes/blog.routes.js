import { Router } from "express";
import { createBlog, getAllBlogs } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT);
router.route("/add-post").post(upload.single("image"), createBlog);
router.route("/all-posts").get(getAllBlogs);

export default router;
