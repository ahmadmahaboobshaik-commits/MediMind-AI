import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { analyzeMedicineImage } from "../services/api";
import { useMedicines } from "../context/MedicineContext";

import "../styles/MedicineAnalysis.css";

function MedicineAnalysis() {

  const navigate = useNavigate();

  const location = useLocation();

  const image = location.state?.image;

  const file = location.state?.file;

  const { setCurrentMedicine } = useMedicines();

  const [loading, setLoading] = useState(false);

  const [loadingText, setLoadingText] =
    useState("Uploading Image...");

  const [medicine, setMedicine] = useState(null);

  const [error, setError] = useState("");

  const [speaking, setSpeaking] =
    useState(false);

  async function handleAnalyze() {

    if (!file) return;

    try {

      setLoading(true);

      setError("");

      setLoadingText(
        "📤 Uploading Image..."
      );

      setTimeout(() => {

        setLoadingText(
          "🧠 AI is reading medicine..."
        );

      }, 1200);

      setTimeout(() => {

        setLoadingText(
          "💊 Identifying medicine..."
        );

      }, 2500);

      setTimeout(() => {

        setLoadingText(
          "📋 Preparing report..."
        );

      }, 4000);

      const result =
        await analyzeMedicineImage(file);

      setMedicine(result);

      setCurrentMedicine(result);

    }

    catch (err) {

      console.error(err);

      setError(
        "Unable to analyze medicine. Please upload a clearer image."
      );

    }

    finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    if (file) {

      handleAnalyze();

    }

  }, []);

  // =============================
  // READ ALOUD
  // =============================

  function readMedicine() {

    if (!medicine) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(

`
Medicine Name.

${medicine.name}

Confidence.

${medicine.confidence}

Uses.

${medicine.uses}

Dosage.

${medicine.dosage}

Warnings.

${medicine.warnings}

Side Effects.

${medicine.sideEffects}

Storage.

${medicine.storage}

Thank you for using MediMind AI.
`

    );

    speech.rate = 0.95;

    speech.pitch = 1;

    speech.volume = 1;

    const voices =
      window.speechSynthesis.getVoices();

    const englishVoice =
      voices.find(

        voice =>

          voice.lang.includes("en")

      );

    if (englishVoice) {

      speech.voice = englishVoice;

    }

    speech.onstart = () => {

      setSpeaking(true);

    };

    speech.onend = () => {

      setSpeaking(false);

    };

    window.speechSynthesis.speak(
      speech
    );

  }

  function stopReading() {

    window.speechSynthesis.cancel();

    setSpeaking(false);

  }

  return (

    <div className="analysis-page">

      <button

        className="back-btn"

        onClick={() =>
          navigate("/medicine-assistant")
        }

      >

        ← Back

      </button>

      <div className="analysis-card">

        {

          image ?

          (

            <img

              src={image}

              alt="Medicine"

              className="medicine-preview"

            />

          )

          :

          (

            <div className="medicine-image">

              💊

            </div>

          )

        }

        <h1>

          Medicine Analysis

        </h1>
                {

          loading ?

          (

            <div className="analysis-status">

              <div className="spinner"></div>

              <p className="waiting">

                {loadingText}

              </p>

            </div>

          )

          :

          medicine &&

          (

            <p className="waiting success">

              ✅ Analysis Completed Successfully

            </p>

          )

        }

        {

          error &&

          (

            <p className="error-message">

              {error}

            </p>

          )

        }

        {

          medicine &&

          (

            <>

              <div className="result-section">

                <div className="result-box">

                  <h3>

                    💊 Medicine Name

                  </h3>

                  <p>

                    {medicine.name}

                  </p>

                </div>

                <div className="result-box">

                  <h3>

                    🎯 Confidence

                  </h3>

                  <span
                    className={`confidence ${medicine.confidence?.toLowerCase()}`}
                  >

                    {medicine.confidence}

                  </span>

                </div>

                <div className="result-box">

                  <h3>

                    ✅ Uses

                  </h3>

                  <p>

                    {medicine.uses}

                  </p>

                </div>

                <div className="result-box">

                  <h3>

                    💉 Dosage

                  </h3>

                  <p>

                    {medicine.dosage}

                  </p>

                </div>

                <div className="result-box">

                  <h3>

                    ⚠ Warnings

                  </h3>

                  <p>

                    {medicine.warnings}

                  </p>

                </div>

                <div className="result-box">

                  <h3>

                    ❌ Side Effects

                  </h3>

                  <p>

                    {medicine.sideEffects}

                  </p>

                </div>

                <div className="result-box">

                  <h3>

                    📦 Storage

                  </h3>

                  <p>

                    {medicine.storage}

                  </p>

                </div>

              </div>

              <div className="analysis-buttons">

                {

                  !speaking ?

                  (

                    <button

                      className="speak-btn"

                      onClick={readMedicine}

                    >

                      🔊 Read Aloud

                    </button>

                  )

                  :

                  (

                    <button

                      className="stop-btn"

                      onClick={stopReading}

                    >

                      ⏹ Stop Reading

                    </button>

                  )

                }

                <button

                  className="ask-btn"

                  onClick={() =>
                    navigate("/assistant")
                  }

                >

                  🤖 Ask AI Pharmacist

                </button>

              </div>

            </>

          )

        }

      </div>

    </div>

  );

}

export default MedicineAnalysis;