import React from "react";

const DummyDataList = () => {
  const dummyData = ["Apple", "Banana", "Cherry"];

  return (
    <ul>
      {dummyData.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default DummyDataList;
