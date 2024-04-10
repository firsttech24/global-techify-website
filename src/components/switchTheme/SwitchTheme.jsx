import React, { useEffect } from "react";
import SunSvg from "./Sun.svg";
import MoonSVG from "./Moon.svg";
import "./switchTheme.css";

export const SwitchTheme = ({ setIsDarkTheme }) => {
  const switchDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    setIsDarkTheme(true);
    localStorage.setItem("selectedTheme", "dark");
  };

  const switchLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    setIsDarkTheme(false);
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") {
    switchDarkMode();
  } else {
    switchLightMode();
  }

  const toggleTheme = e => {
    if (e.target.checked) {
      switchDarkMode();
    } else {
      switchLightMode();
    }
  };

  return (
    <div className="dark_mode">
      <input
        onChange={toggleTheme}
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        defaultChecked={selectedTheme === "dark"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <img src={SunSvg} alt="Sun" className={"sun"} />
        <img src={MoonSVG} alt="Moon" className={"moon"} />
      </label>
    </div>
  );
};
