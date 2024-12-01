import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css"; // Add styles for animation

const ListWithAnimation = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <TransitionGroup>
        {items.map((item, index) => (
          <CSSTransition key={index} timeout={300} classNames="fade">
            <div>
              {item} <button onClick={() => removeItem(index)}>Remove</button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ListWithAnimation;

/* App.css */
// .fade-enter {
//   opacity: 0;
// }
// .fade-enter-active {
//   opacity: 1;
//   transition: opacity 300ms;
// }
// .fade-exit {
//   opacity: 1;
// }
// .fade-exit-active {
//   opacity: 0;
//   transition: opacity 300ms;
// }
