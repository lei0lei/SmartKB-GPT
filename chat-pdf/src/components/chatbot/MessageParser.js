import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import React, { useContext } from 'react';
import { PdfContext } from '../../context/context.js';

const model = new ChatOpenAI({ modelName: "gpt-4" ,openAIApiKey:'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'});
const memory = new BufferMemory({
  memoryKey: "chat_history",
  returnMessages: true,
});

const MessageParser = ({ children, actions }) => {
  const context = useContext(PdfContext);
  console.log(context)
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
    console.log(result);
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