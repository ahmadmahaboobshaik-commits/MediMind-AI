import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/MedicineAssistant.css";

function MedicineAssistant() {

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  function handleUploadClick() {

    fileInputRef.current.click();

  }

  function handleImageSelect(event) {

    const file = event.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    navigate("/medicine-analysis", {

      state: {

        image: imageUrl,

        file

      }

    });

  }

  return (

    <div className="assistant-page">

      <div className="assistant-header">

        <h1>🩺 Medicine Assistant</h1>

        <p>

          Choose how you want to identify your medicine

        </p>

      </div>

      <div className="assistant-grid">

        {/* CAMERA */}

        <div
          className="assistant-card"
          onClick={() => navigate("/camera")}
        >

          <div className="assistant-icon">
            📸
          </div>

          <h2>Take Photo</h2>

          <p>

            Capture medicine using your phone camera.

          </p>

        </div>

        {/* UPLOAD */}

        <div
          className="assistant-card"
          onClick={handleUploadClick}
        >

          <div className="assistant-icon">
            🖼️
          </div>

          <h2>Upload Image</h2>

          <p>

            Upload a medicine image.

          </p>

        </div>

        {/* VOICE */}

        <div
          className="assistant-card"
          onClick={() => navigate("/voice-search")}
        >

          <div className="assistant-icon">
            🎤
          </div>

          <h2>Voice Search</h2>

          <p>

            Speak the medicine name.

          </p>

        </div>

        {/* TEXT */}

        <div
          className="assistant-card"
          onClick={() => navigate("/text-search")}
        >

          <div className="assistant-icon">
            ⌨️
          </div>

          <h2>Search Medicine</h2>

          <p>

            Type the medicine name.

          </p>

        </div>

      </div>

      <input

        type="file"

        accept="image/*"

        ref={fileInputRef}

        style={{ display: "none" }}

        onChange={handleImageSelect}

      />

      <button

        className="back-home"

        onClick={() => navigate("/home")}

      >

        ← Back

      </button>

    </div>

  );

}

export default MedicineAssistant;