### redux中间件
+ redux-logger每一次派发，在控制台输出派发日志，方便对redux的操作进行调试，输出的内容:派发之前的状态，派发的行为，派发后的状态
+ redux-thunk/redux-promise 实现异步派发,每一次派发的时候，需要传递给reducer的action对象中的内容，是需要异步获取的
+ redux-saga

#### redux-thunk原理
+ 首先方法执行返回一个函数(也是对象)，内部给函数设置一个type属性，属性值不会和reducer中的逻辑匹配
   第一次派发 dispatch(函数)
   type不会和reducer中的逻辑匹配，所以没u偶修改任何状态
+ 把返回的函数执行，把派发的方法dispatch传递给函数
  接下来我们在函数中，自己异步操作，当异步操作成功后我们自己在手动基于dispatch，进行派发即可

#### redux-promise原理
+ 首先方法执行返回一个函数(也是对象)，内部给函数设置一个type属性，属性值不会和reducer中的逻辑匹配
+ 把返回的函数执行，把派发的方法dispatch传递给函数
  接下来我们在函数中，自己异步操作，当异步操作成功后我们自己在手动基于dispatch，进行派发即可