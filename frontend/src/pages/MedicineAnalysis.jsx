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

  async function handleAnalyze() {

    if (!file) return;

    try {

      setLoading(true);

      setError("");

      setLoadingText("📤 Uploading Image...");

      setTimeout(() => {

        setLoadingText(
          "🧠 AI is reading the medicine..."
        );

      }, 1200);

      setTimeout(() => {

        setLoadingText(
          "💊 Identifying medicine..."
        );

      }, 2500);

      setTimeout(() => {

        setLoadingText(
          "📋 Preparing analysis..."
        );

      }, 3800);

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

            <p className="waiting">

              {loadingText}

            </p>

          )

          :

          (

            <p className="waiting success">

              ✅ Analysis Complete

            </p>

          )

        }

        {

          error &&

          (

            <p
              style={{
                color: "#ef4444",
                textAlign: "center",
                marginTop: "15px",
                fontWeight: "600"
              }}
            >

              {error}

            </p>

          )

        }

        {

          medicine &&

          (

            <div className="result-section">

              <div className="result-box">

                <h3>

                  💊 Medicine Name

                </h3>

                <p>

                  {medicine.name || "--"}

                </p>

              </div>

              <div className="result-box">

                <h3>

                  🎯 Confidence

                </h3>

                <p>

                  {medicine.confidence || "High"}

                </p>

              </div>

              <div className="result-box">

                <h3>

                  ✅ Uses

                </h3>

                <p>

                  {medicine.uses || "--"}

                </p>

              </div>

              <div className="result-box">

                <h3>

                  💉 Dosage

                </h3>

                <p>

                  {medicine.dosage || "--"}

                </p>

              </div>

              <div className="result-box">

                <h3>

                  ⚠ Warnings

                </h3>

                <p>

                  {medicine.warnings || "--"}

                </p>

              </div>

              <div className="result-box">

                <h3>

                  ❌ Side Effects

                </h3>

                <p>

                  {medicine.sideEffects || "--"}

                </p>

              </div>

              <div className="result-box">

                <h3>

                  📦 Storage

                </h3>

                <p>

                  {medicine.storage || "--"}

                </p>

              </div>

            </div>

          )

        }

        <div className="analysis-buttons">

          <button className="speak-btn">

            🔊 Read Aloud

          </button>

          <button
            className="ask-btn"
            onClick={() =>
              navigate("/assistant")
            }
          >

            🤖 Ask AI

          </button>

        </div>

      </div>

    </div>

  );

}

export default MedicineAnalysis;