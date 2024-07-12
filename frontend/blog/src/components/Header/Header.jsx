import React from "react";
import Logo from "../Logo/Logo.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/Slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const status = useSelector((state) => state.userStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async function () {
    const response = await axios.post("/api/v1/users/logout");

    if (response) {
      console.log("Logged Out sucesfully");
    }
    dispatch(logout());
    navigate("/");
  };

  const navItems = [
    {
      name: "Login",
      slug: "/login",
      authStatus: !status,
    },

    {
      name: "Register",
      slug: "/register",
      authStatus: !status,
    },

    // {
    //   name: "Logout",
    //   slug: "/logout",
    //   authStatus: status,
    // },

    {
      name: "Home",
      slug: "",
      authStatus: status,
    },

    {
      name: "All - Posts",
      slug: "/all-posts",
      authStatus: status,
    },

    {
      name: "Add-Post",
      slug: "/add-post",
      authStatus: status,
    },
  ];

  return (
    <div className="flex bg-slate-400 h-[8em] items-center justify-between">
      <div className="ml-8">
        <Logo />
      </div>

      <nav className="flex mx-4">
        {navItems.map((item) => (
          <div key={item.slug} className="flex mx-4">
            <Link to={item.slug}>
              <button className="hover:bg-slate-200 rounded-lg bg-slate-500">
                {item.authStatus && <div className="m-2">{item.name}</div>}
              </button>
            </Link>
          </div>
        ))}
        {status && (
          <button
            className="rounded-lg bg-red-700 w-[5em] hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  );
}

export default Header;
