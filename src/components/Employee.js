import React, { useState, useCallback } from 'react';
import EmployeeTree from './EmployeeTree';
import { getManagerEmployees } from '../utils/Api';
import '../css/Employee.css';

function Employee({ employee }) {
  const [employees, setEmployees] = useState(null);

  const expand = useCallback(() => {
    if (employees === null) {
      getManagerEmployees(employee)
      .then(setEmployees)
      .catch((error) => {
        console.error(error);
      });
    }
  }, [employee, setEmployees, employees]);

  if (!employee) {
    return null;
  }

  return (
    <div className="Employee">
      <div className="EmployeeName" onClick={expand}>
        {employee.first} {employee.last}
      </div>
      { employees &&
        employees.length > 0 &&
        <EmployeeTree employees={employees}/>
      }

      { employees &&
        employees.length === 0 &&
        <span>No employees</span>
      }
    </div>
  );
}

export default Employee;  
