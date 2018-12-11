import React from 'react'
import PropTypes from 'prop-types';

export default class CheckTypes extends React.Component{
    render() {
        return(
            <h1>Hello, {this.props.name}</h1>
        )
    }
}
console.log(PropTypes)
CheckTypes.propTypes = {
    name: PropTypes.string
}