import React, { useState } from "react";

const DynamicStyling = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const styles = {
    padding: "10px",
    backgroundColor: isHighlighted ? "yellow" : "white",
    border: "1px solid black",
    cursor: "pointer",
  };

  return (
    <div style={styles} onClick={() => setIsHighlighted(!isHighlighted)}>
      Click to {isHighlighted ? "Remove" : "Apply"} Highlight
    </div>
  );
};

export default DynamicStyling;
