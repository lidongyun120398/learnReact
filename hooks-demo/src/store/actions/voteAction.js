/* vote板块要派发的行为对象管理
    voteAction包含好多方法，每一个方法执行，都返回要派发的行为对象
*/
import * as TYPES from "@/store/actions-types";
const delay = (interval = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};

//点击支持的时候，执行support：
// 立即执行voteAction.support,立即返回的是promise<pending>
// 我们派发的任务对象是哪个promise示例(不具备type属性，则报错)
const voteAction = {
  //redux-thunk中间件的语法
  support() {
    //这里的dispatch是redux-thunk中间件提供的，并且这个dispatch是经过改造的
    //改造后的dispatch，可以接受一个函数作为参数
    return async (dispatch) => {
      await delay();
      dispatch({
        type: TYPES.VOTE_SUP,
      });
    };
  },
  //reduxPromise写法
  async oppose() {
    await delay();
    return {
      type: TYPES.VOTE_OPP,
    };
  },
};
export default voteAction;
