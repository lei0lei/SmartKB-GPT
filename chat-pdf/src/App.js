
import {MyChatbot} from './components/chatbot/Chatbot.js'
import 'react-chatbot-kit/build/main.css'
// import Sidebar from './components/layout/Sidebar.js';
import PdfViewerWithUploadBtn from './components/pdfviewer/PdfViewer.tsx'

import { Navigation } from './components/layout'
import React from 'react';
import './App.css'
import { PdfProvider } from './context/provider.js';


function App() {
  return (
    <>
      <div>
      <Navigation />
      </div>
      
       <PdfProvider>
      
        <div id = "element1">
         <PdfViewerWithUploadBtn />
         </div>
         <div id = "element2">
         <MyChatbot />
         </div>
         
       </PdfProvider>
       
    </>
  );
}

export default App;
