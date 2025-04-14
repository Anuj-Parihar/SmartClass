// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './Components/register';
// import Home from './Components/Home';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/register';
import Home from './Components/Home';
import MailingStatus from './Components/MailingStatus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mailing-status" element={<MailingStatus />} />
      </Routes>
    </Router>
  );
}

export default App;