import React from 'react';
import { FiMessageSquare, FiGlobe, FiImage, FiEdit3 } from 'react-icons/fi';

const features = [
  { icon: <FiMessageSquare/>, label: "AI Chat" },
  { icon: <FiGlobe/>, label: "AI Search" },
  { icon: <FiImage/>, label: "AI Image" },
  { icon: <FiEdit3/>, label: "AI Writer" }
];

export default function FeatureGrid() {
  return (
    <div className="feature-grid">
      {features.map((item, index) => (
        <div key={index} className="feature-card">
          <div className="icon-container">{item.icon}</div>
          <p className="feature-text">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
