import React,{ useState } from 'react'
import { Button } from 'antd'

/* 

*/

const Demo1 = function Demo1(){
  let n = 0

  return <div className='demo'>
    <span className="num">{ n }</span>
    <Button type='primary' size='small' click={() => {
      n += 10;
    }}></Button>
  </div>
}

export default Demo1