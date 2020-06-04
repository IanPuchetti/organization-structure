import React, { Component } from 'react';
import Employee from './Employee';
import '../css/EmployeeTree.css';


class EmployeeTree extends Component {
  render() {
    return (
      <div className="EmployeeTree">
        { 
          this.props.employees &&
          this.props.employees.map(employee => (
              <Employee employee={employee}
                key={employee.id.toString()}/>
          ))
        }
      </div>
    );
  }
}

export default EmployeeTree;  
