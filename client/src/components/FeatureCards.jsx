/* ===================================
   ConnectHub AI Premium Feature Cards
=================================== */

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 22px 0;
}

.feature-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #1b2542, #111827);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  padding: 18px 14px;
  min-height: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transition: 0.35s ease;
  cursor: pointer;
}

.feature-card::before {
  content: "";
  position: absolute;
  top: -60px;
  right: -60px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.12);
}

.feature-card:hover {
  transform: translateY(-6px);
  border-color: #8b5cf6;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.25);
}

.feature-icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  margin-bottom: 14px;
}

.feature-card h3 {
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 6px;
}

.feature-card p {
  color: #9ca3af;
  font-size: 12px;
  line-height: 1.5;
}

@media (max-width: 430px) {
  .feature-grid { gap: 12px; }
  .feature-card { padding: 16px 12px; min-height: 120px; }
  .feature-icon { width: 48px; height: 48px; font-size: 20px; }
  .feature-card h3 { font-size: 15px; }
  .feature-card p { font-size: 11px; }
     }
     
