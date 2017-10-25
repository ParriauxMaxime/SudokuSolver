/***************************************
 ** O-rizon development
 ** Created by Maxime Parriaux
 ** 10/24/17 - 18:00
 ** Pattern.js
 ** 2017 - All rights reserved
 ***************************************/


class Pattern {
    static horizontal = 0;
    static vertical = 1;

    constructor(matrix) {
        this.matrix = matrix
    }

    static sumMask(mask, matrix, i, j) {
        let sum = 0;
        for (let ix = 0; ix < mask.length; ix++) {
            for (let jx = 0; jx < mask[0].length; jx++) {
                const calcul = matrix[i + ix][j + jx] * mask[ix][jx];
                sum += calcul
            }
        }
        return sum;
    }

    runMask(mask, orientation) {
        const matrix = this.matrix
        const incrementI = mask.length, incrementJ = mask[0].length;
        let sums = []
        for (let i = 0; i < matrix.length - incrementI; i += incrementI) {
            let sum = 0
            for (let j = 0; j < matrix.length - incrementJ; j += incrementJ) {
                if (orientation === Pattern.vertical) {
                    sum += Pattern.sumMask(mask, matrix, i , j)
                }
            }
            sums.push({
                sum,
                row: i
            })
        }
        return sums
    }
}

export class VerticalLinePattern extends Pattern {
    constructor(matrix) {
        super(matrix)
        this.runAnalyze()
    }

    runAnalyze() {
        //On récupère les 10 meilleurs colonnes (index);
        return ([])
    }
}