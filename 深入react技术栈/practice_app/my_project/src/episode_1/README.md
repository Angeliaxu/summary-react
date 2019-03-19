## 关于props、state、生命周期函数
### props

在constructor中如果不传入props，那么在constructor中使用this.props是undefined  
在constructor中传入props后，props === this.props。  
在组件当中定义static defaultProps来初始化reactprops的初始默认值，静态方法也使用static来声明。

问题1:什么情况下，修改子组件的props会引起父组件的变化？

------
### 生命周期函数
> 挂载阶段  
1.  constructor
2.  componentWillMount
3.  render
4.  componentDidMount：可以获取真正的DOM元素
5.  componentWillUnmount  
> 更新阶段  
1.  componentWillReciveProps: 当props更新的时候触发，接受一个参数，nextProps
2.  shouldComponentUpdata：当props和state更新的时候触发，接受两个参数，nextProps和nextState，通过比较更新后的props或者state与当前的props或者state来判断返回true或者false，返回true表示支持当前组件更新，返回false表示阻止当前组件更新（优化)，接受两个参数 nextProps，nextState
3.  componentWillUpdate：接受两个参数 nextProps，nextState
4.  render
5.  componentDidUpdate：接受两个参数 prevProps，prevState，可以获取真正的DOM元素  
---
### ReactDOM下的三个方法
>1. findDOMNode  
>2. render
>3. unmountComponentAtNode：进行卸载的一些操作  
_______                                                                          
### Ref
> React 16.3版本之前的ref使用回调函数来获取，之后的使用React.createRef()。ref只针对class声明的组件管用，对于函数式组件不起作用（函数式组件没有实例)。把ref的callback写在组件行内，有一个缺点：在更新的时候会执行两次callback，第一次是null第二次是ref指向的DOM节点。最好的方式是在class内声明（constructor方法内）。ref更老的方法还有使用字符串的，但是这种方法官方不推荐使用，或许以后这种方式会被移除。 
1.  ref forwarding是什么，待深入研究？