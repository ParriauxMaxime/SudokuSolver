import React, { Component } from 'react'
import { Button } from '@material-ui/core';

export default class StopButton extends Component {
    render() {
        return (
            <Button children="Stop" variant="raised" color="primary" onClick={this.props.onClick} />
        )
    }
}
