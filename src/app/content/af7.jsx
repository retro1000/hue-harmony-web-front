import React, { useState, useEffect } from "react";

const DummyFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(["Post 1", "Post 2", "Post 3"]);
      setLoading(false);
    }, 2000); // Simulate API delay
  }, []);

  return (
    <div>
      <h1>Dummy Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DummyFetch;
