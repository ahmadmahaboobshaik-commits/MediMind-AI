import { Bot, User } from "lucide-react";

import "./ChatMessage.css";

function ChatMessage({ sender, message }) {

  return (

    <div className={`chat-message ${sender}`}>

      <div className="avatar">

        {

          sender === "user"

            ? <User size={22} />

            : <Bot size={22} />

        }

      </div>

      <div className="message">

        <p>{message}</p>

      </div>

    </div>

  );

}

export default ChatMessage;