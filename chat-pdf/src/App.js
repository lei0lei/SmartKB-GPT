import logo from './logo.svg';
import './App.css';
import {MyChatbot} from './Chatbot.js'
import 'react-chatbot-kit/build/main.css'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyChatbot />
      </header>
    </div>
  );
}

export default App;
