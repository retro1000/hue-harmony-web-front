import React from "react";

const ItemList = () => {
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <h3>{item}</h3>
          <p>Description of {item}</p>
        </React.Fragment>
      ))}
    </>
  );
};

export default ItemList;
