import { Canvas } from './classes/canvas';
import { Scene } from './classes/scene';
import './styles/styles.sass';

class Main {
    canvas: Canvas = new Canvas();
    scene: Scene;

    constructor() {
        this.scene = new Scene(this.canvas);
        this.setOnResize();
    }

    startAnimation(): void {
        this.canvas.clearCanvas();
        this.scene.drawFrame()
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
