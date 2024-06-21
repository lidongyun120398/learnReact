/* 
  实现redux部分源码
*/
import _ from './assets/utils'

export const createStore = function createStore(reducer){
  if(typeof reducer !== 'function') throw new TypeError('reducer is not a function')

  let state,//存放公共状态
      listeners = [];//事件池

  //获取公共状态的方法
  const getState = function getState(){
    //返回公共状态信息
    return state
  }

  //向事件池中加入让组件更新的方法
  const subscribe = function subscribe(listener){
    //规则校验
    if(typeof listener !== 'function') throw new TypeError('listener is not a function')
    //把传入的方法(让组件更新的方法)加入到时间池中(需要做去重处理)
    if(!listeners.includes(listener)){
      listeners.push(listener)
    }

    //返回一个从事件池中，移除方法的函数
    return function unsubscribe(){
      let index = listeners.indexOf(listener)
      listeners.splice(index,1)
    }
  }

  //派发任务通知REDUCER执行
  const dispatch = function dispatch(action){
    //检测是不是对象
    if(!_.isPlainObject(action)) throw new TypeError("action must be plain objects")
    if(typeof action.type === 'undefined') throw new TypeError("Actions may not have an undefined 'type' property")
    
    state = reducer(state,action)

    //状态更改，事件池中的方法执行
    listeners.forEach(listener => {
      listener();
    })

    return action;
  }

  /* redux内部默认会进行一次dispatch派发，目的:给公共容器中的状态赋值初始值 */
  dispatch({
    type:Symbol()
  })

  return {
    getState,
    subscribe,
    dispatch
  }
}