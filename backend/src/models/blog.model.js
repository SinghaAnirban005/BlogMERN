import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  Author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  title: {
    type: String,
    required: true,
    index: true,
  },

  content: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
