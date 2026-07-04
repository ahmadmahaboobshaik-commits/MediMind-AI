import { useNavigate } from "react-router-dom";
import "../styles/GetStarted.css";

function GetStarted() {

  const navigate = useNavigate();

  return (

    <div className="get-started">

      <div className="content">

        <div className="badge">
          🩺 AI Powered Healthcare Platform
        </div>

        <h1>MediMind AI</h1>

        <h2>Smart Pharmacy & Medicine Assistant</h2>

        <p>
          Helping pharmacies manage inventory and helping
          families understand medicines through Artificial Intelligence.
        </p>

        <div className="features">

          <div className="feature-card">
            🤖
            <span>AI Guidance</span>
          </div>

          <div className="feature-card">
            📷
            <span>Medicine Recognition</span>
          </div>

          <div className="feature-card">
            🔊
            <span>Voice Assistant</span>
          </div>

          <div className="feature-card">
            📦
            <span>Inventory Management</span>
          </div>

        </div>

        <button
          className="start-btn"
          onClick={() => navigate("/home")}
        >
          Get Started →
        </button>

      </div>

    </div>

  );

}

export default GetStarted;