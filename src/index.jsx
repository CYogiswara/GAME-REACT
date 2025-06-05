import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './allMenu/Page';
import Indo from './indonesia/Indo';
import Japan from './japan/Japan';
import Map from './allMenu/Map';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page/>} />
        <Route path="/Indo" element={<Indo/>} />
        <Route path="/Map" element={<Map/>} />
        <Route path="/Japan" element={<Japan/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


