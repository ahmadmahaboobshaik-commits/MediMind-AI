import { useState } from "react";
import { chatWithAI } from "../services/api";

export default function useChat() {

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message:
        "👋 Welcome to MediMind AI Pharmacist.\n\nAsk me anything about medicines, inventory, storage, side effects, prescription status or pharmacy management."
    }
  ]);

  const [loading, setLoading] = useState(false);

  const [currentMedicine, setCurrentMedicine] = useState("");

  const quickQuestions = [
    "Storage",
    "Side Effects",
    "Generic Alternative",
    "Drug Interactions",
    "Prescription Status",
    "Restock Advice"
  ];

  async function sendMessage(message) {

    if (!message.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        message
      }
    ]);

    let rememberedMedicine = currentMedicine;

    // Save medicine name only if it isn't a quick action
    if (
      message.split(" ").length <= 3 &&
      !quickQuestions.includes(message)
    ) {
      rememberedMedicine = message;
      setCurrentMedicine(message);
    }

    let finalPrompt = message;

    if (
      quickQuestions.includes(message) &&
      rememberedMedicine !== ""
    ) {

      finalPrompt = `
You are MediMind AI.

Current Medicine:
${rememberedMedicine}

User Question:
${message}

Answer ONLY for the current medicine.
`;

    }

    setLoading(true);

    try {

      const reply = await chatWithAI(finalPrompt);

      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          message: reply
        }
      ]);

    } catch (error) {

      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          message:
            "❌ Unable to contact MediMind AI."
        }
      ]);

    } finally {

      setLoading(false);

    }

  }

  return {

    messages,

    loading,

    sendMessage,

    currentMedicine

  };

}