import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ApiError } from "../../../../../backend/src/utils/ApiError";

function Post() {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`/api/v1/blogs/post/${id}`);

        if (!response) {
          throw new ApiError(400, "Response fetching failed");
        }

        setBlog(response.data.data);
      })();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeletion = async function () {
    console.log(id);
    try {
      const res = await axios.post(`/api/v1/blogs/post/${id}`);
      console.log(res);
      if (!res) {
        console.log("Couldn't hit delete API endpoint");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete blog");
    } finally {
      setLoading(false);
      navigate("/all-posts");
    }
  };

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-[30em] bg-slate-600">
          <h1>Loading ....</h1>
        </div>
      )}

      {!loading && (
        <div className="flex items-center justify-between px-12 h-[30em] bg-slate-600">
          <div className="flex">
            <img
              src={blog.image}
              className="rounded-xl h-[20em] w-[20em]"
              alt="PostIMG"
            />
          </div>

          <div className="flex-col bg-slate-400 h-[20em] w-[45em] rounded-xl">
            <div className="flex justify-center mt-[2em]">
              <h1 className="font-bold text-xl">{blog.title}</h1>
            </div>

            <div className="flex-col justify-center mt-[2em]">
              <div className="flex justify-center h-[10em]">
                <p>{blog.content}</p>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-red-600 w-[5em] rounded-lg"
                  onClick={handleDeletion}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
