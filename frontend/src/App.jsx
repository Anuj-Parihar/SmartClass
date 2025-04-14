import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
