const API_URL = "http://localhost:5000/api";

// ================================
// IMAGE ANALYSIS
// ================================

export async function analyzeMedicineImage(file) {

  const reader = new FileReader();

  return new Promise((resolve, reject) => {

    reader.onload = async () => {

      try {

        const response = await fetch(

          `${API_URL}/gemini/analyze`,

          {

            method: "POST",

            headers: {

              "Content-Type": "application/json",

            },

            body: JSON.stringify({

              image: reader.result,

            }),

          }

        );

        const data = await response.json();

        resolve(data);

      }

      catch (error) {

        reject(error);

      }

    };

    reader.onerror = reject;

    reader.readAsDataURL(file);

  });

}

// ================================
// AI CHAT
// ================================

export async function chatWithAI(message, currentMedicine) {

  const response = await fetch(

    `${API_URL}/gemini/chat`,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        message,

        currentMedicine,

      }),

    }

  );

  const data = await response.json();

  return data.reply;

}