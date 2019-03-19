import React from 'react'

export default class UseReactAndOriginalEvent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.button = React.createRef()
    }
    handleClick = (e) => {
        // 使用react的stopPropagation能阻止react的冒泡，不能阻止原生事件的冒泡。使用原生的冒泡可以阻止react的冒泡
        e.stopPropagation();
        let { active } = this.state;
        this.setState({
            active: !active
        })
    }
    componentDidMount() {
        document.body.addEventListener('click', e => {
            console.log(e.target)
            if (e.target && e.target === this.button.current) {
                return;
            }
            this.setState({
                active: false
            })
        })
    }
    componentWillUnmount() {
        document.removeEventListener('click')
    }
    render() {
        return (
            <div>
                {/* 此事件会冒泡到body */}
                <button className="code" onClick={this.handleClick} ref={this.button}>二维码</button>
                <div
                    style={{ display:this.state.active ? 'block' : 'none' }}
                >
                   <p>lalalalallallal</p>
                </div>
            </div>
        )
    }
}