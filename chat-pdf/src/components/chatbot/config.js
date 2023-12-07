import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`You can chat with your pdf~~`)],
  customComponents: {
    header: () => <div >请在此输入对话及问题内容</div>

  }
};

export default config;