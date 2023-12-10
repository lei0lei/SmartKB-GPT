import 'react-chatbot-kit/build/main.css'
// import Sidebar from './components/layout/Sidebar.js';
import PdfViewerWithUploadBtn from './components/pdfviewer/PdfViewer.tsx'

import { Navigation } from './components/layout'
import React from 'react';
import './App.css'
import { PdfProvider } from './context/provider.js';
import PdfViewer from './components/pdfviewer/PdfViewerx.js'

function App() {
  return (
    <>
      <PdfProvider>
        <div>
        <Navigation />
        </div>
        <PdfViewer />
       </PdfProvider>
       
    </>
  );
}

export default App;
