import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { login } from "../store/Slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  // const [fullname, setFullname] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const handleRegister = async (data) => {
    // let registrationData = data
    // setInfo(registrationData);

    try {
      const response = await axios.post("/api/v1/users/register", data);
      console.log(response);

      // Alert the redux state aboout login and then proceed to navigate to the blog interface using navigate fform react router dom
      setInfo(response.data.data);
      // dispatch(login());
      alert("Succesfully Registered");

      navigate("/login");
    } catch (err) {
      console.log("Failed to exexute registration", err);
      setError("Sorry Registration Failed 😭");
    }
  };

  return (
    <div className="flex justify-center items-center h-[30em] bg-slate-600">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-slate-200 rounded-xl h-[20em] w-[30em] pt-4"
      >
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold">Sign Up</h1>
        </div>

        {error && (
          <div className="text-red-400 flex justify-center mb-2">{error}</div>
        )}

        <div className="flex justify-center mb-2">
          <label>Enter Full Name :: </label>
          <input
            type="text"
            className="border-2 border-black ml-4 rounded-lg"
            placeholder="Enter your Full Name"
            {...register("fullName")}
          />
        </div>

        <div className="flex justify-center mb-2">
          <label>Enter username ::</label>
          <input
            type="text"
            className="border-2 border-black ml-4 rounded-lg"
            placeholder="Enter your username"
            {...register("username")}
          />
        </div>

        <div className="flex justify-center mb-2">
          <label>Enter email ::</label>
          <input
            type="email"
            className="border-2 border-black ml-12 rounded-lg"
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>

        <div className="flex justify-center mb-2">
          <label>Set Password ::</label>
          <input
            type="password"
            className="border-2 border-black ml-8 rounded-lg"
            placeholder="Enter your password"
            {...register("password")}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-400 rounded-lg p-1 w-[10em]"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
