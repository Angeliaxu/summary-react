
import React from 'react';

class NotControllForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        alert(` A name was submitted: ${this.input.value}`);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={(input) => this.input = input}   defaultValue="Bob"/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
// 在React中 input为file是一个不受控组件，因此需要使用ref节点访问提交处理程序中的文件
export default class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        alert(`Selected file - ${this.fileInput.files[0].name}`)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload File:
                    <input type="file" ref={(input) => {this.fileInput = input}} />
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}
