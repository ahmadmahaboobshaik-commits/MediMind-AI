import useChat from "../hooks/useChat";

import ChatMessage from "../components/ChatMessage";
import QuickActions from "../components/QuickActions";
import ChatInput from "../components/ChatInput";

import "../styles/AIAssistant.css";

function AIAssistant() {

  const {
    messages,
    loading,
    sendMessage
  } = useChat();

  function handleQuickAction(action) {

    // Send ONLY the action name.
    // useChat.js will automatically attach
    // the remembered medicine.

    sendMessage(action);

  }

  return (

    <div className="assistant-container">

      <div className="assistant-header">

        <h1>
          🤖 MediMind AI Pharmacist
        </h1>

        <p>
          Intelligent pharmacy assistant powered by Gemini AI
        </p>

      </div>

      <QuickActions
        onSelect={handleQuickAction}
      />

      <div className="chat-window">

        {
          messages.map((message, index) => (

            <ChatMessage
              key={index}
              sender={message.sender}
              message={message.message}
            />

          ))
        }

        {
          loading && (

            <ChatMessage
              sender="ai"
              message="🤖 MediMind AI is analyzing..."
            />

          )
        }

      </div>

      <ChatInput
        onSend={sendMessage}
      />

    </div>

  );

}

export default AIAssistant;