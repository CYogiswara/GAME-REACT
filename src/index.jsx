import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './allMenu/Page';
import Indo from './indonesia/Indo';
import Map from './allMenu/Map';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page/>} />
        <Route path="/Indo" element={<Indo/>} />
        <Route path="/Map" element={<Map/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


