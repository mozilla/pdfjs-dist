export type PDFPageViewOptions = {
    /**
     * - The viewer element.
     */
    container: HTMLDivElement;
    /**
     * - The application event bus.
     */
    eventBus: any;
    /**
     * - The page unique ID (normally its number).
     */
    id: number;
    /**
     * - The page scale display.
     */
    scale: number;
    /**
     * - The page viewport.
     */
    defaultViewport: any;
    /**
     * -
     * A promise that is resolved with an {@link OptionalContentConfig } instance.
     * The default value is `null`.
     */
    optionalContentConfigPromise?: Promise<any> | undefined;
    /**
     * - The rendering queue object.
     */
    renderingQueue: any;
    textLayerFactory: any;
    /**
     * - Controls if the text layer used for
     * selection and searching is created, and if the improved text selection
     * behaviour is enabled. The constants from {TextLayerMode} should be used.
     * The default value is `TextLayerMode.ENABLE`.
     */
    textLayerMode?: number | undefined;
    annotationLayerFactory: any;
    xfaLayerFactory: any;
    structTreeLayerFactory: any;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string | undefined;
    /**
     * - Turns on rendering of
     * interactive form elements. The default value is `true`.
     */
    renderInteractiveForms: boolean;
    /**
     * - 'canvas' or 'svg'. The default is 'canvas'.
     */
    renderer: string;
    /**
     * - Enables CSS only zooming. The default
     * value is `false`.
     */
    useOnlyCssZoom?: boolean | undefined;
    /**
     * - The maximum supported canvas size in
     * total pixels, i.e. width * height. Use -1 for no limit. The default value
     * is 4096 * 4096 (16 mega-pixels).
     */
    maxCanvasPixels?: number | undefined;
    /**
     * - Localization service.
     */
    l10n: any;
};
/**
 * @implements {IRenderableView}
 */
export class PDFPageView implements IRenderableView {
    /**
     * @param {PDFPageViewOptions} options
     */
    constructor(options: PDFPageViewOptions);
    id: number;
    renderingId: string;
    pdfPage: any;
    pageLabel: string | null;
    rotation: number;
    scale: number;
    viewport: any;
    pdfPageRotate: any;
    _optionalContentConfigPromise: Promise<any> | null;
    hasRestrictedScaling: boolean;
    textLayerMode: number | undefined;
    imageResourcesPath: string;
    renderInteractiveForms: boolean;
    useOnlyCssZoom: boolean;
    maxCanvasPixels: any;
    eventBus: any;
    renderingQueue: any;
    textLayerFactory: any;
    annotationLayerFactory: any;
    xfaLayerFactory: any;
    structTreeLayerFactory: any;
    renderer: string;
    l10n: any;
    paintTask: {
        promise: any;
        onRenderContinue(cont: any): void;
        cancel(): void;
    } | null;
    paintedViewportMap: WeakMap<object, any>;
    renderingState: number;
    resume: (() => void) | null;
    _renderError: any;
    annotationLayer: any;
    textLayer: any;
    zoomLayer: (Node & ParentNode) | null;
    xfaLayer: any;
    structTreeLayer: any;
    div: HTMLDivElement;
    setPdfPage(pdfPage: any): void;
    destroy(): void;
    /**
     * @private
     */
    private _renderAnnotationLayer;
    /**
     * @private
     */
    private _renderXfaLayer;
    /**
     * @private
     */
    private _resetZoomLayer;
    reset({ keepZoomLayer, keepAnnotationLayer, keepXfaLayer, }?: {
        keepZoomLayer?: boolean | undefined;
        keepAnnotationLayer?: boolean | undefined;
        keepXfaLayer?: boolean | undefined;
    }): void;
    loadingIconDiv: HTMLDivElement | undefined;
    update(scale: any, rotation: any, optionalContentConfigPromise?: any): void;
    /**
     * PLEASE NOTE: Most likely you want to use the `this.reset()` method,
     *              rather than calling this one directly.
     */
    cancelRendering({ keepAnnotationLayer, keepXfaLayer }?: {
        keepAnnotationLayer?: boolean | undefined;
        keepXfaLayer?: boolean | undefined;
    }): void;
    _onTextLayerRendered: any;
    cssTransform({ target, redrawAnnotationLayer, redrawXfaLayer, }: {
        target: any;
        redrawAnnotationLayer?: boolean | undefined;
        redrawXfaLayer?: boolean | undefined;
    }): void;
    get width(): any;
    get height(): any;
    getPagePoint(x: any, y: any): any;
    draw(): any;
    paintOnCanvas(canvasWrapper: any): {
        promise: any;
        onRenderContinue(cont: any): void;
        cancel(): void;
    };
    canvas: HTMLCanvasElement | undefined;
    outputScale: Object | undefined;
    paintOnSvg(wrapper: any): {
        promise: any;
        onRenderContinue(cont: any): void;
        cancel(): void;
    };
    svg: any;
    /**
     * @param {string|null} label
     */
    setPageLabel(label: string | null): void;
}
