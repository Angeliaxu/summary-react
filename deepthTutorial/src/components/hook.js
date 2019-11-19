import React, { useState, useEffect } from 'react';

export default function Example(props) {
  // children 有可能不是数组
  let { children } = props;
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  }, );
  // 相当于componentDidMount
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  }, []);
  React.Children.forEach(children, (thisArg, index) => {
    // console.log(thisArg);
    // console.log(index)
  })
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      {/* {props.children} */}
    </div>
  );
}
Example.defaultProps = {
  name: 'Stranger'
};