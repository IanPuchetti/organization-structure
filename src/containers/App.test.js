import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';

jest.mock('../utils/Api');
jest.mock('../components/NavBar');
jest.mock('../components/EmployeeTree');


import { getManager } from '../utils/Api';
import NavBar from '../components/NavBar';
import EmployeeTree from './../components/EmployeeTree';

EmployeeTree.mockReturnValue(<div className='EmployeeTree'></div>);
NavBar.mockReturnValue(<div className='NavBar'></div>);

let container;
const testManager = {id: 1, first: 'Carl', last: 'Carlson'};

beforeEach(() => {
  getManager.mockClear();
  container = document.createElement('div');
  document.body.appendChild(container);
});

it('renders without crashing', async () => {
  getManager.mockReturnValue(Promise.resolve([testManager]));
  await act(async () => {
    ReactDOM.render(<App/>, container);
  });
});

it('should render a .NavBar on load', async () => {
  getManager.mockReturnValue(Promise.resolve([testManager]));
  await act(async () => {
    ReactDOM.render(<App/>, container);
  });
  const navBar = container.querySelector('.NavBar');
  expect(navBar).not.toBe(null);
});

it('should not render .EmployeeTree if getManager returns an array with an employee', async () => {
  getManager.mockReturnValue(Promise.resolve([testManager]));
  await act(async () => {
    ReactDOM.render(<App/>, container);
  });

  const employeeTree = container.querySelector('.EmployeeTree');
  expect(employeeTree).not.toBe(null);
});