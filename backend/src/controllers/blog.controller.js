import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import mongoose from "mongoose";

const createBlog = asyncHandler(async (req, res) => {
  console.log(req.files);
  try {
    const { title, content } = req.body;
    if (title?.trim() === "") {
      throw new ApiError(400, "Please enter title");
    }

    if (content?.trim() === "") {
      throw new ApiError(400, "Please enter content");
    }
    console.log(req.file);
    const imagePath = req.file?.path;
    console.log(imagePath);

    if (!imagePath) {
      throw new ApiError(400, "Image file is required");
    }

    const uploadedImage = await uploadOnCloudinary(imagePath);

    if (!uploadedImage) {
      throw new ApiError(400, "Image file is required");
    }

    const user = await User.findById(req.user._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiError(400, "User does not exist");
    }

    const blog = await Blog.create({
      title,
      content,
      Author: user._id,
      image: uploadedImage.url,
    });

    if (!blog) {
      throw new ApiError(400, "Failed to create Blog document");
    }

    console.log(blog.Author);

    user.Blogs.push(blog._id);
    await user.save();

    const finalBlog = await Blog.findById(blog._id).populate(
      "Author",
      "-password -refreshToken",
    );

    return res
      .status(200)
      .json(new ApiResponse(200, finalBlog, "Blog created Succesfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Failed to create blog");
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(400, "No blogs available");
  }
  const bl = await Blog.findById(user.Blogs[0]);

  return res
    .status(200)
    .json(new ApiResponse(200, bl, "Succesfully fetched all blogs"));
});

const updateBlog = asyncHandler(async (req, res) => {});

const allBlogs = asyncHandler(async (req, res) => {});

const deleteBlog = asyncHandler(async (req, res) => {});

export { createBlog, updateBlog, allBlogs, deleteBlog, getAllBlogs };
