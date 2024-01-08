const DemoOne = function DemoOne(props){
  // 接收使用DemoOne的地方传入的属性
  //props传递过来的属性是只读的
  return <div className="demo-box">
    我是Demo-one
  </div>
}

//对象的规则设置：冻结，密封，不可拓展

export default DemoOne