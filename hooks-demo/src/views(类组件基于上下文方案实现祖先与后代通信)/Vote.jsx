import React from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from "../ThemeContext";

/* 
    祖先组件和后代通信:
        @1 在src目录下创建ThemeContext.js来创建上下文对象
        @2 让祖先组件Vote，具备状态和修改状态的方法，同时还需要把这些信息，存储到上下文中
        @3 基于上下文对象中，提供的Provider组件，用来：
          + 向上下文中存储信息：value属性指定的值就是要存储的信息
          + 当祖先组件更新，render重新执行，会把最新的状态值，再次存储到上下文对象中
        @4 在后代组件中获取上下文信息
          + 方案一: 
            @1 导入创建的上下文对象
            @2 给类组件设置静态私有属性 contextType = 上下文对象; this.context属性上，存储了上下文中的所有信息
            @3 从this.context中获取需要的信息即可
          + 方案二:
            @1 导入上下文对象
            return <ThemeContext.Consumer>
              {context => {
                // context包含上下文所有信息
                return 渲染的视图
              }}
            </ThemeContext.Consumer>
*/

class Vote extends React.Component {
    state = {
        supNum: 10,
        oppNum: 5
    }

    //设置为箭头函数:不论方法在哪执行的，方法中的this永远都是Vote父组件的实例
    change = (type) => {
        const { supNum, oppNum } = this.state
        if(type === 'sup'){
            this.setState({supNum: supNum + 1})
            return
        }
        this.setState({oppNum: oppNum + 1})
    }


    render() {
        const { supNum, oppNum } = this.state
        return <ThemeContext.Provider value={{
          supNum,
          oppNum,
          change:this.change
        }}>
          <div className="vote-box">
            <div className="header">
                <h2 className="title">React是很棒的前端框架</h2>
                <span className="num">{supNum + oppNum}</span>
            </div>
            <VoteMain supNum={supNum} oppNum={oppNum}/>
            <VoteFooter change={this.change}/>
          </div>;
        </ThemeContext.Provider>
    }
}

export default Vote;