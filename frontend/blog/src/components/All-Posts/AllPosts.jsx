import React, { useState, useEffect } from "react";
import Card from "../Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner"
import Slider from "react-slick"

function AllPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/v1/blogs/all-posts");
        console.log(response);

        if (!response) {
          console.error("Request couldn't be sent");
        }

        setBlogs(response.data.data);
      } catch (error) {
        console.error("Failed axios request to GET blogs", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const options = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-[30em] bg-slate-600">
          <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
          />
        </div>
      )}

      {blogs.length === 0 && !loading && (
        <div className="flex items-center justify-center h-[30em] bg-slate-600">
          <h1>Create new Posts to view Here</h1>
        </div>
      )}

      {blogs.length !== 0 && !loading && (
        <div className="flex items-center justify-center h-[30em] bg-slate-600">
          {blogs.map((blog) => (

           
              <Link to={`/post/${blog._id}`}>
               
              <div id={blog._id} className="flex mx-4">
                <Card title={blog.title} imgSource={blog.image} />
              </div>
           
            </Link>
           

          ))}
        </div>
      )}
    </>
  );
}

export default AllPosts;
