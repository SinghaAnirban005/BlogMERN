import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import {
  Route,
  Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AllPosts from "./components/All-Posts/AllPosts.jsx";
import Postform from "./components/PostForm/postform.jsx";
import Post from "./components/Post/Post.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="add-post" element={<Postform />} />
      <Route path="all-posts" element={<AllPosts />} />
      <Route path="post/:id" element={<Post />} />
      <Route path="update-post/:id" element={<Postform />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
