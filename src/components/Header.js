import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const handleButtonClick = () => {
    navigate("/add");
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title} onClick={handleClick}>
        Tournamax Assignment
      </h1>
      <button style={styles.button} onClick={handleButtonClick}>
        Add Task
      </button>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1a202c",
    color: "#fff",
    maxWidth: "600px", // Match the width of Tasks and Add components
    margin: "0 auto", // Center horizontally
  },
  title: {
    margin: 0,
    fontSize: "24px",
    cursor: "pointer", // This line adds the cursor pointer effect
  },
  button: {
    backgroundColor: "white",
    color: "black",
    padding: "10px 20px",
    border: "2px solid #1a202c",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
