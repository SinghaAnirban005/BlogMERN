import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ApiError } from "../../../../../backend/src/utils/ApiError";

function Post() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/v1/blogs/${id}`);

      if (!response) {
        throw new ApiError(400, "Response fetching failed");
      }

      setBlog(response);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-[30em] bg-slate-600">
      <button className="bg-red-600">Delete</button>

      <div>
        <h1>post id: {id}</h1>
      </div>
    </div>
  );
}

export default Post;
