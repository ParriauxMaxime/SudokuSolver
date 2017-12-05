/***************************************
 ** O-rizon development
 ** Created by Maxime Parriaux
 ** 10/24/17 - 00:24
 ** ImageParsing.js
 ** 2017 - All rights reserved
 ***************************************/

/*export class ImageParsing {
    constructor(props, vW, vH) {
        this.videoHeight = vH
        this.videoWidth = vW
        this.pixels = props.pixels
        this.width = props.width
        this.height = props.height
        this.img = null
        this.offset = 0;
    }

    square() {
        if (this.width === this.height) {
            return;
        }
        const max = this.height < this.width ? this.width : this.height;
        //if resize on width
        if (max === this.width) {
            const toCut = (this.width - this.height)
            const toCutIsEven = toCut % 2 === 0;
            const f = Math.floor(toCut / 2);
            const toRemove = toCutIsEven ?  f : f + 1
            const toRemoveEnd = this.width - toRemove;
            this.pixels = this.pixels.filter((e, i) => {
                if ( ((i / 4) % this.width) < toRemove || ((i / 4) % this.width) >= toRemoveEnd) {
                    return false
                }
                return true;
            })
            this.width = this.height;
        }
    }

    lowerResolution(width, height, cb) {
        this.square();
        if (this.height < height || this.width < width) {
            throw new Error("Cannot lower Resolution, width or height are already lower")
        }
        this.offset = (this.width - width) / 2
        context.putImageData(ourData, -this.offset, -this.offset, 0, 0, this.width, this.height)
        const newData = context.getImageData(0, 0, width, height)
        cb();
        return newData;
    }

    toGrayScale() {
        let tmp = []
        for (let i = 0; i < this.pixels.length; i += 4) {
            const [r, g, b, a ] = this.pixels.slice(i, i + 4)
            const avg = (21*r + 72*g + 7*b) / 100
            tmp.push(avg)
            tmp.push(avg)
            tmp.push(avg)
            tmp.push(a)
        }
        return tmp;
    }

    findPixelColor(position, cb) {
        if (!this.img) {
            this.transformIntoObject()
        }
        cb(this.img[position])
    }

    transformIntoObject() {
        let img = []
        for (let i = 0; i < this.pixels.length; i += 3) {
            img.push({
                r: this.pixels[i],
                g: this.pixels[i + 1],
                b: this.pixels[i + 2],
            })
        }
        this.img = img
    }
}
*/