import React from 'react';
import Employee from './Employee';
import '../css/EmployeeTree.css';


function EmployeeTree({ employees }){
  if (!employees) {
    return null;
  }

  return (
    <div className="EmployeeTree">
      { 
        employees &&
        employees.map(employee => (
          <Employee employee={employee}
            key={employee.id.toString()}/>
        ))
      }
    </div>
  );
}

export default EmployeeTree;  
