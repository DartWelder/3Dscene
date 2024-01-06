
declare module '*.obj' {
    // @ts-ignore
    import { IOBJ } from '../src/interfaces';

    const value: IOBJ;
    export default value;
}

