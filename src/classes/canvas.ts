export class Canvas {
    readonly cnv: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private w: number;
    private h: number;

    constructor() {
        this.cnv = document.createElement('canvas');
        this.ctx = this.cnv.getContext('2d');
        document.body.appendChild(this.cnv);
        this.setCanvasSize();
    }

    setCanvasSize(): void {
        this.w = this.cnv.width = innerWidth;
        this.h = this.cnv.height = innerHeight;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.w, this.h)
    }
}
