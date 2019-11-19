## React合成事件与原生事件使用注意点
>  React自带事件合成系统,和原生的DOM事件系统是不一样的。注意不要将原生事件和React合成事件混用，React的自带合成事件里面阻止冒泡（外层事件是由原生事件绑定）并不能阻止原生事件。相反，原生事件阻止冒泡是可以阻止React合成事件的。切记原生和合成事件不要混用。并且React的合成事件没有实现事件捕获阶段，仅仅支持了事件冒泡阶段。  
-----
## 受控组件和非受控组件
> 受控组件  
受控组件是指在input、textarea、select的等表单上添加value属性和事件回调函数。value通过state来控制.React是单向数据流，绑定事件回调函数实现数据双向绑定。

> 非受控组件  
非受控组件就是指表单的value不受state控制，直接访问元素节点获取value值。
-----
## 样式处理
> React 老版本提供了一个classSet的插件，现在是把这个插件给去除了，使用了一个classnames库。

> CssModules 实现模块化，可以在webpack中css-loader设置modules选项，通过在react中使用es6语法导入css模块，实现css局部化。在css中定义的class相当于使用:local(class名)实现局部化，如果想要实现全局化可以使用:global(class名)或者:global{多个class名}

> Class命名技巧：BEM  
> 1. block：对应模块名，dialog
> 2. element: 对应模块中的节点名，Confirm Button
> 3. Modifer: 对应节点相关的状态，如disabled和highlight
> BEM最终得到的class名为dialog_confirm-button--heighlight  
----
## 组件件的通信
### 父组件向子组件通信、子组件向父组件通信  
> 父组件通过props向子组件通信，子组件可以通过利用事件回调和自定义事件机智与父组件通信。