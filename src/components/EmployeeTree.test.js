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

it('should return an empty div if there is no employees prop passed', () => {
  act(() => {
    ReactDOM.render(<EmployeeTree/>, container);
  });
  const div = container.querySelector('div');
  expect(div.childElementCount).toBe(0);
});

it('should render one .Employee div.', () => {
  const employees = testEmployees.slice(0, 1);
  act(() => {
    ReactDOM.render(<EmployeeTree employees={employees}/>, container);
  });
  const employeesDiv = container.querySelectorAll('.Employee');
  expect(employeesDiv.length).toBe(1);
});

it('should render two .Employee div.', () => {
  const employees = testEmployees.slice(0, 2);
  act(() => {
    ReactDOM.render(<EmployeeTree employees={employees}/>, container);
  });
  const employeesDiv = container.querySelectorAll('.Employee');
  expect(employeesDiv.length).toBe(2);
});

it('should render three .Employee div.', () => {
  act(() => {
    ReactDOM.render(<EmployeeTree employees={testEmployees}/>, container);
  });
  const employeesDiv = container.querySelectorAll('.Employee');
  expect(employeesDiv.length).toBe(3);
});