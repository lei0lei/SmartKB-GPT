import logo from './logo.svg';
import './App.css';
import {MyChatbot} from './Chatbot.js'
import 'react-chatbot-kit/build/main.css'
import Sidebar from './Sidebar.js';
import PdfViewerWithUploadBtn from './PdfViewer.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
    </div>
  );
}

export default App;
