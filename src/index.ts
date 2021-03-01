import { Canvas } from './classes/canvas';
import { Cube } from './classes/models/cube';
import { Scene } from './classes/scene';
import { multiply } from 'mathjs';
import { Matrices } from './classes/matrices';
import { IVertex } from './interfaces/index';

class Main {
    canvas: Canvas = new Canvas();
    scene: Scene;

    constructor() {
        this.scene = new Scene(this.canvas);
        this.scene.models.push(new Cube());
        this.setOnResize();
    }

    startAnimation(): void {
        this.canvas.clearCanvas();
        this.scene.drawVertices();
        const cube = this.scene.models[0];
        cube.vertices = cube.vertices.map(v => {
            const [x, y, z, w] = multiply(Matrices.getRotateYMTx(cube.angularVelocity), [v.x, v.y, v.z, v.w]).toArray();
            return { x, y, z, w } as IVertex;
        });
        window.requestAnimationFrame(this.startAnimation.bind(this));
    }

    setOnResize(): void  {
        window.onresize = () => {
            this.scene.setView();
            this.canvas.setCanvasSize();
        };
    }
}

window.onload = () => {
    new Main().startAnimation();
};
