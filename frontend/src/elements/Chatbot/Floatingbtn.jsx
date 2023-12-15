import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Chatbot from '../Chatbot/Chatbot';  // Import your Chatbot component

const FloatingButton = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
    const buttonStyle = {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
    };
  
    const handleChatbotToggle = () => {
      setIsChatbotOpen(!isChatbotOpen);
    };
  
    return (
      <>
        {!isChatbotOpen && (
          <Box style={buttonStyle}>
            <Fab color="primary" aria-label="chat" onClick={handleChatbotToggle}>
              <ChatIcon />
            </Fab>
          </Box>
        )}
        {isChatbotOpen && (
          <div className="chatbot-container">
            <Chatbot onClose={handleChatbotToggle} />
          </div>
        )}
      </>
    );
  };
  
  export default FloatingButton;