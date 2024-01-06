export interface IPosition {
    x: number;
    y: number;
    z: number;
    w: number;
}

// tslint:disable-next-line:no-empty-interface
export type Vertex = number[];

export interface IOBJ {
    vertices: number[];
    zzz: any;
}

export interface IRotateParams {
    x?: number;
    y?: number;
    z?: number
}

export interface ITranslateParams extends IRotateParams {}
