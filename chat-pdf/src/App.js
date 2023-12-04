import logo from './logo.svg';
import './App.css';
import {MyChatbot} from './components/chatbot/Chatbot.js'
import 'react-chatbot-kit/build/main.css'
import Sidebar from './Sidebar.js';
import PdfViewerWithUploadBtn from './components/pdfviewer/PdfViewer.tsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React from 'react';

import { PdfProvider } from './context/provider.js';


function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Container>
          <Row>
            <Col>
                <Sidebar />
            </Col>
            <Col  lg={10}>
              <h1>Chat with pdf</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <PdfProvider>
      <Container>
        <Row>
          <Col>
              <PdfViewerWithUploadBtn />
          </Col>
          <Col md="auto">
              <MyChatbot />
          </Col>
        </Row>
      </Container>
      </PdfProvider>
    </div>
  );
}

export default App;
