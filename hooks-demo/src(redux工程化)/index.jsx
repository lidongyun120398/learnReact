import React from 'react';
import ReactDOM from 'react-dom/client';
import Vote from './views/Vote'


import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'

import store from './store'
import ThemeContext from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <ThemeContext.Provider 
      value={{
        store
      }}
    >
      <Vote/>
    </ThemeContext.Provider>
  </ConfigProvider>
);

/* 
  @1 创建全局公共的容器用来存储各组件需要的公共信息
    const store = createStore([reducer])

  @2 在组件内部，获取公用状态信息，然后渲染
  store.getState() => {supNum:...,oppNum:...}

  @3 把"让组件可以更新"的方法放在公共容器的事件池中 store.subscribe
      后期公共状态改了，事件池中的方法会按照顺序，依次执行，也就是让对应的组件也更新
      组件只要更新，就可以从store容器中获取最喜欢的状态渲染

  @4 创建容器的时候，需要传递reducer
    let inital = {} //初始状态值
    const reducer = function reducer(state,action){
      //state容器中的状态
      //action派发的行为对象(必须具备type属性)
      switch(action.type){
        //根据传递的type值不同，修改不同的状态信息
      }


      return state//返回的信息会替换store中的公共状态
    }

  @5 派发任务，通知reducer执行修改状态
    store.dispatch({
      type:xxx,
      ...
    }) //dispatch中传递的对象是传递给action的
    
    
  + 在创建的store容器中，存储两部分状态
   + 公共状态:各组件需要共享/通信的信息
   +事件池:存放一些方法(让组件可以更新的方法)
  特点:当公共状态一旦发生改变，会默认立即通知事件池中的方法执行，这些方法的执行，主要母的就是让指定的组件更新；而组件已更新，就可以获取最新的公共状态信息进行渲染

  修改公共容器中的状态不能直接修改
    + 基于dispatch派发，通知reducer执行
    + 在reducer中去实现状态的更新

  @6 为了在各个组件中，都可以把创建的store获取到，我们可以基于上下文的方案
    + 在index.jsx中，基于ThemeContext.Provider把创建的store放在上下文中
    + 因为所有组件最后都是在index.jsx中渲染，所有组件都可以理解为index.jsx的后代组件，基于上下文方案，获取在上下文中存储的store就可以了
*/




