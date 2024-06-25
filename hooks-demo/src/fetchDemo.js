/* 
向服务器发送数据请求的方案
  1. XMLHttpRequest
    + ajax
    + axios：第三方库，对XMLHttpRequest的封装(基于promise进行封装)
  2. fetch
    ES6内置的API，本身基于promise，用全新的方案实现客户端和服务器端的数据请求
    不兼容ie 机制完善度不如XMLHttpRequest，(例如设置超时就需要用到Promise.race来协助)
  3. 其他方案，主要是跨域为主
    + jsonp
    + postMessage
    + 利用img的src实现数据埋点和上报

  在客户端和服务器通信中，只要客户端设置了cookie，在每一次请求的时候，默认就会在请求头中，基于cookie字段，把本地设置的cookie信息，传递给服务器

  fetch配置项：
    + method：请求方式，默认是GET
    + mode：请求模式，no-cors,*cors,same-origin
    + cache:缓存模式 (*default, no-cache, reload, force-cache)
    + credentials：请求凭证(是否携带cookie) (include,*same-origin,omit)
      fetch默认情况下，跨域请求中，是不允许携带资源凭证的，只有同源下才允许
        include：同源和跨域下都可以
        same-origin：同源下可以
        omit：不允许携带资源凭证
    + headers：请求头，普通对象/Headers实例
      自定义请求头信息
    + body：设置请求主体信息
      只适用于POST系列请求
      body内容的格式有要求的，并且需要指定Content-Type请求头信息
       + JSON字符串 application/json
       '{"name":"xxx","age:14"}'
       + URLENCODED字符串 表单数据格式 application/x-www-form-urlencoded
       'xxx=xxx&xxx=xxx'
       + 普通字符串 text/plain
       + FormData对象 multipart/form-data
         主要运用在文件上传(或者表单提交)的操作中
         let form = new FormData();
         form.append('name','xxx');
        + 二进制或者Buffer等格式
        + Blob对象   
*/

/* 
Headers类：头处理类(请求头或响应头)
  + Headers.prototype
    + append(key,value) 新增头信息
    + delete(key) 删除头信息
    + forEach(callback) 迭代获取所有头信息
    + get(key) 获取某一项信息
    + has(key) 判断是否存在某一项信息
    + set(key,value) 设置某一项信息
*/
// let hd = new Headers();

// hd.append("name", "ldy");

// hd.forEach((value, key) => {
//   console.log(key, value);
// });

/* 
  服务器返回的response对象(Response类的实例)
  私有属性：
    + body 响应主体(他是一个ReadableStream可读流)
    + headers 响应头信息（Headers类的实例）
    + status/statusText 响应状态码和状态描述
*/

// fetch("/api/getTaskList", {
//   headers: hd,
// })
//   .then((response) => {
//     // 进入THEN中的时候，不一定是请求成功(因为状态码可能是各种情况)
//     let { headers, status, statusText } = response;

//     if (/^(2|3)\d{2}$/.test(status)) {
//       return response.json();
//     }

//     return Promise.reject(response);
//   })
//   .then((value) => {
//     console.log("最终的处理结果，", value);
//   })
//   .catch((err) => {
//     //会有不同的失败情况
//     //1. 服务器没有返回任何信息
//     //2. 状态码不对
//     //3. 数据转换失败
//     console.log(err);
//   });
import qs from "qs";

document.body.addEventListener("click", function () {
  fetch("/api/addTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify({
      task: "fetch",
      time: "2024",
    }),
  })
    .then((response) => {
      let { status } = response;

      if (/^(2|3)\d{2}$/.test(status)) {
        return response.json();
      }

      return Promise.reject(response);
    })
    .then((value) => {
      console.log("最终的处理结果，", value);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* fetch的请求中断 */
let ctrol = new AbortController();
fetch("/api/getTaskList", {
  signal: ctrol.signal,
})
  .then((response) => {
    let { status } = response;

    if (/^(2|3)\d{2}$/.test(status)) return response.json();

    return Promise.reject(response);
  })
  .then((value) => {
    console.log("最终的处理结果：", value);
  })
  .catch((err) => {
    console.log(err);
  });

// 请求中断
ctrol.abort();
