const combineReducers = function combineReducers(reducers) {
  /* 返回一个合并后的reducer
    + 每一次dispatch派发都是把这个reducer执行
    + state就是redux容器中的公共状态(总状态:分模块管理其他模块的状态)
    + action就是派发时候传递进来的行为对象
  */
  let reducerskeys = Reflect.ownKeys(reducers);

  return function reducer(state = {}, action) {
    reducerskeys.forEach((key) => {
      state[key] = reducers[key](state[key], action);
    });
    return state;
  };
};

export default combineReducers;
