import { Matrix, matrix, multiply } from 'mathjs';
import { fromEvent, throttleTime } from '../../node_modules/rxjs';
import { Vertex } from '../interfaces';
import { Utils } from '../utils';
import { Canvas } from './canvas';
import { Matrices } from './matrices';
import { Base } from './model.class';
import model from './models/deer.obj';

export class Scene {
    fovX = Utils.getRadiansByDegrees(90);
    fovY = Utils.getRadiansByDegrees(90);
    zFar = -5000;
    zNear = 0;
    cnv: Canvas;
    ctx: CanvasRenderingContext2D;
    view: Matrix;
    model: Base;

    constructor(cnv: Canvas) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.setView();
        this.setListeners();
        console.log('%c  model  ', 'color: green; background: #222; font-size: 22px;', model)
        this.model = new Base(model, { scale: 10, rotate: { z: 180 }, translate:  { y: -100 } });
    }

    get projection(): Matrix {
        return matrix([
            [1 / Math.tan(this.fovX / 2), 0, 0, 0],
            [0, 1 / Math.tan(this.fovY / 2), 0, 0],
            [0, 0, -2 / (this.zFar - this.zNear), -((this.zFar + this.zNear) / (this.zFar - this.zNear))],
            [0, 0, -1, 0],
        ]);
    }

    drawFrame(): void {
        this.cnv.clearCanvas();
        this.model.rotate({ y: 1 });
        // this.drawVertices();
        this.drawTriangles();
    }

    drawTriangles(): void {
        for (let i = 0; i < this.model.indices.length; i += 3) {
            const triangleVertices = [];
            for (let j = 0; j < 3; j++) {
                const vertex = this.model.vertices[i + j];
                const [x1, y1, z1, w1] = multiply(multiply(this.projection, this.view), vertex).toArray() as Vertex;
                triangleVertices.push([(x1 / w1 + 1) / 2 * this.cnv.w, (y1 / w1 + 1) / 2 * this.cnv.h]);
            }
            this.ctx.beginPath();
            this.ctx.fillStyle = this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = .3,
            this.ctx.moveTo(triangleVertices[0][0], triangleVertices[0][1]);
            this.ctx.lineTo(triangleVertices[1][0], triangleVertices[1][1])
            this.ctx.lineTo(triangleVertices[2][0], triangleVertices[2][1])
            this.ctx.stroke();
            this.ctx.closePath();
        }

    }

    drawVertices(): void {
        for (const vertex of this.model.vertices) {
            const [x1, y1, z1, w1] = multiply(multiply(this.projection, this.view), vertex).toArray() as Vertex;
            const [xe, ye] = [(x1 / w1 + 1) / 2 * this.cnv.w, (y1 / w1 + 1) / 2 * this.cnv.h];
            this.ctx.beginPath();
            this.ctx.fillStyle = this.ctx.strokeStyle = 'white';
            this.ctx.fillRect(xe, ye, 1, 1);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    setView(): void {
        this.view = Matrices.getView(this.cnv.w, this.cnv.h, this.zFar, this.zNear);
    }

    private setListeners(): void {
        fromEvent<MouseEvent>(document, 'mousemove')
            .pipe(throttleTime(30))
            .subscribe((event) => {
                if (event.buttons === 1) {
                    this.model.rotate({ x: -event.movementX, y: -event.movementY})
                }

            });
    }
}
