export class BaseCanvasFactory {
    create(width: any, height: any): {
        canvas: void;
        context: any;
    };
    reset(canvasAndContext: any, width: any, height: any): void;
    destroy(canvasAndContext: any): void;
    /**
     * @private
     */
    private _createCanvas;
}
export class BaseCMapReaderFactory {
    constructor({ baseUrl, isCompressed }: {
        baseUrl?: null | undefined;
        isCompressed?: boolean | undefined;
    });
    baseUrl: any;
    isCompressed: boolean;
    fetch({ name }: {
        name: any;
    }): Promise<any>;
    /**
     * @private
     */
    private _fetchData;
}
export class BaseStandardFontDataFactory {
    constructor({ baseUrl }: {
        baseUrl?: null | undefined;
    });
    baseUrl: any;
    fetch({ filename }: {
        filename: any;
    }): Promise<any>;
    /**
     * @private
     */
    private _fetchData;
}
export class BaseSVGFactory {
    create(width: any, height: any): void;
    createElement(type: any): void;
    /**
     * @private
     */
    private _createSVG;
}
