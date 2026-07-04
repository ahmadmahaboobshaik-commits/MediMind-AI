import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==============================
// IMAGE ANALYSIS
// ==============================

export async function analyzeMedicineImage(image) {

  try {

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
You are an expert pharmacist.

Analyze this medicine image.

Return ONLY valid JSON.

{
"name":"",
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

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (error) {

    console.error(error);

    return {

      name: "Unknown Medicine",

      uses: "--",

      dosage: "--",

      warnings: "--",

      sideEffects: "--",

      storage: "--"

    };

  }

}

// ==============================
// AI PHARMACIST CHAT
// ==============================

export async function askPharmacist(message) {

  try {

    const prompt = `
You are MediMind AI, an expert AI Pharmacist.

Your audience is pharmacy owners.

Always answer in SIMPLE English.

Never write long paragraphs.

Always use this exact format when applicable:

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
• One useful recommendation for a pharmacy owner.

If the user asks only one topic (like storage or side effects), answer ONLY that section.

Keep answers under 150 words.

Question:

${message}
`;

    const response = await ai.models.generateContent({

      model: "gemini-2.5-flash",

      contents: prompt

    });

    return response.text;

  } catch (error) {

    console.error(error);

    return "Sorry, I couldn't answer your question.";

  }

}