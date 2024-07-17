import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { deleteOnCloudinary } from "../utils/cloudinary.js";

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

    // user.Blogs.push(blog._id);
    // await user.save()
    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog created Succesfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Failed to create blog");
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({});

    return res
      .status(200)
      .json(new ApiResponse(200, blogs, "Fetched all Blogs"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Blogs couldn't be fetched !!");
  }
});

const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blogDetails = await Blog.findById(id);

  if (!blogDetails) {
    throw new ApiError(400, ":: Might have directed to the wrong URL ::");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        blogDetails,
        "Succesfully redirected to the post !!",
      ),
    );
});

const updateBlog = asyncHandler(async (req, res) => {

 try {
  const { title , content } = req.body
  const { id } = req.params

  // performing deletion on old image uploaded 
  const blog = await Blog.findById(id)
  const imgURL = blog.image

    
  const parts = imgURL.split('/');
  const uploadIndex = parts.indexOf('upload');

  if (uploadIndex !== -1 && uploadIndex < parts.length - 1){
  
  const publicId = parts[uploadIndex + 2];
  const arr = publicId.split(".")
  const newId = arr[0]

  await deleteOnCloudinary(newId)

  }

  const imagePath = req.file?.path;
  if (!imagePath) {
    throw new ApiError(400, "Image file is required");
  }

  const uploadedImage = await uploadOnCloudinary(imagePath);

  if (!uploadedImage) {
    throw new ApiError(400, "Image file is required");
  }

  const response = await Blog.findByIdAndUpdate(
    id,
    {
      title: title,
      image: uploadedImage.url,
      content: content
    }
  )

  if(!response) {
    throw new ApiError(404, "Couldn't find the blog")
  }

  return res
  .status(200)
  .json( 
    new ApiResponse(
      200,
      response,
      "Successfully updated the blog"
    )
  )
 } catch (error) {
    console.error(error)
    throw new ApiError(500, error.message)
 }

}
);

const deleteBlog = asyncHandler(async (req, res) => {
  try {
    
    const { id } = req.params;
    const blog = await Blog.findById(id)
    const imgURL = blog.image

    
    const parts = imgURL.split('/');
    const uploadIndex = parts.indexOf('upload');
  
    if (uploadIndex !== -1 && uploadIndex < parts.length - 1){
    
    const publicId = parts[uploadIndex + 2];
    const arr = publicId.split(".")
    const newId = arr[0]
    
    console.log(newId); 

  const deletedBlog = await Blog.findByIdAndDelete(id);

  if (!deletedBlog) {
    throw new ApiError(400, "Couldn't pass id of blog !!");
  }

 if(!imgURL){
    throw new ApiError(400, "Couldn't find imgURL")
 }

 await deleteOnCloudinary(newId)

  return res
    .status(200)
    .json(
      new ApiResponse(
        200, 
        {}, 
        "Blog has been Succesfully Deleted"
      )
    );
}
  }
    catch (error) {
      throw new ApiError(500, "Failed to delete")
  }
  
})

const getBlogDetails = asyncHandler( async (req, res) => {

  const { id } = req.params

  const blog = await Blog.findById(id)
  if(!blog){
    console.log(id)
    throw new ApiError(400, "Couldn't find Blog !!")
  }


  return res
  .status(200)
  .json(new ApiResponse(
    200,
    blog,
    "Blog details have been fetched succesfully"
  ))

})


export { 
        createBlog, 
        updateBlog, 
        deleteBlog, 
        getAllBlogs, 
        getPost,
        getBlogDetails,
  };
