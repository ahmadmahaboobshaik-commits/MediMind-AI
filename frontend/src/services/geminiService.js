import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function analyzeMedicineImage(imageFile) {

  try {

    const imageBytes = await imageFile.arrayBuffer();

    const base64Image = btoa(

      new Uint8Array(imageBytes).reduce(

        (data, byte) => data + String.fromCharCode(byte),

        ""

      )

    );

    const response = await ai.models.generateContent({

      model: "gemini-2.5-flash",

      contents: [

        {

          inlineData: {

            mimeType: imageFile.type,

            data: base64Image

          }

        },

        {

          text: `
You are an expert pharmacist.

Identify the medicine from this image.

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

    let text = response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const start = text.indexOf("{");

    const end = text.lastIndexOf("}");

    if (start !== -1 && end !== -1) {

      text = text.substring(start, end + 1);

    }

    return JSON.parse(text);

  }

  catch (error) {

    console.error(error);

    return {

      name: "Unknown Medicine",

      uses: "Unable to identify medicine.",

      dosage: "--",

      warnings: "--",

      sideEffects: "--",

      storage: "--"

    };

  }

}