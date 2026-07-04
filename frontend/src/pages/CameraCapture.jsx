import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/CameraCapture.css";

function CameraCapture() {

  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);

  const [capturedImage, setCapturedImage] = useState(null);

  const [capturedFile, setCapturedFile] = useState(null);

  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {

    startCamera();

    return () => {

      stopCamera();

    };

  }, []);

  async function startCamera() {

    try {

      const mediaStream = await navigator.mediaDevices.getUserMedia({

        video: {

          facingMode: "environment",

          width: { ideal: 1280 },

          height: { ideal: 720 }

        },

        audio: false

      });

      setStream(mediaStream);

      if (videoRef.current) {

        videoRef.current.srcObject = mediaStream;

        videoRef.current.onloadedmetadata = () => {

          setCameraReady(true);

        };

      }

    } catch (error) {

      console.error(error);

      alert("Unable to access camera.");

    }

  }

  function stopCamera() {

    if (!stream) return;

    stream.getTracks().forEach(track => track.stop());

  }

  function capturePhoto() {

    if (!videoRef.current) return;

    if (!canvasRef.current) return;

    const video = videoRef.current;

    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(

      video,

      0,

      0,

      canvas.width,

      canvas.height

    );

    canvas.toBlob(

      (blob) => {

        const file = new File(

          [blob],

          "medicine.jpg",

          {

            type: "image/jpeg"

          }

        );

        const imageUrl = URL.createObjectURL(blob);

        setCapturedImage(imageUrl);

        setCapturedFile(file);

        stopCamera();

      },

      "image/jpeg",

      0.95

    );

  }

  function retakePhoto() {

    setCapturedImage(null);

    setCapturedFile(null);

    startCamera();

  }

  function analyzePhoto() {

    if (!capturedFile) return;

    navigate("/medicine-analysis", {

      state: {

        image: capturedImage,

        file: capturedFile

      }

    });

  }

  return (

    <div className="camera-page">

      <h1>

        📸 Capture Medicine

      </h1>

      {

        !capturedImage ? (

          <video

            ref={videoRef}

            autoPlay

            playsInline

            muted

            className="camera-video"

          />

        ) : (

          <img

            src={capturedImage}

            alt="Captured"

            className="camera-video"

          />

        )

      }

      <canvas

        ref={canvasRef}

        style={{ display: "none" }}

      />

      <div className="camera-buttons">

        {

          !capturedImage ? (

            <>

              <button

                onClick={() => navigate("/medicine-assistant")}

              >

                ← Back

              </button>

              <button

                disabled={!cameraReady}

                onClick={capturePhoto}

              >

                📷 Capture

              </button>

            </>

          ) : (

            <>

              <button

                onClick={retakePhoto}

              >

                🔄 Retake

              </button>

              <button

                onClick={analyzePhoto}

              >

                🤖 Analyze

              </button>

            </>

          )

        }

      </div>

    </div>

  );

}

export default CameraCapture;