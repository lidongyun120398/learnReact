import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './views/Demo3(useState执行时机)'
import Vote from './views/Vote'

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    {/* <Vote title="React学好需要JS功底"/> */}
    <Demo />
  </ConfigProvider>
);

