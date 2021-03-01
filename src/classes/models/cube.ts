import { Base } from '../base.class';
import { NULL_POS } from '../../constants';
import { IPosition } from '../../interfaces/index';


export class Cube extends Base {
    side = 500;
    x: any;
    y: any;
    z: any;

    constructor(data: IPosition = NULL_POS) {
        super(data);
        this.x = data?.x || 0;
        this.y = data?.y || 0;
        this.z = data?.z || 0;

        let VERTICES_MAP = [0,1,1,1,1,0,0,0];
        const offset = 2
        for (let zo = 0; zo <= 1; zo++) {
            for (let i = 0; i < 8; i += offset) {
                const [xo, yo] = VERTICES_MAP.slice(i, i + 2);
                const [xs, ys, zs] = [xo, yo, zo].map(a => !!a ? 1 : -1)
                this.vertices = [
                    ...this.vertices, this.collectVerticesCoordinates(this.side, [this.x, this.y, this.z], [xs, ys, zs])
                ]
            }
        }
    }

    get edges() {
        const edges = [];
        for (let i = 0; i < 4; i++) {

            let { x, y, z } = this.vertices[i];
            // const index = i === 3 ? 0
            // 	: i === 7 ? 4
            // 		: i > 3 ? i + 1 : i + 1
            let { x: x1, y: y1, z: z1 } = this.vertices[i + 1];
            edges.push([[x, y, z], [x1, y1, z1]])
        }
        return edges;
    }

    collectVerticesCoordinates(hSide: number, zeroCoords: any[], indexies: number[]) {
        const values = zeroCoords.map((c, i) => {
            return c + hSide / 2 * indexies[i]
        })
        return {
            x: values[0],
            y: values[1],
            z: values[2],
            w: 1
        }
    }
}
