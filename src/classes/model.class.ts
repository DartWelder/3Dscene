import { multiply } from 'mathjs';
import { IPosition, IRotateParams, ITranslateParams, Vertex } from '../interfaces/index';
import { Matrices } from './matrices';

export class Base implements IPosition {
    x = 0;
    y = 0;
    z = 0;
    w = 0;

    angularVelocity = 1;
    vertices: Vertex[] = [];
    indices: number[];

    constructor(obj: any, params?: { scale?: number, rotate?: IRotateParams, translate?: ITranslateParams }) {
        this.indices = obj.indices;
        for (const index of obj.indices) {
            let vertex: number[] = [...obj.vertices.slice(index * 3, index * 3 + 3), 1];
            if (params.translate) {
                vertex = multiply(Matrices.translate(params.translate), vertex).toArray() as Vertex;
            }
            if (params.scale) {
                vertex = multiply(Matrices.scaleMTx(params.scale), vertex).toArray() as Vertex;
            }
            if (params.rotate) {
                vertex = multiply(Matrices.rotate(params.rotate), vertex).toArray() as Vertex;
            }

            this.vertices.push(vertex);
        }
    }

    rotate(params: IRotateParams): void {
        const rotatedVertices: Vertex[] = [];
        for (const vertex of this.vertices) {
            const point = multiply(Matrices.rotate(params), vertex).toArray();
            rotatedVertices.push(point as Vertex);
        }
        this.vertices = rotatedVertices;
    }
}
