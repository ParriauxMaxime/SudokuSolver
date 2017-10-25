/***************************************
 ** O-rizon development
 ** Created by Maxime Parriaux
 ** 10/23/17 - 17:32
 ** Resolver.js
 ** 2017 - All rights reserved
 ***************************************/

import React from 'react'
import {VerticalLinePattern} from './Pattern'

class ImageAnalizer {
    constructor(imgData) {
        this.pixels = imgData.pixels
        this.width = imgData.width
        this.height = imgData.height
        this.square()
        this.pixels = tracking.Image.sobel(this.pixels, this.width, this.height)
        this.matrix = this.createMatrix();
        this.rowsToLight = []
    }

    createMatrix() {
        let matrix = []
        for (let i = 0; i < this.width; i++) {
            matrix.push(new Uint8ClampedArray(this.height))
        }
        return matrix;
    }

    square() {
        if (this.width === this.height) {
            return
        }
        const max = this.height < this.width ? this.width : this.height
        //if resize on width
        if (max === this.width) {
            const toCut = (this.width - this.height)
            const toCutIsEven = toCut % 2 === 0
            const f = Math.floor(toCut / 2)
            const toRemove = toCutIsEven ? f : f + 1
            const toRemoveEnd = this.width - toRemove
            this.pixels = this.pixels.filter((e, i) => {
                if (((i / 4) % this.width) < toRemove || ((i / 4) % this.width) >= toRemoveEnd) {
                    return false
                }
                return true
            })
            this.width = this.height
        }
    }

    /**
     * Simplify the actual pixels array ([R, G, B, A , ...])
     * to ( [grey, grey, grey, ...]), and create rows and lines array
     */
    simplify() {
        const highContrast = color =>  color > 60 ? 255 : 0

        this.pixels = this.pixels.filter((e, i) => {
            if (i % 4 === 0) {
                return true;
            }
            return (false);
        })
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                this.matrix[i][j] = highContrast(this.pixels[(i * j) + i])
            }
        }
        this.pixels = this.pixels.map(highContrast);
    }

    createOutput() {
        let tmp = [];
        for (let i = 0; i < (this.width * this.height) ; i++) {
            const color = this.pixels[i]
            if (color === 255 || color === 0) {
                tmp.push(color)
                tmp.push(color)
                tmp.push(color)
                tmp.push(255)
            }
            else {
                tmp.push(200)
                tmp.push(72)
                tmp.push(199)
                tmp.push(255)
            }
        }
        this.pixels = new Uint8ClampedArray(tmp);
    }


    computeLine() {
        const pattern = new VerticalLinePattern(this.matrix);
        this.rowsToLight = pattern.runAnalyze();
        let j = 0;
        this.pixels = this.pixels.map((e, i) => {
            if (this.rowsToLight.indexOf((i  % this.height)) !== -1) {
                j++;
                return 80;
            }
            return e;
        })
        return true
    }

    run(cb) {
        this.simplify()
        const result = this.computeLine()
        this.createOutput()
        const analyze = {
            pixels: this.pixels,
            width : 480,
            height: 480,
            result: result,
        }
        cb(analyze)
    }
}

export class Resolver extends React.Component {
    constructor(props) {
        super(props)
        this.canvas = null
        this.analyzing = false
        this.imageAnalizer = null
        this.analyze = null
        this.height = props.height || 480
        this.width = props.width || 480
        this.state = {
            backgroundColor: 'white',
        }
    }

    componentWillUpdate(nextProps) {
        if (!this.analyzing && this.props.loweredImage !== nextProps.loweredImage && this.canvas) {
            this.setState({analyzing: true}, () => {
                this.imageAnalizer = new ImageAnalizer(nextProps.loweredImage)
                this.imageAnalizer.run(this.endAnalyze.bind(this))
            })
        }
    }

    endAnalyze(analyze) {
        const backgroundColor = analyze.result ? 'green' : 'red'
        this.setState({analyzing: false, analyze, backgroundColor}, () => {
            this.canvas.width = analyze.width
            this.canvas.height = analyze.height

            //CreateImageData
            const context = this.canvas.getContext('2d')
            const newImageData = context.createImageData(this.width, this.height)
            newImageData.data.set(analyze.pixels)
            //PutImage
            const offset = (this.width - analyze.width) / 2
            context.putImageData(newImageData, -offset, -offset, 0, 0, analyze.width, analyze.height)
        })
    }

    render() {
        return (
            <div className="full flexCol" id="Resolver"
                 style={{backgroundColor: this.state.backgroundColor}}>
                <h1>{this.props.title}</h1>
                {
                    this.props.loweredImage ?
                        <canvas width="300" height="300"
                                ref={(ref) => {this.canvas = ref}}>
                        </canvas> :
                        null
                }
            </div>
        )
    }
}