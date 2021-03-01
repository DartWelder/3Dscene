import { Matrix, matrix } from 'mathjs';

export class Matrices {

    static getView( w: number, h: number, zFar: number, zNear: number): Matrix {
        return matrix([
            [1 /  w, 0, 0, 0],
            [0, 1 /  h, 0, 0],
            [0, 0, (2 / (zFar - zNear)), -((zFar + zNear) / (zFar - zNear))],
            [0, 0, 0, 1]
        ]);
    }

    static getRotateYMTx(velocity: number): Matrix {
        const cos = Math.cos(velocity * (Math.PI / 180));
        const sin = Math.sin(velocity * (Math.PI / 180));
        return matrix([
            [cos,  0, sin, 0],
            [0, 1, 0, 0],
            [-sin, 0, cos, 0],
            [0, 0, 0, 1],
        ]);
    }
}
