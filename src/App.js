import React, { Component } from 'react'
import 'tracking/build/tracking-min'
import { Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux'

import Video from './Video'
import { Resolver } from './Resolver'
import ResetButton from './Button/Reset';
import StopButton from './Button/Stop';
import AnalyzeButton from './Button/Analyze';
import Debug from './Debug';
import { ActionCreator } from './store';
import Visualizer from './Visualizer';
import { CHANGE_TITLE, START_ANALYZE, CHANGE_LOWERED_IMAGE_DATA, RESET, STOP } from './reducers/system';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { onStart, onStop, onReset, status } = this.props;
        return (
            <div className="app">
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Video />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Visualizer />
                        {/*
                            <Resolver title={title}
                                status={status}
                                loweredImage={loweredImageData} />
                        */}
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <Grid container>
                                <Grid item xs={12}>
                                    <AnalyzeButton onClick={onStart} />
                                    <StopButton onClick={onStop} />
                                    <ResetButton onClick={onReset} />
                                </Grid>
                                <Grid>
                                    <Debug />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export const mapStateToProps = state => ({
    status: state.system.status,
})

export const mapDispatchToProps = {
    onStart: () => ActionCreator(START_ANALYZE),
    onStop: () => ActionCreator(STOP),
    onReset: () => ActionCreator(RESET),
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
