/***************************************
 ** O-rizon development
 ** Created by Maxime Parriaux
 ** 10/23/17 - 17:32
 ** Resolver.js
 ** 2017 - All rights reserved
 ***************************************/

import React from 'react'
import { ImageAnalyzer } from './ImageAnalyzer'

export class Resolver extends React.Component {
    constructor(props) {
        super(props)
        this.canvas = null
        this.analyzing = false
        this.imageAnalyzer = null
        this.analyze = null
        this.height = props.height || 480
        this.width = props.width || 480
    }

    componentWillUpdate(nextProps) {
        if (!this.analyzing && this.props.loweredImage !== nextProps.loweredImage && this.canvas && nextProps.status) {
            this.setState({ analyzing: true }, () => {
                this.imageAnalyzer = new ImageAnalyzer(nextProps.loweredImage)
                this.imageAnalyzer.run(this.endAnalyze.bind(this))
            })
        }
    }

    endAnalyze(analyze) {
        const backgroundColor = analyze.result ? 'green' : 'red'
        this.setState({ analyzing: false, analyze, backgroundColor }, () => {
            this.canvas.width = analyze.width
            this.canvas.height = analyze.height

            //CreateImageData
            const context = this.canvas.getContext('2d')
            const newImageData = context.createImageData(analyze.width, analyze.height)
            newImageData.data.set(analyze.pixels)
            //PutImage
            const offset = (this.width - analyze.width) / 2
            context.putImageData(newImageData, 0, 0, 0, 0, analyze.width, analyze.height)
        })
    }

    render() {
        const { title } = this.props;
        return (
            <div className="full flexCol"
                id="Resolver">
                <h1>{this.props.title}</h1>
                <div className="echelle"></div>
                {
                    this.props.loweredImage ?
                        <canvas width="300" height="300"
                            ref={(ref) => { this.canvas = ref }}>
                        </canvas> :
                        null
                }
            </div>
        )
    }
}