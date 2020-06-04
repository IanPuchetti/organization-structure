import React, { useState, useEffect } from 'react';
import '../css/App.css';
import NavBar from '../components/NavBar';
import EmployeeTree from '../components/EmployeeTree';
import { getManager } from '../utils/Api';

function App() {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    getManager(0)
      .then(setEmployees)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <NavBar/>
      <div className="Container">
        <EmployeeTree employees={employees}/>
      </div>
    </div>
  );
}

export default App;
