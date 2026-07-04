import { useState } from "react";
import { SendHorizontal } from "lucide-react";

import "./ChatInput.css";

function ChatInput({ onSend }) {

  const [message, setMessage] = useState("");

  function handleSend() {

    if (!message.trim()) return;

    onSend(message);

    setMessage("");

  }

  function handleKeyDown(event) {

    if (event.key === "Enter") {

      handleSend();

    }

  }

  return (

    <div className="chat-input-container">

      <input
        type="text"
        placeholder="Ask MediMind AI about medicines, dosage, storage..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSend}>

        <SendHorizontal size={18} />

        Send

      </button>

    </div>

  );

}

export default ChatInput;