import React from 'react';

export default class NotUseES6 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h1>Hello, {this.props.name}</h1>
    }
}
