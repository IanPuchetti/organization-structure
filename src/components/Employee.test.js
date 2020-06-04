import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Employee from './Employee';

jest.mock('../utils/Api');
import { getManagerEmployees } from '../utils/Api';

let container;
const testEmployees = [
  {id: 1, first: 'Carl', last: 'Carlson'},
  {id: 2, first: 'Lenny', last: 'Leonard'}
];

beforeEach(() => {
  getManagerEmployees.mockClear();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('should return an empty div if there is no employee prop passed', () => {
  act(() => {
    ReactDOM.render(<Employee/>, container);
  });
  const div = container.querySelector('div');
  expect(div.childElementCount).toBe(0);
});

it('should render a .Employee div with two child element.', () => {
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  const div = container.querySelector('.Employee');
  expect(div.childElementCount).toBe(2);
});

it('should render a .EmployeeName div with the first and last name of the employee.', () => {
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  const div = container.querySelector('.EmployeeName');
  expect(div.textContent).toBe(`${employee.first} ${employee.last}`);
});

it('should return a .EmployeeExpand div with the "Expand" button inside.', () => {
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  const div = container.querySelector('.EmployeeExpand');
  expect(div.childElementCount).toBe(1);
  
  const button = div.querySelector('button');
  expect(button).not.toBe(null);
  expect(button.textContent).toBe('Expand');
});

it('should not be an .EmployeeTree if button is not clicked.', () => {
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  
  const button = container.querySelector('button');
  expect(button).not.toBe(null);

  const employeeTree = container.querySelector('.EmployeeTree');
  expect(employeeTree).toBe(null);
});

it('should render an .EmployeeTree on button click.', async () => {
  getManagerEmployees.mockReturnValue(Promise.resolve([testEmployees[1]]));
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  
  const button = container.querySelector('button');
  expect(button).not.toBe(null);

  await act(async () => {
    await button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  
  const employeeTree = container.querySelector('.EmployeeTree');
  expect(employeeTree).not.toBe(null);
});

it('should not render .EmployeeTree and button if employees is an empty array.', async () => {
  getManagerEmployees.mockReturnValue(Promise.resolve([]));
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  let button = container.querySelector('button');

  await act(async () => {
    await button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  
  const employeeTree = container.querySelector('.EmployeeTree');
  button = container.querySelector('button');

  expect(button).toBe(null);
  expect(employeeTree).toBe(null);
});
