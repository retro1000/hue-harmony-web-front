import React from "react";

const withGreeting = (WrappedComponent) => {
  return (props) => (
    <div>
      <h1>Hello, Welcome!</h1>
      <WrappedComponent {...props} />
    </div>
  );
};

const BasicComponent = () => {
  return <p>This is a basic component wrapped with an HOC.</p>;
};

export default withGreeting(BasicComponent);
