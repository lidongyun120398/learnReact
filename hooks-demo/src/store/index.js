import { createStore } from "redux";

/* 管理员:修改Store容器中的公共状态 */
let initial = {
  supNum: 10,
  oppNum: 5,
};
/* 
  每一次dispatch派发，都会把reducer执行
  + 第一次派发，state没有值，会把initial的值赋值给state
    第一次派发是在redux内部派发的
    store.dispatch({
      type:***
    })

    第一次派发传递的action.type不会和任何逻辑匹配，会将返回的state即是initial替换公共状态

  + 第二次派发正常执行 
*/

const reducer = function reducer(state = initial, action) {
  //state:存储STORE容器中的公共状态(最开始没有的时候，赋值初始状态值initial)
  //action:每一次基于dispatch派发的时候，传递进来的行为对象(要求必须具备type属性，存储派发的行为标识)
  //为了接下来的操作中，我们操作state，不会直接修改容器中的状态(要等到最后return的时候)，我们需要先克隆
  state = { ...state };
  //接下来我们需要基于派发的行为表示，修改STORE容器中的公共状态信息
  switch (action.type) {
    case "VOTE_SUP":
      state.supNum++;
      break;
    case "VOTE_OPP":
      state.oppNum++;
      break;
    default:
  }

  //return的内容，会整体替换STORE容器中的内容
  return state;
};

/* 创建公共容器 */
const store = createStore(reducer);

store.dispatch({
  type: "VOTE_SUP",
  step: 10,
});

export default store;
