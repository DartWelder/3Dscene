import { Matrix, matrix, multiply, re } from 'mathjs';
import { IRotateParams, ITranslateParams } from '../interfaces';

export class Matrices {

    static getView( w: number, h: number, zFar: number, zNear: number): Matrix {
        return matrix([
            [1 /  w, 0, 0, 0],
            [0, 1 /  h, 0, 0],
            [0, 0, (2 / (zFar - zNear)), -((zFar + zNear) / (zFar - zNear))],
            [0, 0, 0, 1]
        ]);
    }

    static getRotateXMTx(velocity: number): Matrix {
        const cos = Math.cos(velocity * (Math.PI / 180));
        const sin = Math.sin(velocity * (Math.PI / 180));
        return matrix([
            [1,  0, 0, 0],
            [0, cos, -sin, 0],
            [0, sin, cos, 0],
            [0, 0, 0, 1],
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

    static getRotateZMTx(velocity: number): Matrix {
        const cos = Math.cos(velocity * (Math.PI / 180));
        const sin = Math.sin(velocity * (Math.PI / 180));
        return matrix([
            [cos,  -sin, 0, 0],
            [sin, cos, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]);
    }

    static rotate(params: IRotateParams): Matrix {
        let result = matrix([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]);
        for (const [axis, angle] of Object.entries(params)) {
            switch (axis) {
                case 'x':
                    result = multiply(Matrices.getRotateXMTx(angle), result);
                    break;
                case 'y':
                    result = multiply(Matrices.getRotateYMTx(angle), result);
                    break;
                case 'z':
                    result = multiply(Matrices.getRotateZMTx(angle), result);
                    break;
            }
        }
        return result;
    }

    static scaleMTx(value: number): Matrix {
        return matrix([
            [value, 0, 0, 0],
            [0, value, 0, 0],
            [0, 0, value, 0],
            [0, 0, 0,     1],
        ]);
    }

    static translate({ x, y, z }: ITranslateParams): Matrix {
        return matrix([
            [1, 0, 0, x || 0],
            [0, 1, 0, y || 0],
            [0, 0, 1, z || 0],
            [0, 0, 0,      1]
        ])
    }
}
