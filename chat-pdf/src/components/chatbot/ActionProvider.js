
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  // this.state = {
  //   messages: [],
  //   streamingMessage: createChatBotMessage(""),
  // };
  const handleResponse = (strResponse) => {

    const botMessage = createChatBotMessage(strResponse);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {handleResponse,},
        });
      })}
    </div>
  );
};

export default ActionProvider;