// 封装一个对象迭代方法：基于传统的for...in循环，性能较差，即会迭代共有的也会迭代私有的，且只能迭代可枚举的非Symbol类型的属性

//获取当前对象所有私有属性：let keys = Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))
//也可以基于Es6中的Reflect.ownKeys()代替上诉操作
const each = function each(obj, callback) {
  if (obj === null || typeof obj !== "object") {
    throw new TypeError("obj is not object");
  }
  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function");
  }
  let keys = Reflect.ownKeys(obj);
  keys.forEach((key) => {
    let value = obj[key];
    callback(value, key);
  });
};

// createElement创建虚拟DOM对象

// ele：ele 参数必须是一个有效的 React 组件类型，例如一个字符串标签名（如 'div' 或 'span'），或一个 React 组件（一个函数式组件、一个类式组件，或者是一个特殊的组件如 Fragment）。
// props：props 参数必须是一个对象或 null。如果你传入 null，它会被当作一个空对象。创建的 React 元素的 props 与这个参数相同。注意，props 对象中的 ref 和 key 比较特殊，它们 不会 作为 element.props.ref 和 element.props.key 出现在创建的元素 element 上，而是作为 element.ref 和 element.key 出现。
// 可选 ...children：零个或多个子节点。它们可以是任何 React 节点，包括 React 元素、字符串、数字、portal、空节点（null、undefined、true 和 false），以及 React 节点数组。
export function createElement(ele, props, ...children) {}

//render：把虚拟DOM变为真实DOM
export function render(virtualDOM, element) {}
