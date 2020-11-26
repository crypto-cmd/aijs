export default class Matrix {
    constructor(dimension) {
        this.dimension = dimension;
        for (let i = 0; i < dimension.rows; i++) {
            Object.defineProperty(this, i, { value: [] });
            for (let j = 0; j < dimension.cols; j++) {
                Matrix.cast(this)[i].push(0);
            }
        }
    }
    /**
     *
     * @param num The number  to fill the matrix with
     * @returns {Matrix}
     */
    fill(num) {
        for (let i = 0; i < this.dimension.rows; i++) {
            for (let j = 0; j < this.dimension.cols; j++) {
                Matrix.cast(this)[i][j] = num;
            }
        }
        return this;
    }
    print() {
        console.log(this.toString());
    }
    toString() {
        let s = "[\n";
        for (let i = 0; i < this.dimension.rows; i++) {
            s += `  [${this[i].toString()}]\n`;
        }
        return s + "]";
    }
    static cast(matrix) {
        return matrix;
    }
    /**
     *
     * @param {(value: number, row: number, col: number) => number} f
     */
    map(f) {
        const clone = new Matrix(this.dimension);
        for (let i = 0; i < this.dimension.rows; i++) {
            for (let j = 0; j < this.dimension.cols; j++) {
                Matrix.cast(clone)[i][j] = f(Matrix.cast(this)[i][j], i, j);
            }
        }
        return clone;
    }
    static add(a, b) {
        if (a.dimension.rows != b.dimension.rows ||
            a.dimension.cols != b.dimension.cols)
            throw new Error(`Matrix addition of ${a.dimension} and ${b.dimension}is illegal!`);
        return new Matrix(a.dimension).map((_, i, j) => Matrix.cast(b)[i][j] + Matrix.cast(a)[i][j]);
    }
    static multiply(a, num) {
        return a.map((v) => v * num);
    }
    static subtract(a, b) {
        if (a.dimension.rows != b.dimension.rows ||
            a.dimension.cols != b.dimension.cols)
            throw new Error(`Matrix subtraction of ${a.dimension} and ${b.dimension} is illegal!`);
        return new Matrix(a.dimension).map((_, i, j) => Matrix.cast(b)[i][j] - Matrix.cast(a)[i][j]);
    }
    static hadamard(a, b) {
        if (a.dimension.rows != b.dimension.rows ||
            a.dimension.cols != b.dimension.cols)
            throw new Error(`Hadamard Multiplication of ${a.dimension} and ${b.dimension} is illegal!`);
        return new Matrix(a.dimension).map((_, i, j) => Matrix.cast(b)[i][j] * Matrix.cast(a)[i][j]);
    }
    static from(matrix) {
        let len;
        if (!matrix.every((arr) => len ? arr.length === len : !!(len = arr.length)))
            throw new Error("Matrix must have equivalent consistent columns");
        return new Matrix({ rows: matrix[0], cols: matrix[1] }).map((_, row, col) => matrix[row][col]);
    }
    static dot(a, b) {
        if (a.dimension.cols != b.dimension.rows)
            throw new Error(`Matrix Dot Multiplication ${a.dimension} and ${b.dimension}requires cols of A to be strictly equal to rows of B`);
        const k = a.dimension.cols;
        return new Matrix({
            rows: a.dimension.rows,
            cols: b.dimension.cols,
        }).map((_, row, col) => a[row][k] * b[k][col]);
    }
    static transpose(a) {
        return new Matrix({
            rows: a.dimension.cols,
            cols: a.dimension.rows,
        }).map((_, row, col) => a[col][row]);
    }
}
