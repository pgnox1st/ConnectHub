import React from 'react';
import { FiMenu, FiSend, FiMic, FiImage, FiClock, FiSettings } from "react-icons/fi";
import { MdOutlineChatBubbleOutline, MdWorkspacePremium } from "react-icons/md";
import { BsStars } from "react-icons/bs";
// अन्य जरूरी imports यहाँ रखें...

function App() {
  return (
    <div className="app-container">
      {/* मुख्य कंटेंट यहाँ आएगा */}
      <main className="main-content">
        {/* आपका चैट इंटरफेस */}
      </main>

      {/* अपडेटेड बॉटम नेविगेशन */}
      <nav className="bottomNav">
        <button>
          <MdOutlineChatBubbleOutline />
          <br />
          Chat
        </button>

        <button>
          <FiClock />
          <br />
          History
        </button>

        <button className="centerButton">
          <BsStars />
        </button>

        <button>
          🧰
          <br />
          Tools
        </button>

        <button>
          <FiSettings />
          <br />
          Settings
        </button>
      </nav>
    </div>
  );
}

export default App;
