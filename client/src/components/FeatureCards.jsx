import "./FeatureCards.css";

const features = [
  {
    icon: "💬",
    title: "AI Chat",
    desc: "Smart conversations"
  },
  {
    icon: "🔍",
    title: "AI Search",
    desc: "Find answers instantly"
  },
  {
    icon: "🖼️",
    title: "AI Image",
    desc: "Generate amazing images"
  },
  {
    icon: "✍️",
    title: "AI Write",
    desc: "Write anything"
  }
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
