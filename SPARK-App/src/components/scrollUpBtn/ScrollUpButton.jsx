import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "./ScrollUpButton.css";

const ScrollUpButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button className="scroll-up-button" onClick={scrollToTop}>
      <FaArrowCircleUp />
    </button>
  );
};

export default ScrollUpButton;
