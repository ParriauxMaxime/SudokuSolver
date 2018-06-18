// @flow

export type ImageData = {
    pixels: Float32Array,
    height: number,
    width: number
}

export type Bitmap = {
    pixels: Array<boolean>,
    height: number,
    width: number,
}

export class Converter {
    static ImageDataToBitmap(imageData: ImageData): Bitmap {
        //let assume the pixels imageDate is in the form : [ R, G, B , A, ...]
        const { pixels, height, width } = imageData;
        const normalizedLength = pixels.length / 4
        const bitmapPixels = new Array(normalizedLength);
        let j = 0;
        for (let i = 0; i < pixels.length; i += 4) {
            bitmapPixels[j] = pixels[i] === 0 ? false : true;
            j++;
        }
        return {
            pixels: bitmapPixels,
            height,
            width
        }
    }

    static BitmapToImageData(bitmap: Bitmap): ImageData {
        const { pixels, height, width } = bitmap;
        const pixelsImgData = new Float32Array(pixels.length * 4);
        for (let i = 0; i < pixels.length; i++) {
            for (let j = 0; j < 4; j++) {
                const value = pixels[i] ? 255 : 0;
                if (j === 3)
                    pixelsImgData.set([255], j + (i * 4));
                else if (j === 0)
                    pixelsImgData.set([value, value, value], (i * 4));
            }
        }
        return {
            pixels: pixelsImgData,
            width,
            height
        };
    }
}