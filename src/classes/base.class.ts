import { matrix, multiply } from 'mathjs';
import { IPosition, IVertex } from '../interfaces/index';
import { Matrices } from './matrices';

export class Base implements IPosition {
    x: number;
    y: number;
    z: number;
    w: number;

    angularVelocity = 1;

    constructor(data: IPosition) {
        this.x = data?.x || 0;
        this.y = data?.y || 0;
        this.z = data?.z || 0;
    }

    private _vertices: IVertex[] = [];

    get vertices(): IVertex[] {
        return this._vertices;
    }

    set vertices(value: IVertex[]) {
        this._vertices = value;
    }
}
