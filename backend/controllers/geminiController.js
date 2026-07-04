import {
  analyzeMedicineImage,
  askPharmacist
} from "../services/geminiService.js";

export async function analyzeMedicine(req, res) {

  try {

    const { image } = req.body;

    const result = await analyzeMedicineImage(image);

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Analysis failed."

    });

  }

}

export async function chatWithAI(req, res) {

  try {

    const { message } = req.body;

    const answer = await askPharmacist(message);

    res.json({

      reply: answer

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Chat failed."

    });

  }

}