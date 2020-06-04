import React, { Component } from 'react';
import '../css/App.css';
import EmployeeTree from '../components/EmployeeTree';
import { getManager } from '../utils/Api';

class App extends Component {
  constructor (props) {
    super(props);
    this.getManager = getManager;
    this.setEmployees = this.setEmployees.bind(this);
    this.state = {
      employees: []
    };
  }

  setEmployees(employees) {
    const newState = {...this.state};
    Object.assign(newState, {employees: [
      ...newState.employees,
      ...employees
    ]});
    this.setState(newState);
  }

  componentDidMount() {
    this.getManager(0)
      .then((employees) => {
        this.setEmployees(employees);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="App">
        <EmployeeTree employees={this.state.employees}/>
      </div>
    );
  }
}

export default App;
