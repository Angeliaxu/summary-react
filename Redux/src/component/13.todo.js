import React from 'react';
import '../reducer';

//  reducer must be pure functions
export default class Todo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{padding: '50px'}}>
                <p>
                    <input id="name" type="text" />
                </p>
            </div>
        )
    }
}