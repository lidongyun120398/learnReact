import React from "react"

class Demo extends React.Component{
  render(){
    return <div>
    <button className="demo" onClick={() => {
      console.log("1")
    }}></button>
  </div>
  }
}

let root = ducument.querySelector("#root")
root.addEventListener('click',(ev) => {
  Demo.onClick = () => {console.log("1")}

  const path = ev.composedPath()
})

#root.addEventListener('click',() => {},true)
