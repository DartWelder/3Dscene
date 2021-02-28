import { Canvas } from './classes/canvas';

let canvas: Canvas = new Canvas();

window.onresize = () => {
    canvas = new Canvas();
};