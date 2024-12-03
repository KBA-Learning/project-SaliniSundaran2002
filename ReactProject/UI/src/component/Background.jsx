import React from "react";
import DarkWallpaper from "../assets/images/DarkWallpaper.png"

const Background = () => {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url(${DarkWallpaper})`,
        }}
      ></div>
    );
  };
  
  export default Background;
  