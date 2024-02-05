import React  from 'react';
import './Task.less';
import { Button, Popconfirm, Table, Tag, Modal, Form, Input, DatePicker, message } from 'antd';
import { getTaskList, addTask, removeTask, completeTask } from "@/api/index"

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

  // state = {
  //   tableData:[],
  //   tableLoading:false,
  //   modalVisible:false,
  //   confirmLoading:false,
  //   ruleForm:{
  //     task:'',
  //     time:''
  //   }
  // }

  state = {
    tableData:[],
    tableLoading:false,
    modalVisible:false,
    confirmLoading:false,
  }

  closeModal = () => {
    this.setState({
      modalVisible:false,
      confirmLoading:false
    })
    this.formIns.resetFields()
  }
  submit =async () => {
    try{
      await this.formIns.validateFields()
      let data = this.formIns.getFieldsValue()
      message.success("表单校验通过")
      this.setState({
        modalVisible:false
      })
    }catch(_){}
  }
  
  render(){
    let { tableData, tableLoading, modalVisible, confirmLoading } = this.state
    return <div className="task-box">
      {/*头部 */}
      <div className="header">
        <h2 className="title">TASK OA任务管理系统</h2>
        <Button type="primary" onClick={() => {
          this.setState({
            modalVisible:true
          })
        }}>新增任务</Button>
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
      <Modal title="新增任务窗口" 
            open={modalVisible} 
            confirmLoading={confirmLoading} 
            getContainer={false} 
            keyboard={false} 
            maskClosable={false}
            okText="确认提交"
            onCancel={this.closeModal}
            onOk={this.submit}>
          <Form ref={x => this.formIns = x} layout="vertical" initialValues={{ task: "", time: ""}}>
            {/* <Form.Item>
              <Input.TextArea rows={4} value={this.state.ruleForm.task} onChange={(ev) => {
                let target = ev.target,
                    text = target.value.trim();
                this.setState({
                  ruleForm:{
                    ...this.state.ruleForm,
                    task:text
                  }
                })
              }}></Input.TextArea>
            </Form.Item> */}

            <Form.Item label="任务描述" name="task" validateTrigger='onBlur' 
                      rules={[
                        { required: true,message: '任务描述是必填项'},
                        { min: 6, message:'输入的内容至少6位及以上'}
                      ]}>
              <Input.TextArea rows={4}></Input.TextArea>
            </Form.Item>

            {/* <Form.Item>
              <DatePicker showTime value={this.state.ruleForm.time} onChange={value => {
                //value：获取当前选中的日期(dayjs对象)
                this.setState({
                  ruleForm:{
                    ...this.state.ruleForm,
                    time:value
                    // time:value.format("YYYY-MM-DD HH:mm:ss")
                  }
                })
              }}/>
            </Form.Item> */}

            <Form.Item label="任务完成事件" name="time" validateTrigger='onBlur'  
                      rules={[{ required: true, message: "任务完成事件是必填项"}]}>
              <DatePicker showTime/>
            </Form.Item>
          </Form>
      </Modal>
      
    </div>
  }
}

export default Task;