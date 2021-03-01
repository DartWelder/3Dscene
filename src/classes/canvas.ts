export class Canvas {
    readonly cnv: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    w: number;
    h: number;

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

    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }
}
