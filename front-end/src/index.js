import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


import './styles/variables.css'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/reset.css'
import './styles/fonts.css'
import './styles/defaults.css'
import './styles/helpers.css'
import './styles/responsive.css'
import './styles/responsive.allCourses.css'



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
