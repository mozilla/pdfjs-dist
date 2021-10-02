export class GenericL10n {
    constructor(lang: any);
    _lang: any;
    _ready: Promise<any>;
    getLanguage(): Promise<any>;
    getDirection(): Promise<any>;
    get(key: any, args?: null, fallback?: any): Promise<any>;
    translate(element: any): Promise<any>;
}
