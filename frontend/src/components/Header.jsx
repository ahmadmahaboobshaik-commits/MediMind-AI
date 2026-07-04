import {
  Brain,
  CalendarDays,
  CircleUserRound,
} from "lucide-react";

import "../styles/Header.css";

function Header() {

  const pharmacy =
    JSON.parse(localStorage.getItem("pharmacyData"));

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (

    <header className="header">

      <div className="header-left">

        <span className="header-tag">

          🧠 AI Pharmacy Platform

        </span>

        <h1>

          Welcome Back 👋

        </h1>

        <p>

          {pharmacy?.pharmacyName ||
            "MediMind AI Pharmacy"}

        </p>

      </div>

      <div className="header-right">

        <div className="header-status">

          <Brain size={18} />

          <span>

            Gemini AI Online

          </span>

        </div>

        <div className="header-date">

          <CalendarDays size={18} />

          <span>

            {today}

          </span>

        </div>

        <div className="profile">

          <div className="profile-circle">

            <CircleUserRound size={28} />

          </div>

          <div className="profile-info">

            <h4>

              {pharmacy?.ownerName ||
                "Pharmacy Owner"}

            </h4>

            <span>

              Administrator

            </span>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Header;