import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          margin: "50px auto",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h1>Modal</h1>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};

const App = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default App;
