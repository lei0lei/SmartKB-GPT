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
      this.updateDocs = this.updateDocs.bind(this);
      this.updateVectorDatabase = this.updateVectorDatabase.bind(this)
      this.updateFileList = this.updateFileList.bind(this);
      this.updateFileObjs = this.updateFileObjs.bind(this);
      this.updateCurrentShowFile = this.updateCurrentShowFile.bind(this);
      this.updateCurrentShowFileObj = this.updateCurrentShowFileObj.bind(this);

      // 将 updateMyString 方法和 myString 存在状态中
      this.state = {
        vectordb:'',
        docs: '',
        updateDocs: this.updateDocs,
        updateVectorDatabase: this.updateVectorDatabase,

        fileList: '',
        fileObjs:'',
        updateFileList:this.updateFileList,
        updateFileObjs:this.updateFileObjs,

        currentShowFile:'',
        currentShowFileObj:'',
        updateCurrentShowFile:this.updateCurrentShowFile,
        updateCurrentShowFileObj:this.updateCurrentShowFileObj,

      };
    }
  
    updateFileList(files){this.setState({fileList:files})}
    updateFileObjs(files){this.setState({fileObjs:files})}
    updateCurrentShowFile(file){this.setState({currentShowFile:file})}
    updateCurrentShowFileObj(file){this.setState({currentShowFileObj:file})}

    updateDocs(newString) {
        this.setState({ myString: newString });
    }

    async updateVectorDatabase(newString) {
        // console.log(newString)
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1500,
          chunkOverlap: 200,
        });
        const splitDocs = await textSplitter.splitDocuments([
          new Document({ pageContent: newString }),
        ])
        // const splitDocs =   await textSplitter.splitDocuments(texts);
        let embeddings=null;
        try{
          // embeddings = new OpenAIEmbeddings({openAIApiKey:process.env.REACT_APP_openAIApiKey});
          
          // embeddings = new OpenAIEmbeddings({openAIApiKey:process.env.REACT_APP_openAIApiKey});
          // console.log(process.env.REACT_APP_openAIApiKey)
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