import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`请输入问题`)],
  customComponents: {
    header: () => <div style={{ height: "40px",backgroundColor: '#2898ec', padding: "5px", borderRadius: "3px" }}>Conversation Chatbot</div>

  }
};

export default config;