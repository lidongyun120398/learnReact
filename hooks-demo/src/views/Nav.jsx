import React from 'react'
// import './Nav.less'
import { NavBox } from './NavStyle'

const Nav = function Nav(){
  return <NavBox>
    <h2 className="title">购物商城</h2>
    <div className="list">
      <a href="">首页</a>
      <a href="">秒杀</a>
      <a href="">我的</a>
    </div>
  </NavBox>
}

export default Nav