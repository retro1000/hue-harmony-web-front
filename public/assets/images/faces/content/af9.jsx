import React from "react";

const ChildComponent = ({ onButtonClick }) => {
  return <button onClick={onButtonClick}>Click Me</button>;
};

const ParentComponent = () => {
  const handleChildClick = () => {
    alert("Button clicked in child component!");
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent onButtonClick={handleChildClick} />
    </div>
  );
};

export default ParentComponent;
