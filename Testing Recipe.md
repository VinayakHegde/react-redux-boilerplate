# Redux

**store.js**
```
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";

const rootReducer = combineReducers({});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

```

**reducer.js**
```
const reducer = (state = {}, {payload, type}) => {
  switch (type) {
    case "APP_CONTENT_GENERATED" :
      return Object.assign({}, state, {...payload});
    default: 
      return state;
  }
};
```
**reducer.test.js**
```
it("reducer should update the store", () => {
  const payload = {a: 1, b:2};
  const store = reducer({}, {type: 'APP_CONTENT_GENERATED', payload});
  expect(store.a).toBe(1);
  expect(store.b).toBe(2);
})
```
**actionCreator.js**
```
const getContents = () => new Promise(resolve => resolve({
  content: 'App contents from store!'
}));

export const ajax = {
  getContents
}

const acGetContents = () => dispatch => ajax.getContents()
  .then(payload => dispatch({
    type: type.APP_CONTENT_GENERATED,
    payload
  })
);

```
**actionCreator.test.js**
```
import acGetContents, {ajax} from './dispatch';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

it("should make async call", async () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({});
  ajax.getContents = jest.fn().mockImplementation(() => Promise.resolve({a: 1}));
  await store.dispatch(acGetContents()).then(() => {
    expect(ajax.getContents).toHaveBeenCalledTimes(1);
  });
});
```

# React - Connected components
**App.jsx**
```
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import acGetContents from 'src/store/app/dispatch';
import './App.scss';

const App = ({content, getContents}) => {
  React.useEffect(() => {
    getContents();
  }, [getContents]);

  const [flag, setFlag] = React.useState(false);

  return (
    <>
      <main className="App__main" onClick={()=> setFlag(!flag)}>
        {content}
      </main>
      <span>{flag}</span>
    </>
  );
};

App.propType = {
  content: PropTypes.string.isRequired,
  getContents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({content: state.app.content});
export const mapDispatchToProps = dispatch => bindActionCreators({getContents: acGetContents}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);


```
**App.test.js**
```
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
```
