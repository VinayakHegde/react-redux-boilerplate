import type from "./type";

const getContents = () => new Promise(resolve => resolve({
  content: 'App contents from store!'
}));

export const ajax = {
  getContents
}

// Gets the content from API and then dispatches the action
const acGetContents = () => dispatch => ajax.getContents()
  .then(payload => dispatch({
    type: type.APP_CONTENT_GENERATED,
    payload
  })
);

export default acGetContents;
