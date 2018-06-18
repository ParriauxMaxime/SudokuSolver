import React, { Component } from 'react'
import { Button } from '@material-ui/core';

export default class AnalyzeButton extends Component {
    render() {
        return (
            <Button children="Analyze" variant="raised" color="primary" onClick={this.props.onClick} />
        )
    }
}
