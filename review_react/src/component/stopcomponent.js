import React from 'react';

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }
    return (
        <div>
            warning!
        </div>
    )
}
export default class  Stopcomponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWarning: true
        }
    }
    handleToggleClick() {
        this.setState((prevSate) => {
            console.log(prevSate)
            return ({
            showWarning: !prevSate.showWarning
        })})
    }
    render() {
        return (
            <div>
                <WarningBanner warn = {this.state.showWarning}/>
                <button onClick = {this.handleToggleClick.bind(this)}>{ this.state.showWarning ? 'hide' : 'show'}</button>
            </div>
        )
    }
}