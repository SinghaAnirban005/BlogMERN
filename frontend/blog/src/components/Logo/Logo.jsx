import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1hRzUBnp6zUGje4oOAbyN23nXJdcQhL1wUA&s"
          alt="Logo"
          className="h-[40px] w-[40px] rounded-xl cursor-pointer"
        />
      </Link>
    </>
  );
}

export default Logo;
