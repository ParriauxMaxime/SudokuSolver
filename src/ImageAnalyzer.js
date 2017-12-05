/***************************************
 ** O-rizon development
 ** Created by Maxime Parriaux
 ** 12/5/17 - 17:45
 ** ImageAnalyzer.js
 ** 2017 - All rights reserved
 ***************************************/
import {BigGrid} from './Pattern'

export class ImageAnalyzer {
    constructor(imgData) {
        this.pixels = imgData.pixels
        this.width = imgData.width
        this.height = imgData.height
        this.square(300, 300)
        this.pixels = tracking.Image.sobel(this.pixels, this.width, this.height)
        this.matrix = this.createMatrix()
        this.rowsToLight = []
    }

    createMatrix() {
        let matrix = []
        for (let i = 0; i < this.width; i++) {
            matrix.push(new Uint8ClampedArray(this.height))
        }
        return matrix
    }

    square(size) {
        //if resize on width
        const toCut = (this.width - size)
        const toCutIsEven = toCut % 2 === 0
        const f = Math.floor(toCut / 2)
        const toRemove = toCutIsEven ? f : f + 1
        const toRemoveEnd = this.width - toRemove
        const toCutH = this.height - size
        const toCutIsEvenH = toCutH % 2 === 0
        const g = Math.floor(toCutH / 2)
        const toRemoveH = toCutIsEvenH ? g : g + 1
        const toRemoveEndH = this.height - toRemoveH
        let j = 0
        this.pixels = this.pixels.filter((e, i) => {
            const x = (i / 4) % this.width
            const y = (i / 4) / this.width
            if ((x >= toRemove && x < toRemoveEnd) &&
                (y >= toRemoveH && y < toRemoveEndH)) {
                j++
                return true
            }
            return false
        })
        this.height = size
        this.width = this.height
    }

    /**
     * Simplify the actual pixels array ([R, G, B, A , ...])
     * to ( [grey, grey, grey, ...]), and create rows and lines array
     */
    simplify() {
        const highContrast = color => color > 100 ? 255 : 0

        this.pixels = this.pixels.filter((e, i) => {
            if (i % 4 === 0) {
                return true
            }
            return (false)
        })
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                this.matrix[j][i] = highContrast(this.pixels[(j * this.width) + i])
            }
        }
        this.pixels = this.pixels.map(highContrast)
    }

    createOutput() {
        let tmp = []
        const addColor = (r, g = r, b = r) => {
            tmp.push(r);
            tmp.push(g);
            tmp.push(b);
            tmp.push(255)
        }
        for (let i = 0; i < (this.width * this.height); i++) {
            const color = this.pixels[i]
            switch (color) {
                case 0: {
                    addColor(0);
                    break;
                }
                case 1: {
                    addColor(255, 40, 40); //Red
                    break;
                }
                case 2: {
                    addColor(40, 255, 60); //Green
                    break;
                }
                case 3: {
                    addColor(0, 100, 255); //Blue
                    break;
                }
                case 4: {
                    addColor(227, 227, 50); //Yellow
                    break;
                }
                case 255: {
                    addColor(255); //White
                    break;
                }
            }
        }
        this.pixels = new Uint8ClampedArray(tmp)
    }

    colorPixel(pixels, diameter = 1, width = 0, color = 1) {
        pixels.forEach((pixel) => {
            this.pixels[pixel] = color
            for (let d = 1; d < diameter; d++) {
                //Array for cross
                const colors = [1, 2, 3, 4];
                [pixel - d, pixel + d, pixel - (this.width * d), pixel + (this.width * d)]
                    .forEach((e, i) => {
                        this.pixels[e] = colors[i]
                        for (let w = 0; w < width; w++) {
                            this.pixels[e + w] = colors[i]
                            this.pixels[e - w] = colors[i]
                            this.pixels[e - (this.width * w)] = colors[i]
                            this.pixels[e + (this.width * w)] = colors[i]
                        }
                    })
            }
        })
    }

    computePattern(pattern) {
        const result = pattern(this.matrix)
        this.colorPixel(result.topLeft, 10, 2)
        this.colorPixel(result.topRight, 10, 2);
        this.colorPixel(result.bottomLeft, 10, 2);
        this.colorPixel(result.bottomRight, 10, 2);
        return true
    }

    run(cb) {
        this.simplify()
        const result = this.computePattern(BigGrid)
        this.createOutput()
        const analyze = {
            pixels: this.pixels,
            width : this.width,
            height: this.height,
            result: result,
        }
        cb(analyze)
    }
}