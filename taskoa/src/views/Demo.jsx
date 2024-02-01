import React from 'react'


class Demo extends React.Component{
  state = {
    email: ''
  }

  render () {
    return <>
      <input type="text" value={this.state.email} onChange={(ev) => {
        let target = ev.target,
            text = target.value.trim();
            this.setState({
              value:text
            })
      }}/>    
    </>
  }
}

export default Demo