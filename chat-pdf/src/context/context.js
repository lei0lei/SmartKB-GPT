import React from 'react';

export const PdfContext = React.createContext({
  vectordb: '',
  docs: '--------',
  updateDocs: () => {},
  updateVectorDatabase: () =>{},

  fileList: [],
  fileObjs:[],
  updateFileList:()=>{},
  updateFileObjs:()=>{},

  
  currentShowFile:'',
  currentShowFileObj:'',
  updateCurrentShowFile:()=>{},
  updateCurrentShowFileObj:()=>{},
});