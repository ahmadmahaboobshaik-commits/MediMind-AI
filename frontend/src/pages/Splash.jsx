import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Splash.css";

function Splash() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate("/home");
    }, 2500);

    return () => clearTimeout(timer);

  }, [navigate]);

  return (

    <div className="splash">

      <div className="logo-circle">
        🩺
      </div>

      <h1>MediMind AI</h1>

      <h3>Smart Pharmacy & Medicine Assistant</h3>

      <div className="loader">

        <span></span>
        <span></span>
        <span></span>

      </div>

    </div>

  );

}

export default Splash;