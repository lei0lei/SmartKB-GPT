import React from 'react';
import { Document } from "langchain/document";
import { PdfContext } from './context.js';  // 导入上面创建的 Context
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export class PdfProvider extends React.Component {
    constructor(props) {
      super(props);
      
      // 初始化并绑定 updateMyString 函数
      this.updateMyString = this.updateMyString.bind(this);
      this.updateVectorDatabase = this.updateVectorDatabase.bind(this)
      // 将 updateMyString 方法和 myString 存在状态中
      this.state = {
        vectordb:'',
        myString: '',
        updateMyString: this.updateMyString,
        updateVectorDatabase: this.updateVectorDatabase
      };
    }
  
    updateMyString(newString) {
        this.setState({ myString: newString });
    }

    async updateVectorDatabase(newString) {
        // console.log(newString)
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: 500,
          chunkOverlap: 0,
        });
        const splitDocs = await textSplitter.splitDocuments([
          new Document({ pageContent: newString }),
        ])
        // const splitDocs =   await textSplitter.splitDocuments(texts);
        let embeddings=null;
        try{
          embeddings = new OpenAIEmbeddings({openAIApiKey:'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'});
        } catch(err) {
          alert('Api key not available');
        }
        const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
        this.setState({ vectordb: vectorStore });
        // const relevantDocs =  await vectorStore.similaritySearch(
        //   "what's the title"
        // );
        
        // console.log(relevantDocs); // "Hello!"
      
    }
  
    render() {
      return (
        <PdfContext.Provider value={this.state}>
          {this.props.children}
        </PdfContext.Provider>
      );
    }
  }