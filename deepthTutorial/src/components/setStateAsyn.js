import React from 'react';

export default class App extends React.Component {
    state = {
      count: 0
    };
  
    componentDidMount() {
      // 生命周期中调用
      this.setState({ count: this.state.count + 1 });
      console.log("lifecycle: " + this.state.count);
      setTimeout(() => {
        // setTimeout中调用
        this.setState({ count: this.state.count + 1 });
        console.log("setTimeout: " + this.state.count);
      }, 1000);
      document.getElementById("div2").addEventListener("click", this.increment2);
    }
  
    increment = () => {
      //合成事件中调用
      this.setState({ count: this.state.count + 1 });
      console.log("react event: " + this.state.count);
      debugger
    };
  
    increment2 = () => {
      // 原生事件中调用
      this.setState({ count: this.state.count + 1 });
      console.log("dom event: " + this.state.count);
    };
  
    render() {
      return (
        <div className="App">
          <h2>couont: {this.state.count}</h2>
          <div id="div1" onClick={this.increment}>
            click me and count+1
          </div>
          <div id="div2">click me and count+1</div>
        </div>
      );
    }
  }
  