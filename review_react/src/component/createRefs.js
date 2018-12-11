import React  from 'react';

export default class CreateRefs extends React.Component{
    constructor(props) {
        super(props)
        this.myRefs = React.createRef();
    }
    render() {
        return(
            <div style={{padding:'50px'}}>
                <input ref={this.myRefs}/>
            </div>
        )
    }
    componentDidMount() {
        this.myRefs.current.focus()
    }
}