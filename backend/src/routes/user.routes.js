import { Router } from "express";
import {
  registerUser,
  userLogin,
  userLogout,
  refreshAccessToken,
  getCurrentUser,
  getAllBlogs,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/get-user").get(verifyJWT, getCurrentUser);
router.route("/all-posts").get(verifyJWT, getAllBlogs);

export default router;
