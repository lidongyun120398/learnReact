// 对es6内置API做兼容处理
// 脚手架内部提供了react-app-polyfill

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>react</div>
  </React.StrictMode>
);

fetch("/jian/subscriptions/recommended_collections")
  .then(response => response.json())
  .then(value => console.log(value))

