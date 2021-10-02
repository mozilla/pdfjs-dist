export class XfaLayer {
    static setupStorage(html: any, id: any, element: any, storage: any, intent: any): void;
    static setAttributes({ html, element, storage, intent, linkService }: {
        html: any;
        element: any;
        storage?: null | undefined;
        intent: any;
        linkService: any;
    }): void;
    static render(parameters: any): {
        textDivs: Text[];
    };
    /**
     * Update the xfa layer.
     *
     * @public
     * @param {XfaLayerParameters} parameters
     * @memberof XfaLayer
     */
    public static update(parameters: any): void;
}
