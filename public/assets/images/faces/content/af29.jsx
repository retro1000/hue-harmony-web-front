import React from "react";

const Greeting = ({ name = "Guest" }) => {
  return <h1>Hello, {name}!</h1>;
};

const App = () => (
  <div>
    <Greeting name="John" />
    <Greeting />
  </div>
);

export default App;
