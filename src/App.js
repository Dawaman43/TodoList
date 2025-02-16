import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Todo from './components/Todo'; 


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Todo />} /> 
      </Routes>
    </div>
  );
}

export default App;
