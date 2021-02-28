import { IPosition, IVertex } from '../interfaces/index';

export class Obj implements IPosition {
    x: number;
    y: number;
    z: number;

    protected vertices: IVertex[];

    constructor(data: IPosition) {
        this.x = data?.x || 0;
        this.y = data?.y || 0;
        this.z = data?.z || 0;
    }
}