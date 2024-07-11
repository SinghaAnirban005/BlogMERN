import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    console.log(accessToken);

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (fullName?.trim() === "") {
      throw new ApiError(400, "Please enter fullName");
    }
    if (username?.trim() === "") {
      throw new ApiError(400, "Please enter fullName");
    }
    if (email?.trim() === "") {
      throw new ApiError(400, "Please enter fullName");
    }
    if (password?.trim() === "") {
      throw new ApiError(400, "Please enter fullName");
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { password }],
    });

    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
      username: username.toLowerCase(),
      fullName,
      email,
      password,
    });

    if (!user) {
      throw new ApiError(400, "Unable to create User");
    }

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    console.log(createdUser);
    console.log(createdUser.refreshToken);

    if (!createdUser) {
      throw new ApiError(500, "Unable to register user");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, createdUser, "User registered succesfully !!"),
      );
  } catch (error) {
    throw new ApiError(500, error?.message || "Could not perform registration");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username.trim() === "") {
      throw new ApiError(400, "Enter either email or username");
    }

    if (password.trim() === "") {
      throw new ApiError(400, "Enter password");
    }

    const user = await User.findOne({
      $or: [{ username }],
    });

    if (!user) {
      throw new ApiError(400, "User does not exist");
    }

    const checkPassword = await user.isPasswordCorrect(password);

    if (!checkPassword) {
      throw new ApiError(400, "Invalid Password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id,
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    console.log(accessToken);
    console.log(refreshToken);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in succesfully",
        ),
      );
  } catch (error) {
    throw new ApiError(500, "Failed to Login");
  }
});

const userLogout = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,

      {
        $unset: {
          refreshToken: 1,
        },
      },

      {
        new: true,
      },
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "Logged out Succesfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to logout" + error);
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "No refresh Token");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  if (!decodedToken) {
    throw new ApiError(400, "Invalid Refresh Token");
  }

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(400, "User token not available");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(404, "Refresh Token exoired");
  }

  const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access Token refreshed Successfully",
      ),
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched Successfully"));
});

const getAllBlogs = asyncHandler(async (req, res) => {
  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      req.user?.Blogs,

      "Succesfully fetched all blogs"
    )
  )
});

export {
  registerUser,
  userLogin,
  userLogout,
  refreshAccessToken,
  getCurrentUser,
  getAllBlogs,
};
