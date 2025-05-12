import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './menuAwal/Page';
import Indo from './indonesia/Indo';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page/>} />
        <Route path="/indo" element={<Indo/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


