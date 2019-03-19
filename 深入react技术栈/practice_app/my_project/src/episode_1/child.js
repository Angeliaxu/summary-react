import React, { Component } from 'react';

export default class Child extends Component {
    // 声明props的默认值
    static defaultProps = {
        word: '我是子组件'
    }
    // 如果不写props，那么在constructor里面取this.props的值为undefined，props === this.props
    constructor(props) {
        super(props)
        console.log(props)
        // this.state = {
        //     name: props.word
        // }
    }
    change = () => {
        this.setState({
            name: {
                name: "石馨茹"
            }
        }) 
    }
    // 只有当props改变的时候才会触发次函数，参数是最新的props值
    componentWillReceiveProps(nextProps) {
        console.log(1111)
    }
    // props和state值改变的时候就触发此函数，默认返回true，表示渲染，false表示不渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.word === this.props.word) {
            return false
        }
        return true
    }
    componentDidUpdate() {
        console.log('更新完毕')
    }
    render() {
        return (
            <div>
                {/* <p>{this.props.word.name}</p> */}
                <button onClick={this.change}>子组件的按钮点击</button>
                {/* <p>{this.state}</p> */}
            </div>
        )
    }
}