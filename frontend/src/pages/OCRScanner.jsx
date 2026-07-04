import { useRef, useState } from "react";
import Tesseract from "tesseract.js";

import { chatWithAI } from "../services/api";

import "../styles/OCRScanner.css";

function OCRScanner() {

  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [ocrText, setOcrText] = useState("");

  const [aiResponse, setAiResponse] = useState("");

  function chooseImage() {

    fileInputRef.current.click();

  }

  async function handleImage(event) {

    const file = event.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);

    setLoading(true);

    setAiResponse("");

    setOcrText("");

    try {

      const result = await Tesseract.recognize(

        file,

        "eng"

      );

      const extracted = result.data.text.trim();

      setOcrText(extracted);

      const reply = await chatWithAI(

`You are an expert pharmacist.

The OCR extracted the following medicine label:

${extracted}

Identify the medicine and explain:

• Medicine Name
• Uses
• Dosage
• Warnings
• Side Effects
• Storage`

      );

      setAiResponse(reply);

    }

    catch(error){

      console.error(error);

      setAiResponse("Unable to process image.");

    }

    finally{

      setLoading(false);

    }

  }

  return (

    <div className="ocr-page">

      <h1>

        📷 OCR Medicine Scanner

      </h1>

      <p>

        Upload a medicine strip or label.

      </p>

      <button

        className="upload-btn"

        onClick={chooseImage}

      >

        Upload Image

      </button>

      <input

        ref={fileInputRef}

        type="file"

        accept="image/*"

        hidden

        onChange={handleImage}

      />

      {

        image &&

        <img

          src={image}

          alt="Medicine"

          className="ocr-image"

        />

      }

      {

        loading &&

        <p>

          🔍 Reading text...

        </p>

      }

      {

        ocrText &&

        <div className="ocr-box">

          <h3>

            Extracted Text

          </h3>

          <pre>

            {ocrText}

          </pre>

        </div>

      }

      {

        aiResponse &&

        <div className="ocr-box">

          <h3>

            🤖 MediMind AI

          </h3>

          <pre>

            {aiResponse}

          </pre>

        </div>

      }

    </div>

  );

}

export default OCRScanner;