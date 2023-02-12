import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import WomenEmpower from './components/WomenEmpower';
import { selectUser } from './feature/userSlice';

function App() {

const user=useSelector(selectUser);

  return (
    <div className="App">
    <WomenEmpower />
    </div>
  );
}

export default App;
