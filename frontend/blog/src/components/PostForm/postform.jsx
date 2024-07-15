import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Postform() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const formData = new FormData();
  const navigate = useNavigate();

  const handleForm = async (data) => {
    console.log(data);
    formData.append("title", data.title);
    formData.append("image", data.image[0]);
    formData.append("content", data.content);

    try {
      const response = await axios.post("/api/v1/blogs/add-post", formData);
      if (!response) {
        setError("Could not resolve input");
        throw new Error("Failed to resolve input");
      }

      console.log(response);
    } catch (error) {
      setError(error.message);
      throw new Error("Could not create blog");
    } finally {
      navigate("/all-posts");
    }
  };

  return (
    <div className="flex items-center justify-center h-[30em] bg-slate-600">
      <form
        className="flex justify-center h-[20em] w-[50em] rounded-xl bg-slate-300"
        onSubmit={handleSubmit(handleForm)}
      >
        <div>
          <div className="flex-col mb-4 mt-8">
            <label className="flex justify-center font-bold">Title</label>
            <div className="flex justify-center">
              <input
                type="text"
                className="border-2 border-black ml-4 rounded-lg"
                placeholder="Enter title for your blog"
                {...register("title", {
                  required: true,
                })}
              />
            </div>
          </div>
          {error && (
            <div className="flex justify-center text-red-600 ">{`${error}`}</div>
          )}

          <div className="flex-col mb-8">
            <label className="flex justify-center font-bold">
              Select avatar
            </label>
            <div className="flex justify-center">
              <input
                type="file"
                name="image"
                {...register("image", {
                  required: true,
                })}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="w-[8em] h-[3em] bg-blue-600 hover:bg-blue-500 rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex-col mb-4 ">
            <label className="flex justify-center font-bold">Content</label>
            <div className="flex justify-center text-wrap">
              <input
                className="border-2 bg-slate-200 text-wrap border-black ml-4  h-[12em] w-[20em] rounded-lg max-h-[12em] max-w-[20em] p-2 overflow-auto whitespace-pre-wrap"
                placeholder="Enter Content"
                {...register("content", {
                  required: true,
                })}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Postform;
