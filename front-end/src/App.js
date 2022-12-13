import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Containers from './pages/Containers';
import Movimentacoes from './pages/Movimentacoes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Containers />} />
          <Route path="/movimentacoes" element={<Movimentacoes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
