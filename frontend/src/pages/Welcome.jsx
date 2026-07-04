import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

import logo from "../assets/logo.png";
import bg from "../assets/pharmacy-bg.jpg";

function Welcome() {

  const navigate = useNavigate();

  return (

    <div className="container">

      <div
        className="left-section"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <div className="right-section">

        <div className="logo-bar">
          <img src={logo} alt="logo" />
        </div>

        <div className="welcome-card">

          <img
            src={logo}
            alt="logo"
            className="center-logo"
          />

          <h1>
            MediMind <span>AI</span>
          </h1>

          <h2>
            AI-powered Medicine Intelligence
          </h2>

          <p>
            Helping pharmacies reduce medicine waste,
            optimize inventory and deliver better care
            with AI.
          </p>

          <button
            onClick={() => navigate("/setup")}
          >
            Get Started →
          </button>

          <div className="features">

            <div>
              🌿
              <p>Reduce Waste</p>
            </div>

            <div>
              🏪
              <p>Helping Pharmacies</p>
            </div>

            <div>
              ❤️
              <p>Protect Patients</p>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Welcome;