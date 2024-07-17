import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="/">
        <img
          src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"
          alt="Logo"
          className="h-[50px] w-[70px] rounded-xl cursor-pointer"
        />
      </Link>
    </>
  );
}

export default Logo;
