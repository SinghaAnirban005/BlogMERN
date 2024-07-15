import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../store/Slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("/api/v1/users/login", data);
      console.log(response);

      if (!response) {
        console.log("Could Not handle login request");
      }
      console.log(data);
      dispatch(login(data));

      navigate("/");
    } catch (error) {
      setError(error);
      // throw error;
    }
  };

  // useEffect(() => {}, []);

  return (
    <div className="flex justify-center items-center h-[30em] bg-slate-600">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="h-[20em] w-[30em] rounded-lg bg-slate-200 pt-14"
      >
        <div className="flex-col items-center mb-4">
          <div className="flex justify-center">
            <h1 className=" text-2xl font-bold ">Login</h1>
          </div>
          {error && (
            <>
              <h1 className="text-center text-red-600">{error.message}</h1>
            </>
          )}
        </div>

        <div className="flex justify-center mb-2">
          <label>Enter Username : </label>
          <input
            type="text"
            className="border-1 border-black ml-4 rounded-xl"
            placeholder="Enter your Username"
            {...register("username")}
          />
        </div>

        <div className="flex justify-center mb-6">
          <label>Enter Password :</label>
          <input
            type="password"
            className="border-1 border-black ml-5 rounded-xl"
            placeholder="Enter your Password"
            {...register("password")}
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-300 rounded-lg p-1 w-[10em]"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
