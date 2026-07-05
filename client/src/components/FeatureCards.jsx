import "./FeatureCards.css";

import {
  MdOutlineChatBubbleOutline,
  MdImageSearch
} from "react-icons/md";

import {
  FiEdit3
} from "react-icons/fi";

import {
  BsStars
} from "react-icons/bs";

const features = [
  {
    icon: <MdOutlineChatBubbleOutline size={28} />,
    title: "AI Chat",
    desc: "Smart conversations",
  },
  {
    icon: <MdImageSearch size={28} />,
    title: "AI Search",
    desc: "Find anything instantly",
  },
  {
    icon: <BsStars size={28} />,
    title: "AI Image",
    desc: "Generate amazing images",
  },
  {
    icon: <FiEdit3 size={28} />,
    title: "AI Writer",
    desc: "Write anything with AI",
  },
];

export default function FeatureCards() {
  return (
    <div className="feature-grid">
      {features.map((item, index) => (
        <div className="feature-card" key={index}>
          <div className="feature-icon">
            {item.icon}
          </div>

          <h3>{item.title}</h3>

          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
            }
