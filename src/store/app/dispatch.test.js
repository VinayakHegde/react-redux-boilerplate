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