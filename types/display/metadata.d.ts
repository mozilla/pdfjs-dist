export class Metadata {
    constructor(data: any);
    _metadataMap: Map<any, any>;
    _repair(data: any): any;
    _parse(xmlDocument: any): void;
    get(name: any): any;
    getAll(): any;
    has(name: any): boolean;
}
