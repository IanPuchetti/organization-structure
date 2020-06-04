import React, { Component } from 'react';
import EmployeeTree from './EmployeeTree';
import { getManagerEmployees } from '../utils/Api';
import '../css/Employee.css';

class Employee extends Component {
  constructor (props) {
    super(props);
    this.employee = this.props.employee;
    this.getManagerEmployees = getManagerEmployees;
    this.setEmployees = this.setEmployees.bind(this);
    this.expand = this.expand.bind(this);
    this.state = {};
  }

  setEmployees(employees) {
    this.setState((state) => {
      return {employees};
    })
  }

  async expand() {
    try {
      const employees = await this.getManagerEmployees(this.employee);
      this.setEmployees(employees);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      this.employee &&
      <div className="Employee">
        <div className="EmployeeName">
          {this.employee.first} {this.employee.last}
        </div>
        { ( !this.state.employees &&
            <button onClick={this.expand}>Expand</button> ) || 
          ( !!this.state.employees.length &&
            <EmployeeTree employees={this.state.employees}/> ) }
      </div>
    ) || <div/>;
  }
}

export default Employee;  
