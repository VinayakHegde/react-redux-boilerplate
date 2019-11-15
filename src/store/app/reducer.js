import t from "./type";

const reducer = (state = {}, {payload, type}) => {
  switch (type) {
    case t.APP_CONTENT_GENERATED:
      return Object.assign({}, state, {...payload});
    default: 
      return state;
  }
};

export default reducer;
