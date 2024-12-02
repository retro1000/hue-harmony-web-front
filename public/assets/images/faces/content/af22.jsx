import React, { useState, memo } from "react";

const ChildComponent = memo(({ count }) => {
  console.log("Child component re-rendered");
  return <p>Child Count: {count}</p>;
});

const App = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOtherState(otherState + 1)}>
        Change Other State
      </button>
      <ChildComponent count={count} />
    </div>
  );
};

export default App;
