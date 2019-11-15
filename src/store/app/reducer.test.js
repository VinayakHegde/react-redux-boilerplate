import reducer from './reducer';

it("reducer should update the store", () => {
  const payload = {a: 1, b:2};
  const store = reducer({}, {type: 'APP_CONTENT_GENERATED', payload});
  expect(store.a).toBe(1);
  expect(store.b).toBe(2);
})