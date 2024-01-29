import React  from 'react';
import './Task.less';
import { Button, Tag } from 'antd';

class Task extends React.Component{
  render(){
    return <div className="task-box">
      {/*头部 */}
      <div className="header">
        <h2 className="title">TASK OA任务管理系统</h2>
        <Button type="primary">新增任务</Button>
      </div>

      {/*标签 */}
      <div className="tag-box">
        <Tag color='#1677FF'>全部</Tag>
        <Tag>未完成</Tag>
        <Tag>已完成</Tag>
      </div>

      {/*表格 */}

      
      {/*对话框 && 表单 */}
      
      
    </div>
  }
}

export default Task;