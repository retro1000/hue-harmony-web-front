import React, { useState } from "react";
import "./App.css"; // Add CSS for animations

const AnimatedComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"} Box
      </button>
      <div className={`box ${isVisible ? "show" : ""}`}></div>
    </div>
  );
};

export default AnimatedComponent;

// /* App.css */
// .box {
//   width: 100px;
//   height: 100px;
//   background-color: blue;
//   margin: 20px;
//   opacity: 0;
//   transition: opacity 0.5s ease;
// }

// .box.show {
//   opacity: 1;
// }
