import React, { Component } from 'react'
import { Button } from '@material-ui/core';

export default class ResetButton extends Component {
    render() {
        return (
            <Button children="Reset" variant="raised" onClick={this.props.onClick} />
        )
    }
}
