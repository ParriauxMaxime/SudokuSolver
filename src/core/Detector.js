import { ImageData, Bitmap, Converter } from "./Converter";

export class Detector {
    height: number;
    width: number;
    imageData: ImageData;
    bitmap: Bitmap;
    cachedHorizontalBitmap: Array = [];
    cachedVerticalBitmap: Array = [];

    constructor(imageData: ImageData) {
        this.imageData = imageData;
        this.width = imageData.width;
        this.height = imageData.height;
        this.bitmap = Converter.ImageDataToBitmap(imageData);
    }

    extractPattern(pattern: Pattern) {

        return []
    }

    getBitmap(): Bitmap {
        return this.bitmap;
    }

    crop(x: number, y: number, width: number, height: number): Bitmap {
        const initHeight = this.bitmap.height;
        const initWidth = this.bitmap.width;
        const { pixels } = this.bitmap;
        let newBitmap = new Array(width * height);
        if (x + height > initHeight || y + width > initWidth) {
            throw Error('Crop failed');
        }
        else {
            let a = 0;
            for (let j = y; j < y + height; j++) {
                for (let i = x; i < x + width; i++) {
                    newBitmap[a] = pixels[(j * initWidth) + i];
                    a++
                }
            }
        }
        return {
            height,
            width,
            pixels: newBitmap
        }
    }

}