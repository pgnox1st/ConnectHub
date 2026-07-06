import React from "react";
import "./FeatureCards.css";
import { FiMessageSquare, FiSearch, FiImage, FiEdit3 } from "react-icons/fi";

const FeatureCards = () => {
  const items = [
    { icon: <FiMessageSquare />, title: "AI Chat" },
    { icon: <FiSearch />, title: "AI Search" },
    { icon: <FiImage />, title: "AI Image" },
    { icon: <FiEdit3 />, title: "AI Writer" },
  ];
  return (
    <div className="feature-grid">
      {items.map((item, i) => (
        <div key={i} className="feature-card">
          {item.icon}
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};
export default FeatureCards;
