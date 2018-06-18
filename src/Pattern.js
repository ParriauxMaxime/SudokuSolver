/***************************************
 ** O-rizon development
 ** Created by Maxime Parriaux
 ** 10/24/17 - 18:00
 ** Pattern.js
 ** 2017 - All rights reserved
 ***************************************/

class Pattern {
    constructor(matrix) {
        this.matrix = matrix
        this.height = matrix.length
        if (!matrix[0])
            throw 'Error'
        this.width = matrix[0].length
    }

    convertIndexToPos(i) {
        return {
            y: (i / this.height),
            x: (i % this.width)
        }
    }

    convertPosToIndex({ x, y }) {
        return (y * this.height + x)
    }
}

export const BigGrid = (matrix) => {
    return {
        topLeft: new TopLeftCorner(matrix),
        topRight: new TopRightCorner(matrix),
        bottomLeft: new BottomLeftCorner(matrix),
        bottomRight: new BottomRightCorner(matrix),
    }
}

class Corner extends Pattern {
    constructor(matrix) {
        super(matrix);
        this.finalStep = this.height / 2
        return this.runAnalyze()
    }

    findCorner() {
        return ([])
    }

    runAnalyze() {
        const corner = this.findCorner()
        return ([...corner])
    }
}

export class TopLeftCorner extends Corner {
    constructor(matrix) {
        super(matrix)
    }

    findCorner() {
        let tab = []

        for (let step = 0; step < this.finalStep; step++) {
            const nbSubStep = (step * 2 + 1)
            for (let subStep = 0; subStep <= nbSubStep; subStep++) {
                let x, y
                if (subStep < step) {
                    x = step
                }
                else {
                    x = subStep - step
                }
                if (subStep <= step) {
                    y = subStep
                }
                else {
                    y = step
                }
                if (this.matrix[y][x] === 255)
                    tab.push(this.convertPosToIndex({ x, y }))
                if (tab.length !== 0)
                    return tab
            }
        }
        return tab
    }
}

export class TopRightCorner extends Corner {
    constructor(matrix) {
        super(matrix)
    }

    findCorner() {
        let tab = []

        for (let step = 0; step < this.finalStep; step++) {
            const nbSubStep = (step * 2 + 1)
            for (let subStep = 0; subStep <= nbSubStep; subStep++) {
                let x, y
                if (subStep < step) {
                    x = this.width - 1 - step
                }
                else {
                    x = this.width - 1 - (subStep - step)
                }
                if (subStep <= step) {
                    y = subStep
                }
                else {
                    y = step
                }
                try {
                    if (this.matrix[y][x] === 255)
                        tab.push(this.convertPosToIndex({ x, y }))
                    if (tab.length !== 0)
                        return tab
                }
                catch (err) {
                    console.log(x, y)
                    throw err
                }
            }
        }
        return tab
    }
}

export class BottomLeftCorner extends Corner {
    constructor(matrix) {
        super(matrix)
    }

    findCorner() {
        let tab = []

        for (let step = 0; step < this.finalStep; step++) {
            const nbSubStep = (step * 2 + 1)
            for (let subStep = 0; subStep <= nbSubStep; subStep++) {
                let x, y
                if (subStep < step) {
                    x = step
                }
                else {
                    x = subStep - step
                }
                if (subStep <= step) {
                    y = this.height - 1 - subStep
                }
                else {
                    y = this.height - 1 - step
                }
                if (this.matrix[y][x] === 255)
                    tab.push(this.convertPosToIndex({ x, y }))
                if (tab.length !== 0)
                    return tab
            }
        }
        return tab
    }
}

export class BottomRightCorner extends Corner {
    constructor(matrix) {
        super(matrix)
    }

    findCorner(start = { x: 0, y: 0 }) {
        let tab = []

        for (let step = 0; step < this.finalStep; step++) {
            const nbSubStep = (step * 2 + 1)
            for (let subStep = 0; subStep <= nbSubStep; subStep++) {
                let x, y
                if (subStep < step) {
                    x = this.width - 1 - (step)
                }
                else {
                    x = this.width - 1 - (subStep - step)
                }
                if (subStep <= step) {
                    y = this.height - 1 - subStep
                }
                else {
                    y = this.height - 1 - step
                }
                if (this.matrix[y][x] === 255)
                    tab.push(this.convertPosToIndex({ x, y }))
                if (tab.length !== 0)
                    return tab
            }
        }
        return tab
    }
}