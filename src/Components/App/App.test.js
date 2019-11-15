import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import App from './App';

let container;
let store;
beforeAll(() => { 
});
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  const initialState = {
    app: {content : 'Hello'}
  };
  const mockStore = configureStore([thunk]);
  store = mockStore(initialState);
  store.dispatch = jest.fn();
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  store = null;
});

const Render = props => (
  <Provider store={store}>
    <App {...props}/>
  </Provider>
);

it("should match the snapshot", () => {
  let component; 
  act(() => {
    component = render(<Render />, container);
  });
  expect(component).toMatchSnapshot()
});

it('should cntain main element', () => {
  act(() => {
    render(<Render />, container);
  });
  const text = document.querySelector('main').textContent;
  expect(text).toBe('Hello');
});

it('should make getdata call in useEffect hook on component mount', () => {
    jest.spyOn(React, "useEffect");
    act(() => {
      render(<Render />, container);
    }); 
    expect(React.useEffect).toHaveBeenCalled();
});

if('should changes the value on click', () => {
  const onClick = jest.fn();
  act(() => {
    render(<Render onClick={onClick} />, container);
  });
  const main = document.querySelector('main');
  expect(main).not.toBe(null);

  main.dispatchEvent(new MouseEvent('click', {bubbles: true}));

  expect(onClick).toHaveBeenCalled();
});
