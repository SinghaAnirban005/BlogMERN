import React, { useState, useEffect } from "react";
import Card from "../Card/Card.jsx";
import axios from "axios";

function AllPosts() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/v1/blogs/all-posts");
      console.log(response);

      if (!response) {
        console.error("Request couldn't be sent");
      }

      setBlogs(response.data.data);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-[30em] bg-slate-600">
      {/* {blogs.map((blog) => (
        <div id={blog._id}>
          <Card title={blog.title} imgSource={blog.image} />
        </div>
      ))} */}

      <Card title={blogs.title} imgSource={blogs.image} />
    </div>
  );
}

export default AllPosts;
