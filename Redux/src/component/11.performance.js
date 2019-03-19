import React from 'react';

/* export default class Performace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }
    render() {
        return (
            <button color={this.props.color} onClick={() => this.setState(state => ({count: state.count + 1}))}>
                Count:{this.state.count}
            </button>
        )
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.count !== nextState.count) {
            return true;
        }
        if (this.props.color !== nextProps.color) {
            return true
        }
        return false
    }
} */

// purecomponent 可以做”浅比较"，因此当数据结构变得复杂的时候会引发问题
/* export default class Performace extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }
    render() {
        return (
            <button color={this.props.color} onClick={() => this.setState(state => ({count: state.count + 1}))}>
                Count:{this.state.count}
            </button>
        )
    }
} */

// 使用pureComponent值得注意的问题,下面ListOfWords不会更新
class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join(',')}</div>
    }
}

export default class WordAdder extends  React.Component {
    constructor(props) {
        super(props)
        this.state = {
            words: ['marklar']
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState((prevState) => ({
            words: [...prevState.words, 'marklar']
        }))
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>push单词</button>
                <ListOfWords words={this.state.words}/>
            </div>
        )
    }
}