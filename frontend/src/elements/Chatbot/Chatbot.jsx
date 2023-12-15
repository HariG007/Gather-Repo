import React, { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import './Chatbot.css'

const API_KEY = "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"; // Replace with your actual OpenAI API key
const systemMessage = {
  role: "system",
  content:
    "You are the bot of Navisphere, a NTRIP client. You have the responsibility to guide the users in webapp and clarify their doubts. The data subscription page calculates the nearest mountpoints around the user, and displays it in the drop down. The other parameters such as correction type are specified in there. The dashboard contains details of the received rtcm corrections. So help users to find them ",
};

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Bot! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const initAssistant = async () => {
      try {
        const response = await fetch("https://api.openai.com/v1/assistants", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [systemMessage],
          }),
        });

        console.log("Assistant Initialization Response:", response);

        if (!response.ok) {
          throw new Error("Assistant initialization failed.");
        }

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data?.choices?.[0]?.message?.content || "No response",
            sender: "ChatGPT",
          },
        ]);
      } catch (error) {
        console.error("Error initializing the assistant:", error.message);
      }
    };

    initAssistant();
  }, []);

  const handleSend = async (message) => {
    try {
      const newMessage = {
        message,
        direction: "outgoing",
        sender: "user",
      };

      const newMessages = [...messages, newMessage];

      setMessages(newMessages);

      setIsTyping(true);
      await processMessageToChatGPT(newMessages);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    try {
      let apiMessages = chatMessages.map((messageObject) => {
        let role = "";
        if (messageObject.sender === "ChatGPT") {
          role = "assistant";
        } else {
          role = "user";
        }
        return { role: role, content: messageObject.message };
      });

      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          systemMessage,
          ...apiMessages,
        ],
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      console.log("ChatGPT Response:", response);

      if (!response.ok) {
        throw new Error("Failed to process message with ChatGPT.");
      }

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.choices[0]?.message?.content || "No response",
          sender: "ChatGPT",
        },
      ]);

      setIsTyping(false);
    } catch (error) {
      console.error("Error processing message with ChatGPT:", error.message);
      setIsTyping(false);
    }
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button className="close-button" onClick={onClose}>
         ✖
        </button>
      </div>
      <MainContainer>
        <ChatContainer>
          <MessageList
          style={{paddingTop:'10px'}}
            scrollBehavior="smooth"
            typingIndicator={
              isTyping ? <TypingIndicator content="Bot is typing" /> : null
            }
          >
            {messages.map((message, i) => (
              <Message key={i} model={message} />
            ))}
          </MessageList>
          <MessageInput style={{backgroundColor:'white',paddingTop:'10px',paddingBottom:'10px'}} placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chatbot;
