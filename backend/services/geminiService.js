import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// MEDICINE IMAGE ANALYSIS
// ==========================================

export async function analyzeMedicineImage(image) {

  async function analyze() {

    const base64Image = image.split(",")[1];

    const response = await ai.models.generateContent({

      model: "gemini-2.5-flash",

      contents: [

        {

          inlineData: {

            mimeType: "image/jpeg",

            data: base64Image,

          },

        },

        {

          text: `

You are MediMind AI.

You are an expert Pharmacist,
Medicine Recognition Specialist,
Drug Information Expert
and Pharmaceutical Consultant.

The uploaded image can be:

• Medicine strip
• Blister pack
• Medicine box
• Bottle
• Syrup
• Injection
• Prescription label
• Pharmaceutical product

--------------------------------------------------

YOUR TASK

Carefully inspect the entire image.

Read every visible word.

Correct spelling mistakes automatically.

Ignore OCR mistakes.

If the medicine name is partially visible,
infer the MOST PROBABLE medicine.

Use your pharmaceutical knowledge.

NEVER answer "Unknown Medicine"
unless absolutely nothing is readable.

If confidence is not perfect,
still return the MOST LIKELY medicine.

--------------------------------------------------

IF THE IMAGE IS NOT A MEDICINE

Return

{

"name":"Not a medicine",

"confidence":"High",

"uses":"Please upload a medicine image.",

"dosage":"--",

"warnings":"--",

"sideEffects":"--",

"storage":"--"

}

--------------------------------------------------

CONFIDENCE

Estimate confidence as only

High

Medium

Low

--------------------------------------------------

RETURN ONLY VALID JSON

Never use markdown.

Never explain.

Return ONLY this JSON.

{

"name":"",

"confidence":"",

"uses":"",

"dosage":"",

"warnings":"",

"sideEffects":"",

"storage":""

}

`

        }

      ]

    });

    let text = response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const medicine = JSON.parse(text);
        // -------------------------------
    // Clean & validate response
    // -------------------------------

    if (
      !medicine.name ||
      medicine.name.trim() === "" ||
      medicine.name.toLowerCase().includes("unknown")
    ) {

      medicine.name = "Most Probable Medicine";

    }

    if (
      !medicine.confidence ||
      medicine.confidence.trim() === ""
    ) {

      medicine.confidence = "Medium";

    }

    if (!medicine.uses)
      medicine.uses = "--";

    if (!medicine.dosage)
      medicine.dosage = "--";

    if (!medicine.warnings)
      medicine.warnings = "--";

    if (!medicine.sideEffects)
      medicine.sideEffects = "--";

    if (!medicine.storage)
      medicine.storage = "--";

    return medicine;

  }

  // -------------------------------
  // First attempt
  // -------------------------------

  try {

    return await analyze();

  }

  // -------------------------------
  // Retry once automatically
  // -------------------------------

  catch (firstError) {

    console.log("Retrying Gemini Vision...");

    try {

      return await analyze();

    }

    catch (secondError) {

      console.error(secondError);

      return {

        name: "Medicine could not be confidently identified",

        confidence: "Low",

        uses: "Please upload a clearer medicine image.",

        dosage: "--",

        warnings: "--",

        sideEffects: "--",

        storage: "--"

      };

    }

  }

}

// ==========================================
// AI PHARMACIST CHAT
// ==========================================

export async function askPharmacist(message) {

  try {

    const prompt = `
You are MediMind AI,
an expert AI Pharmacist.

Your audience is pharmacy owners.

Always answer in SIMPLE English.

Never write long paragraphs.

Always use this exact format whenever applicable.

💊 Medicine:
<Name>

✅ Uses:
• Point 1
• Point 2

💉 Dosage:
• Short recommendation

⚠ Warnings:
• Point 1
• Point 2

❌ Side Effects:
• Point 1
• Point 2

📦 Storage:
• Point 1

💡 Pharmacy Advice:
• One useful recommendation.

If the user asks only one topic
(storage, dosage, side effects etc.)
answer ONLY that section.

Keep answers below 150 words.

Question:

${message}
`;

    const response =
      await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt

      });

    return response.text;

  }

  catch (error) {

    console.error(error);

    return "Sorry, I couldn't answer your question. Please try again.";

  }

}