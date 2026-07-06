import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WelcomeSection from "./components/WelcomeSection";
import FeatureGrid from "./components/FeatureGrid";
import ChatWindow from "./components/ChatWindow";
import InputArea from "./components/InputArea";
import BottomNav from "./components/BottomNav";
import "./App.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className={`app ${isLoaded ? 'fade-in' : ''}`}>
      <Header />
      <main className="main-content">
        <WelcomeSection />
        <FeatureGrid />
        <ChatWindow />
      </main>
      <InputArea />
      <BottomNav />
    </div>
  );
}
export default App;
