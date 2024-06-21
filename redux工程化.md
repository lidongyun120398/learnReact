### redux工程化
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

### react-redux
+ react-redux最大的特点就是:让redux的操作在react项目中更简单一些
  + 主要是在组件中应用的时候更方便一些
   1. react-redux内部自己创建了上下文对象，并且我们可以把store放在上下文中，在组件中使用的时候，我们无需自己再获取上下文中的store，他可以直接帮我们获取到，直接使用即可
   2.  在组件中，想要获取公共状态信息进行绑定等，无需自己基于上下文对象获取store，也无需自己再基于getState获取公共状态，直接基于react-redux提供的connect方法，把公共状态信息进行绑定，即可直接使用。而且也不需要我们手动把让组件更新的方法放在事件池中，react-redux内部处理了
   
+ 由redux工程化变成react-redux的区别
  1. 删除ThemeContext文件,不再需要自己写上下文信息
  2. 在index.jsx中将原来的ThemeContext.Provider替换为Provider
  ```js
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Vote/>
    </Provider>
  </ConfigProvider>
  ```
  3. 在其他使用上下文以及自己加入事件池的地方使用connect创建上下文
  ```js
   connect(mapStateToProps, mapDispatchToProps)(要渲染的组件)
      //1.mapStateToProps: 可以获取到redux中的公共状态，把需要的信息作为属性，传递组件即可
      connect(state => {
          //state:存储redux容器中，所有模块的公共状态信息
          //返回对象中的信息，就是要作为属性传递给组件的信息
          return{
              supNum：state.vote.supNum
          }
      })(Vote)
      //2.mapDispatchToProps: 把redux容器中的dispatch方法，传递给组件，组件就可以调用dispatch方法，触发redux容器中的reducer方法
      connect(
        null,
        dispatch => {
          //dispatch:store.dispatch派发任务的方法

          //返回对象中的信息，会作为属性传递给组件
          return{
          }
        }
      )(Vote)
  ```
  + 在functional组件中
  ```js
  import { connect } from 'react-redux'

  const Vote = function Vote(props) {
    let {supNum, oppNum} = props
    return <div className="vote-box">
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{ supNum + oppNum }</span>
        </div>
        <VoteMain/>
        <VoteFooter/>
    </div>;
  };

  export default connect(state => state.vote)(Vote);
  ```
  + 在类组件中代码详情见VoteMain组件
  + dispatch
  ```js
  import action from '@/store/action'
  import { connect } from 'react-redux';


  const VoteFooter = function VoteFooter(props) {
      let { support, oppose } = props;
      return <div className="footer">
          <Button type="primary" onClick={support}>支持</Button>
          <Button type="primary" danger onClick={oppose}>反对</Button>
      </div>;
  };


  export default connect(
      null,
      //基于store中对action的封装，可以将整个dispatch替换成action.vote
      //就是前面提到的actionCreator
      action.vote


      //dispatch => {
      //    return {
      //        //返回相关的方法，作为属性传递给组件
      //        //组件内部执行方法的时候，基于dispatch完成任务的派发，派发夫人行为对象，基于action中封装的操作获取
      //        support: () => {
      //            dispatch(action.vote.support())
      //        },
      //        oppose: () => {
      //            dispatch(action.vote.oppose()) 
      //        }
      //    }
      //}
  )(VoteFooter);
  ```

  ### redux中存在的问题
  1. getState()获取到的state和原来的state共用一个内存地址，所以可以通过获取到的state去修改原始的state但是这样的操作是不规范的
  2. 把让组件更新的方法放入时间池中，每当有公共状态改变时，通知事件池中的所有方法执行，此操作:放置方法的时候，没有办法设置状态的依赖，这样，后期不论那个状态被修改，事件池中的所有方法都要执行(相关的组件都要进行更新)
  3. combineReducers中把所有的reducer方法都放在一个对象中，这样，当状态改变时，所有的reducer方法都要执行

  
