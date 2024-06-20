import styled from "styled-components";

/* 
  基于"styled.标签名"这种方式编写需要的样式
    + 样式要写在"ES6模板字符串"中
    + 返回并且导出的结果是一个自定义组件
*/

export const NavBox = styled.nav`
  background-color: aliceblue;
  width: 300px;

  .title {
    font-size: 20px;
    color: red;
    &:hover {
      color: green;
    }
  }
`;
