import { ConversationalRetrievalQAChain } from "langchain/chains";
import React, { useContext } from 'react';
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PdfContext } from '../../context/context.js';

let model = null

let streamedResponse = "";
try{
          
  // model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" ,openAIApiKey:process.env.REACT_APP_openAIApiKey});
  model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" ,callbacks: [{
    handleLLMNewToken(token) {
        streamedResponse += token;
        
    },}],streaming: true,openAIApiKey:process.env.REACT_APP_openAIApiKey});
  
} catch(err) {
  alert('Api key not available');
  model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" ,openAIApiKey:'none'});
}
// const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" ,openAIApiKey:process.env.REACT_APP_openAIApiKey});
const memory = new BufferMemory({
  memoryKey: "chat_history",
  returnMessages: true,
});

const MessageParser = ({ children, actions }) => {
  const context = useContext(PdfContext);
  
  const parse = async (message) => {
    
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      context.vectordb.asRetriever(),
      {
        memory,
      }
    );
    const result = await chain.call({
      question: message,
    });
    console.log({ streamedResponse });
    actions.handleResponse(result.text);
    
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;