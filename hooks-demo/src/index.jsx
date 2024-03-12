import React from 'react';
import ReactDOM from 'react-dom/client';
import Vote from './views/Vote'

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Vote />
  </ConfigProvider>
);

