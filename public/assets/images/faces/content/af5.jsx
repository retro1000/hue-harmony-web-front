import React from "react";

const Greeting = ({ name }) => {
  return <h1>Hello, {name || "Guest"}!</h1>;
};

export default Greeting;

// Usage
// <Greeting name="Akila" />
