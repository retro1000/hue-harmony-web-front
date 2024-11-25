import React from "react";

const DummyGrid = () => {
  const gridItems = Array.from({ length: 9 }, (_, i) => `Item ${i + 1}`);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
      }}
    >
      {gridItems.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "20px",
            border: "1px solid black",
            textAlign: "center",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default DummyGrid;
