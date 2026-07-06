import React from "react";
import "./Header.css";
import { FiMenu } from "react-icons/fi";
import { MdWorkspacePremium } from "react-icons/md";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn">
          <FiMenu />
        </button>

        <div>
          <h2>ConnectHub AI ✨</h2>
          <p>Your Intelligent Companion</p>
        </div>
      </div>

      <button className="pro-btn">
        <MdWorkspacePremium />
        Pro
      </button>
    </header>
  );
}

export default Header;
