import React from "react";

const Button = ({ label, onClick, style }) => {
  return (
    <button onClick={onClick} style={style}>
      {label}
    </button>
  );
};

const App = () => {
  return (
    <div>
      <Button label="Click Me" onClick={() => alert("Button Clicked!")} />
      <Button
        label="Styled Button"
        onClick={() => alert("Styled Button Clicked!")}
        style={{ backgroundColor: "blue", color: "white" }}
      />
    </div>
  );
};

export default App;
