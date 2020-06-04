import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import EmployeeTree from './EmployeeTree';

let container;
const testEmployees = [
  {id: 1, first: 'Carl', last: 'Carlson'},
  {id: 2, first: 'Lenny', last: 'Leonard'},
  {id: 3, first: 'Moe', last: 'Szyslak'}
];

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('should not render if there is no employees prop passed.', () => {
  act(() => {
    ReactDOM.render(<EmployeeTree/>, container);
  });
  expect(container.childElementCount).toBe(0);
});

it('should render one .Employee div if employees prop has one employee.', () => {
  const employees = testEmployees.slice(0, 1);
  act(() => {
    ReactDOM.render(<EmployeeTree employees={employees}/>, container);
  });
  const employeesDiv = container.querySelectorAll('.Employee');
  expect(employeesDiv.length).toBe(1);
});

it('should render two .Employee div if employees prop has two employees.', () => {
  const employees = testEmployees.slice(0, 2);
  act(() => {
    ReactDOM.render(<EmployeeTree employees={employees}/>, container);
  });
  const employeesDiv = container.querySelectorAll('.Employee');
  expect(employeesDiv.length).toBe(2);
});

it('should render three .Employee div if employees prop has three employees.', () => {
  act(() => {
    ReactDOM.render(<EmployeeTree employees={testEmployees}/>, container);
  });
  const employeesDiv = container.querySelectorAll('.Employee');
  expect(employeesDiv.length).toBe(3);
});