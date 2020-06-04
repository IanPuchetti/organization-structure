import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import NavBar from './NavBar';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

it('should render a .Title on load, with the title on its content', () => {
  const titleContent = 'Organization Structure';
  act(() => {
    ReactDOM.render(<NavBar/>, container);
  });
  
  const title = container.querySelector('.Title');
  expect(title.textContent).toBe(titleContent);
});

it('should render a .Instruction on load, with the instruction on its content', () => {
  const instructionContent = 'Click on each member to expand the employees they manage.';
  act(() => {
    ReactDOM.render(<NavBar/>, container);
  });
  
  const instruction = container.querySelector('.Instruction');
  expect(instruction.textContent).toBe(instructionContent);
});