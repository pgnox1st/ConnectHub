import React from "react";
import "./FeatureCards.css";

import {
  FiMessageSquare,
  FiSearch,
  FiImage,
  FiEdit3
} from "react-icons/fi";

const cards = [
  {
    icon: <FiMessageSquare />,
    title: "AI Chat",
    desc: "Talk with AI instantly"
  },
  {
    icon: <FiSearch />,
    title: "AI Search",
    desc: "Search anything"
  },
  {
    icon: <FiImage />,
    title: "AI Image",
    desc: "Generate images"
  },
  {
    icon: <FiEdit3 />,
    title: "AI Writer",
    desc: "Write blogs & emails"
  }
];

function FeatureCards() {
  return (
    <div className="feature-grid">
      {cards.map((card, index) => (
        <div className="feature-card" key={index}>
          <div className="feature-icon">
            {card.icon}
          </div>

          <h3>{card.title}</h3>

          <p>{card.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default FeatureCards;
