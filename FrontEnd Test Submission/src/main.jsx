import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

import { setLoggerToken } from '../../Logging Middleware/logger.js';

setLoggerToken(import.meta.env.VITE_LOGGER_TOKEN);

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
