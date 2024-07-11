import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Home() {
  const [loading, setLoading] = useState(true);
  const status = useSelector((state) => state.userStatus);
  const loginInfo = useSelector((state) => state.userLoginData);
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      if (status && name === "") {
        const username = await axios.get("/api/v1/users/get-user");

        setName(username.data.data.fullName);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-[30em] bg-slate-600">
      {loading && <div> Loading ... Please Wait !! </div>}
      {!status && (
        <div className="flex-col bg-slate-300 mt-4 h-[10em] w-[20em] rounded-lg">
          <h1 className="text-center mt-[3em]">
            Welcome to our blog application
          </h1>
          <h1 className="text-center">Please Login to view Posts</h1>
        </div>
      )}

      {status && <h1>{`Welcome ${name}`}</h1>}
    </div>
  );
}

export default Home;
