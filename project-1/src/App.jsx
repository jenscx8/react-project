// import './App.css'
// import InstructorList from './components/InstructorList.jsx'

// function App({initialInstructorList}) {
//     return (
//         <InstructorList initialInstructorList={initialInstructorList} />
//     )
// }

// export default App




//this was the code with routes to the list and profile but it kept breaking when i tried it

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InstructorList from './components/InstructorList';
import InstructorProfile from './components/InstructorProfile';

function App({ initialInstructorList }) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<InstructorList initialInstructorList={initialInstructorList} />} />
         
          <Route path="/instructor/:id" element={<InstructorProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


