import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/flixwatch"> {/* ✅ Add this line */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
