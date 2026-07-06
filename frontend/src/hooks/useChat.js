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

  const [loadingMessage, setLoadingMessage] = useState(
    "🤖 MediMind AI is thinking..."
  );

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

    // Remember medicine name only if it isn't a quick action
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

    const loadingSteps = [

      "🧠 Understanding your question...",

      "💊 Searching medicine knowledge...",

      "📚 Checking pharmacy guidelines...",

      "🤖 Preparing the best answer..."

    ];

    let index = 0;

    setLoadingMessage(loadingSteps[0]);

    const interval = setInterval(() => {

      index++;

      if (index < loadingSteps.length) {

        setLoadingMessage(loadingSteps[index]);

      }

    }, 1200);

    try {

      const reply = await chatWithAI(finalPrompt);

      clearInterval(interval);

      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          message: reply
        }
      ]);

    }

    catch (error) {

      clearInterval(interval);

      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          message:
            "⚠ AI is temporarily unavailable.\n\nPlease try again in a few seconds."
        }
      ]);

    }

    finally {

      clearInterval(interval);

      setLoading(false);

    }

  }

  return {

    messages,

    loading,

    loadingMessage,

    sendMessage,

    currentMedicine

  };

}