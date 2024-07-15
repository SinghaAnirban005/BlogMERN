import React from "react";

function Footer() {
  const presentYear = new Date();

  return (
    <footer className="flex justify-center bg-slate-400 h-[10em] items-center">
      <h2>
        Copyright (C) 2023 - {`${presentYear.getFullYear()}`} by Anirban Singha
      </h2>
    </footer>
  );
}

export default Footer;
