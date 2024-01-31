import React  from 'react';
import './Task.less';
import { Button, Popconfirm, Table, Tag } from 'antd';

//对日期处理的方法
const zero = function zero(text){
  text = String(text)
  return text.length < 2 ? "0" + text : text
}
const formatTime = function formatTime(time){
  let arr = time.match(/\+d/g),
    [_,month,day,hours = "00", minutes = "00"] = arr 
    return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`
}

class Task extends React.Component{
  columns = [{
    title:"编号",
    dataIndex:'id',
    align:"center",
    width:"8%"
  },
  {
    title:"任务描述",
    dataIndex:'task',
    width:"50%"
  },
  {
    title:"状态",
    dataIndex:'state',
    align:"center",
    width:"10%",
    //有多少行render就会执行多少次
    //text 当前单元格数据
    //record 这一行的完整数据(对象)
    // 函数返回的值就是单元格最后渲染的内容
    render:text => +text === 1 ? "未完成" : "已完成"
  },
  {
    title:"完成时间",
    dataIndex:'time',
    align:"center",
    width:"15%",
    render:( _, record ) => {
      let { state, time, complete } = record
      if( +state === 2 ) time = complete
      return formatTime(time)
    }
  },
  {
    title:"操作",
    render:(_,record) => {
      let { state } = record
      return <>
        <Popconfirm title="您确定要删除此任务么?" onConfirm={() => {}}>
          <Button type="link">删除</Button>
        </Popconfirm>

        {+state !== 2 ? <Popconfirm title="您确定要把此任务设置为完成吗?" onConfirm={() => {}}>
          <Button type="link">完成</Button>
        </Popconfirm> : null}
      </>
    }
  }]

  state = {
    tableData:[],
    tableLoading:false
    
  }
  
  render(){
    let { tableData, tableLoading } = this.state
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
      <Table dataSource={tableData} columns={this.columns} loading={tableLoading} pagination={false} rowKey="id"/>
      
      {/*对话框 && 表单 */}
      
      
    </div>
  }
}

export default Task;