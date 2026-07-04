import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { chatWithAI } from "../services/api";

import "../styles/VoiceSearch.css";

function VoiceSearch() {

  const navigate = useNavigate();

  const [listening, setListening] = useState(false);

  const [transcript, setTranscript] = useState("");

  const [response, setResponse] = useState("");

  const [recognition, setRecognition] = useState(null);

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition is not supported in this browser.");

      return;

    }

    const recog = new SpeechRecognition();

    recog.lang = "en-IN";

    recog.continuous = false;

    recog.interimResults = false;

    recog.onresult = async (event) => {

      const text = event.results[0][0].transcript;

      setTranscript(text);

      setListening(false);

      try {

        const reply = await chatWithAI(text);

        setResponse(reply);

      } catch {

        setResponse("Unable to contact AI.");

      }

    };

    recog.onerror = () => {

      setListening(false);

    };

    setRecognition(recog);

  }, []);

  function startListening() {

    if (!recognition) return;

    setTranscript("");

    setResponse("");

    setListening(true);

    recognition.start();

  }

  return (

    <div className="voice-page">

      <h1>🎤 Voice Search</h1>

      <p>

        Speak the medicine name.

      </p>
      

      <button

        className="voice-btn"

        onClick={startListening}

      >

        {

          listening

            ? "🎙 Listening..."

            : "🎤 Start Speaking"

        }

      </button>

      {

        transcript && (

          <div className="voice-card">

            <h3>You said</h3>

            <p>{transcript}</p>

          </div>

        )

      }

      {

        response && (

          <div className="voice-card">

            <h3>MediMind AI</h3>

            <p>{response}</p>

          </div>

        )

      }

      <button

        className="back-btn"

        onClick={() => navigate("/medicine-assistant")}

      >

        ← Back

      </button>

    </div>

  );

}

export default VoiceSearch;