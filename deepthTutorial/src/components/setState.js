import React from 'react';
import ReactDOM from 'react-dom';

class Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = { a: false, b: false };
    }
  
    render() {
      return <button onClick={this.handleClick}>click</button>
    }
  
    handleClick = () => {
      this.setState({ a: true });
      this.setState({ b: true });
      this.setState((state, props) => {
        console.log('state', state)
        // console.log(props);
      })
      console.log(this.state);
    }
    // componentDidUpdate(){
    //     console.log(this.state);
    // }
    componentDidMount() {
      debugger;
      React.Children.forEach(this.props.children, (child, indx)=> {
        console.log(indx, child);
      })
      //  const p = new Promise((resolve, reject) => {
      //      setTimeout(() => {
      //          resolve();
      //      }, 2000)
      //  })
      //  p.then(() => {
      //       // We're not in an event handler, so these are flushed separately.
      //       this.setState({a: true}); // Re-renders with {a: true, b: false }
      //       this.setState({b: true}); // Re-renders with {a: true, b: true } 
      //       console.log('同步or异步', this.state);
      //     });
        // p.then(() => {
        //     // We're not in an event handler, so these are flushed separately.
        //     ReactDOM.unstable_batchedUpdates(() => {
        //         this.setState({a: true}); // Doesn't re-render yet
        //         this.setState({b: true}); // Doesn't re-render yet
        //     });
        // });
    }
  }
export default Container;