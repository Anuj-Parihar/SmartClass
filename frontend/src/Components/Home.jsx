
// import React from 'react';
// import "./home.css"

// const Home = () => {
//   const handleStart = () => {
//     alert("Start Mailing according to the Classes timing");
//   };

//   return (
//     <div className="home-container">
//       <img src="/logo.png" alt="Logo" className="home-logo" />
//       <h1>Smart Class</h1>
//       <p>
//         A smart notification system that reminds students of their class schedule through timely emails. 
//         Designed to simplify your academic routine and never miss a class again.
//       </p>
//       <h3>Start Informing Classes</h3>
//       <button onClick={handleStart}>Start</button>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css"

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/mailing-status');
  };

  return (
    <div className="home-container">
      <img src="/Images/logo.jpg" alt="Logo" className="home-logo" />
      <h1>Smart Class</h1>
      <p>
        A smart notification system that reminds students of their class schedule through timely emails. 
        Designed to simplify your academic routine and never miss a class again.
      </p>
      <h3>Start Informing Classes</h3>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default Home;