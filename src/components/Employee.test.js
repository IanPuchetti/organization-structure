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

it('should not render if employee prop is not passed', () => {
  act(() => {
    ReactDOM.render(<Employee/>, container);
  });
  expect(container.childElementCount).toBe(0);
});

it('should render a .Employee div with a child element if employee is passed.', () => {
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  const div = container.querySelector('.Employee');
  expect(div.childElementCount).toBe(1);
});

it('should render a .EmployeeName div with the first and last name of the employee if employee is passed.', () => {
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  const div = container.querySelector('.EmployeeName');
  expect(div.textContent).toBe(`${employee.first} ${employee.last}`);
});

it('should not be an .EmployeeTree if .EmployeeName is not clicked.', () => {
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });

  const employeeTree = container.querySelector('.EmployeeTree');
  expect(employeeTree).toBe(null);
});

it('should render an .EmployeeTree on .EmployeeName click.', async () => {
  getManagerEmployees.mockReturnValue(Promise.resolve([testEmployees[1]]));
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  
  const employeeName = container.querySelector('.EmployeeName');
  expect(employeeName).not.toBe(null);

  await act(async () => {
    await employeeName.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  const employeeTree = container.querySelector('.EmployeeTree');
  expect(employeeTree).not.toBe(null);
});

it('should not render .EmployeeTree and render a No Employees span if employees is an empty array.', async () => {
  getManagerEmployees.mockReturnValue(Promise.resolve([]));
  const [employee] = testEmployees;
  act(() => {
    ReactDOM.render(<Employee employee={employee}/>, container);
  });
  const employeeName = container.querySelector('.EmployeeName');

  await act(async () => {
    await employeeName.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  const employeeTree = container.querySelector('.EmployeeTree');
  const noEmployeesSpan = container.querySelector('span');

  expect(noEmployeesSpan).not.toBe(null);
  expect(employeeTree).toBe(null);
});
