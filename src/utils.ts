import { IPosition, IVertex } from './interfaces/index';

export class Utils {
    static buildCube(pos: IPosition): IVertex[] {
        const verticesMap = '01111000';
        const vertices = [];
        const offset = 2;
        for (let zo = 0; zo <= 1; zo++) {
            for (let i = 0; i < verticesMap.length; i += offset) {
                const [xo, yo] = verticesMap.slice(i, i + offset);
                const [xs, ys, zs] = [Number(xo), Number(yo), zo].map(a => !!a ? 1 : -1);
                vertices.push(
                    this.collectCoordinates(1, [pos.x, pos.y, pos.z, 1], [xs, ys, zs])
                );
            }
        }
        return vertices;
    }

    static getRadiansByDegrees(angle) {
        return angle * Math.PI / 180;
    }
}
