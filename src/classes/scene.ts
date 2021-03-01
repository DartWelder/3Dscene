import { Matrix, matrix, multiply } from 'mathjs';
import { Utils } from '../utils';
import { Canvas } from './canvas';
import { Base } from './base.class';
import { Matrices } from './matrices';

export class Scene {
    fovX = Utils.getRadiansByDegrees(90);
    fovY = Utils.getRadiansByDegrees(90);
    zFar = -5000;
    zNear = 0;
    cnv: Canvas;
    ctx: CanvasRenderingContext2D;
    view: Matrix;
    models: Base[] = [];


    constructor(cnv: Canvas) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.setView();
    }

    get projection(): Matrix {
        return matrix([
            [1 / Math.tan(this.fovX / 2), 0, 0, 0],
            [0, 1 / Math.tan(this.fovY / 2), 0, 0],
            [0, 0, -2 / (this.zFar - this.zNear), -((this.zFar + this.zNear) / (this.zFar - this.zNear))],
            [0, 0, -1, 0],
        ]);
    }

    drawVertices() {
        for (const model of this.models) {
            for (const vertex of model.vertices) {
                const { x, y, z } = vertex;
                const points = [x, y, z, 1]   // multiply([x, y, z, 1], [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
                const [x1, y1, z1, w1] = multiply(multiply(this.projection, this.view), points).toArray() as number[];
                const [xe, ye] = [(x1 / w1 + 1) / 2 * this.cnv.w, (y1 / w1 + 1) / 2 * this.cnv.h];
                this.ctx.beginPath();
                this.ctx.fillStyle = this.ctx.strokeStyle = 'red';
                this.ctx.arc(xe, ye, 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }

    setView(): void {
        this.view = Matrices.getView( this.cnv.w, this.cnv.h, this.zFar, this.zNear);
    }
}
