/***************************************
 ** O-rizon development
 ** Created by Maxime Parriaux
 ** 10/23/17 - 17:32
 ** Resolver.js
 ** 2017 - All rights reserved
 ***************************************/

import React from 'react';
import { connect } from 'react-redux';
import { ImageAnalyzer } from './ImageAnalyzer';

export class Visualizer extends React.Component {
    constructor(props) {
        super(props)
        this.canvas = null;
        this.context = null;
    }

    componentDidMount() {
        const { data, height, width, pixels } = this.props;
        this.canvas.width = width
        this.canvas.height = height
        this.context = this.canvas.getContext('2d');
        const newImageData = this.context.createImageData(width, height)
        newImageData.data.set(pixels)
    }

    componentDidUpdate() {
        const { data, height, width, pixels } = this.props;
        this.canvas.width = width
        this.canvas.height = height
        this.context = this.canvas.getContext('2d');
        const newImageData = this.context.createImageData(width, height)
        newImageData.data.set(pixels)
        this.context.putImageData(newImageData, 0, 0)
    }

    render() {
        const { data, width, height } = this.props;
        console.info(height, width)
        return (
            <div className="full flexCol"
                id="Resolver">
                {
                    data &&
                    <canvas width={width} height={height}
                        ref={(ref) => { this.canvas = ref }}>
                    </canvas>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const width = state.tracker ? state.tracker.width : 300;
    const height = state.tracker ? state.tracker.height : 300;
    const pixels = state.tracker ? state.tracker.pixels : new Float32Array(width * height);
    return {
        data: state.tracker || { pixels, height, width },
        pixels,
        height,
        width,
    }
}

export default connect(mapStateToProps)(Visualizer)