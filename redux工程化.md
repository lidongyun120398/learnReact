#### 1. 按照模块，把reducer进行单独管理每个模块都有自己的reducer，最后把所有的reducer进行合并，合并为一个，赋值给我们创建的store
```js
  import { combineReducers } from "redux";
  import voteReducer from "./voteReducer";
  import personalReducer from "./personalReducer";

  const reducer = combineReducers({
    vote: voteReducer,
    personal: personalReducer,
  });
  export default reducer;
```
+ 派发的操作不需要改动，每一次派发后，都会去所有reducer中进行匹配，用派发的行为标识和每个模块reducer中判断的行为标识进行比较。和谁匹配成功就执行谁的逻辑

#### 2. 每一次dispatch派发的时候都会去每个模块的reducer中找一遍，把所有和派发行为标识匹配的逻辑执行
+ 可能存在的问题: 团队协作开发的时候，因为开发的人多，最后很有可能派发的行为标识会有冲突
+ 所以我们一定要保证，不管那个模块，哪个组件，我们派发的行为标识，必须是唯一的
+ 基于"宏管理"(统一管理)，让所有行为标识，具有统一性
  1. 为了保证不冲突，我们一般都是这样命名: 模块名_派发的行为标识(大写)
  2. 变量和存储的值是一致的
  3. 所有需要派发的行为标识，都在这里定义
```js
//定义
export const VOTE_SUP = "VOTE_SUP";
export const VOTE_OPP = "VOTE_OPP";

export const PERSONAL_SUP = "PERSONAL_SUP";
export const PERSONAL_INFO = "PERSONAL_INFO";

//使用
import * as TYPES from "@/store/actions-types";

store.dispatch({
  type:TYPES.VOTE_SUP
})
```

#### 3. 把派发的行为对象，按模块来进行统一管理
+ 在store中创建actions来管理派发行为对象
  ```js
  import * as TYPES from "@/store/actions-types";
  const voteAction = {
    support() {
      return {
        type: TYPES.VOTE_SUP,
      };
    },
    oppose() {
      return {
        type: TYPES.VOTE_OPP,
      };
    },
  };
  export default voteAction;
  ```
+ 最后在actions的index.js中，把所有模块的actions进行统一管理
  ```js
  import voteAction from "./voteAction";
  import personalAction from "./personalAction";

  const actions = {
    vote: voteAction,
    personal: personalAction,
  };
  export default actions;
  ```
+ 在dispatch时使用
  ```js
  store.dispatch(action.vote.support())
  ```
此操作的意义，我们称之为创建actionCreator，在接下来处理react-redux的时候，会非常有用

#### combineReducers源码