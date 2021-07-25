export type PDFViewerOptions = {
    /**
     * - The container for the viewer element.
     */
    container: HTMLDivElement;
    /**
     * - The viewer element.
     */
    viewer?: HTMLDivElement | undefined;
    /**
     * - The application event bus.
     */
    eventBus: any;
    /**
     * - The navigation/linking service.
     */
    linkService: any;
    /**
     * - The download manager
     * component.
     */
    downloadManager?: any;
    /**
     * - The find controller
     * component.
     */
    findController?: any;
    /**
     * - The scripting manager
     * component.
     */
    scriptingManager?: any;
    /**
     * - The rendering queue object.
     */
    renderingQueue?: PDFRenderingQueue | undefined;
    /**
     * - Removes the border shadow around
     * the pages. The default value is `false`.
     */
    removePageBorders?: boolean | undefined;
    /**
     * - Controls if the text layer used for
     * selection and searching is created, and if the improved text selection
     * behaviour is enabled. The constants from {TextLayerMode} should be used.
     * The default value is `TextLayerMode.ENABLE`.
     */
    textLayerMode?: number | undefined;
    /**
     * - Path for image resources, mainly
     * mainly for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string | undefined;
    /**
     * - Enables rendering of
     * interactive form elements. The default value is `true`.
     */
    renderInteractiveForms?: boolean | undefined;
    /**
     * - Enables automatic rotation of
     * landscape pages upon printing. The default is `false`.
     */
    enablePrintAutoRotate?: boolean | undefined;
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
    /**
     * - Enable embedded script execution
     * (also requires {scriptingManager} being set). The default value is `false`.
     */
    enableScripting?: boolean | undefined;
};
/**
 * Simple viewer control to display PDF content/pages.
 * @implements {IRenderableView}
 */
export class BaseViewer implements IRenderableView {
    /**
     * @param {PDFViewerOptions} options
     */
    constructor(options: PDFViewerOptions);
    _name: string;
    container: HTMLDivElement;
    viewer: Element | null;
    eventBus: any;
    linkService: any;
    downloadManager: any;
    findController: any;
    _scriptingManager: any;
    removePageBorders: boolean;
    textLayerMode: number | undefined;
    imageResourcesPath: string;
    renderInteractiveForms: boolean;
    enablePrintAutoRotate: boolean;
    renderer: string;
    useOnlyCssZoom: boolean;
    maxCanvasPixels: number | undefined;
    l10n: any;
    enableScripting: boolean;
    defaultRenderingQueue: boolean;
    renderingQueue: PDFRenderingQueue | undefined;
    scroll: {
        right: boolean;
        down: boolean;
        lastX: any;
        lastY: any;
        _eventHandler: (evt: any) => void;
    };
    presentationModeState: number;
    _onBeforeDraw: ((evt: any) => void) | null;
    _onAfterDraw: any;
    get pagesCount(): number;
    getPageView(index: any): any;
    /**
     * @type {boolean} - True if all {PDFPageView} objects are initialized.
     */
    get pageViewsReady(): boolean;
    /**
     * @param {number} val - The page number.
     */
    set currentPageNumber(arg: number);
    /**
     * @type {number}
     */
    get currentPageNumber(): number;
    /**
     * @returns {boolean} Whether the pageNumber is valid (within bounds).
     * @private
     */
    private _setCurrentPageNumber;
    _currentPageNumber: any;
    /**
     * @param {string} val - The page label.
     */
    set currentPageLabel(arg: string | null);
    /**
     * @type {string|null} Returns the current page label, or `null` if no page
     *   labels exist.
     */
    get currentPageLabel(): string | null;
    /**
     * @param {number} val - Scale of the pages in percents.
     */
    set currentScale(arg: number);
    /**
     * @type {number}
     */
    get currentScale(): number;
    /**
     * @param val - The scale of the pages (in percent or predefined value).
     */
    set currentScaleValue(arg: string);
    /**
     * @type {string}
     */
    get currentScaleValue(): string;
    /**
     * @param {number} rotation - The rotation of the pages (0, 90, 180, 270).
     */
    set pagesRotation(arg: number);
    /**
     * @type {number}
     */
    get pagesRotation(): number;
    _pagesRotation: any;
    get firstPagePromise(): any;
    get onePageRendered(): any;
    get pagesPromise(): any;
    /**
     * @private
     */
    private get _viewerElement();
    /**
     * @private
     */
    private _onePageRenderedOrForceFetch;
    /**
     * @param pdfDocument {PDFDocument}
     */
    setDocument(pdfDocument: any): void;
    pdfDocument: any;
    _optionalContentConfigPromise: any;
    /**
     * @param {Array|null} labels
     */
    setPageLabels(labels: any[] | null): void;
    _pageLabels: any[] | null | undefined;
    _resetView(): void;
    _pages: any[] | undefined;
    _currentScale: any;
    _currentScaleValue: any;
    _buffer: PDFPageViewBuffer | undefined;
    _location: {
        pageNumber: any;
        scale: any;
        top: number;
        left: number;
        rotation: any;
        pdfOpenParams: string;
    } | null | undefined;
    _pagesRequests: WeakMap<object, any> | undefined;
    _firstPageCapability: any;
    _onePageRenderedCapability: any;
    _pagesCapability: any;
    _scrollMode: any;
    _spreadMode: any;
    _scrollUpdate(): void;
    _scrollIntoView({ pageDiv, pageSpot, pageNumber }: {
        pageDiv: any;
        pageSpot?: any;
        pageNumber?: any;
    }): void;
    _setScaleUpdatePages(newScale: any, newValue: any, noScroll?: boolean, preset?: boolean): void;
    /**
     * @private
     */
    private get _pageWidthScaleFactor();
    _setScale(value: any, noScroll?: boolean): void;
    /**
     * Refreshes page view: scrolls to the current page and updates the scale.
     * @private
     */
    private _resetCurrentPageView;
    /**
     * @param {string} label - The page label.
     * @returns {number|null} The page number corresponding to the page label,
     *   or `null` when no page labels exist and/or the input is invalid.
     */
    pageLabelToPageNumber(label: string): number | null;
    /**
     * @typedef ScrollPageIntoViewParameters
     * @property {number} pageNumber - The page number.
     * @property {Array} [destArray] - The original PDF destination array, in the
     *   format: <page-ref> </XYZ|/FitXXX> <args..>
     * @property {boolean} [allowNegativeOffset] - Allow negative page offsets.
     *   The default value is `false`.
     * @property {boolean} [ignoreDestinationZoom] - Ignore the zoom argument in
     *   the destination array. The default value is `false`.
     */
    /**
     * Scrolls page into view.
     * @param {ScrollPageIntoViewParameters} params
     */
    scrollPageIntoView({ pageNumber, destArray, allowNegativeOffset, ignoreDestinationZoom, }: {
        /**
         * - The page number.
         */
        pageNumber: number;
        /**
         * - The original PDF destination array, in the
         * format: <page-ref> </XYZ|/FitXXX> <args..>
         */
        destArray?: any[] | undefined;
        /**
         * - Allow negative page offsets.
         * The default value is `false`.
         */
        allowNegativeOffset?: boolean | undefined;
        /**
         * - Ignore the zoom argument in
         * the destination array. The default value is `false`.
         */
        ignoreDestinationZoom?: boolean | undefined;
    }): void;
    _updateLocation(firstPage: any): void;
    _updateHelper(visiblePages: any): void;
    update(): void;
    containsElement(element: any): boolean;
    focus(): void;
    get _isScrollModeHorizontal(): boolean;
    get _isContainerRtl(): boolean;
    get isInPresentationMode(): boolean;
    get isChangingPresentationMode(): boolean;
    get isHorizontalScrollbarEnabled(): boolean;
    get isVerticalScrollbarEnabled(): boolean;
    /**
     * Helper method for `this._getVisiblePages`. Should only ever be used when
     * the viewer can only display a single page at a time, for example in:
     *  - `PDFSinglePageViewer`.
     *  - `PDFViewer` with Presentation Mode active.
     */
    _getCurrentVisiblePage(): {
        views: never[];
        first?: undefined;
        last?: undefined;
    } | {
        first: {
            id: any;
            x: any;
            y: any;
            view: any;
        };
        last: {
            id: any;
            x: any;
            y: any;
            view: any;
        };
        views: {
            id: any;
            x: any;
            y: any;
            view: any;
        }[];
    };
    _getVisiblePages(): Object;
    /**
     * @param {number} pageNumber
     */
    isPageVisible(pageNumber: number): any;
    /**
     * @param {number} pageNumber
     */
    isPageCached(pageNumber: number): boolean;
    cleanup(): void;
    /**
     * @private
     */
    private _cancelRendering;
    /**
     * @param {PDFPageView} pageView
     * @returns {Promise} Returns a promise containing a {PDFPageProxy} object.
     * @private
     */
    private _ensurePdfPageLoaded;
    forceRendering(currentlyVisiblePages: any): boolean;
    /**
     * @param {HTMLDivElement} textLayerDiv
     * @param {number} pageIndex
     * @param {PageViewport} viewport
     * @param {boolean} enhanceTextSelection
     * @param {EventBus} eventBus
     * @returns {TextLayerBuilder}
     */
    createTextLayerBuilder(textLayerDiv: HTMLDivElement, pageIndex: number, viewport: any, enhanceTextSelection: boolean | undefined, eventBus: any): TextLayerBuilder;
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @param {AnnotationStorage} [annotationStorage] - Storage for annotation
     *   data in forms.
     * @param {string} [imageResourcesPath] - Path for image resources, mainly
     *   for annotation icons. Include trailing slash.
     * @param {boolean} renderInteractiveForms
     * @param {IL10n} l10n
     * @param {boolean} [enableScripting]
     * @param {Promise<boolean>} [hasJSActionsPromise]
     * @param {Object} [mouseState]
     * @returns {AnnotationLayerBuilder}
     */
    createAnnotationLayerBuilder(pageDiv: HTMLDivElement, pdfPage: any, annotationStorage?: any, imageResourcesPath?: string | undefined, renderInteractiveForms?: boolean, l10n?: any, enableScripting?: boolean | undefined, hasJSActionsPromise?: Promise<boolean> | undefined, mouseState?: Object | undefined): AnnotationLayerBuilder;
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @param {AnnotationStorage} [annotationStorage] - Storage for annotation
     *   data in forms.
     * @returns {XfaLayerBuilder}
     */
    createXfaLayerBuilder(pageDiv: HTMLDivElement, pdfPage: any, annotationStorage?: any): XfaLayerBuilder;
    /**
     * @param {PDFPage} pdfPage
     * @returns {StructTreeLayerBuilder}
     */
    createStructTreeLayerBuilder(pdfPage: any): StructTreeLayerBuilder;
    /**
     * @type {boolean} Whether all pages of the PDF document have identical
     *   widths and heights.
     */
    get hasEqualPageSizes(): boolean;
    /**
     * Returns sizes of the pages.
     * @returns {Array} Array of objects with width/height/rotation fields.
     */
    getPagesOverview(): any[];
    /**
     * @param {Promise<OptionalContentConfig>} promise - A promise that is
     *   resolved with an {@link OptionalContentConfig} instance.
     */
    set optionalContentConfigPromise(arg: Promise<any>);
    /**
     * @type {Promise<OptionalContentConfig | null>}
     */
    get optionalContentConfigPromise(): Promise<any>;
    /**
     * @param {number} mode - The direction in which the document pages should be
     *   laid out within the scrolling container.
     *   The constants from {ScrollMode} should be used.
     */
    set scrollMode(arg: number);
    /**
     * @type {number} One of the values in {ScrollMode}.
     */
    get scrollMode(): number;
    _updateScrollMode(pageNumber?: any): void;
    /**
     * @param {number} mode - Group the pages in spreads, starting with odd- or
     *   even-number pages (unless `SpreadMode.NONE` is used).
     *   The constants from {SpreadMode} should be used.
     */
    set spreadMode(arg: number);
    /**
     * @type {number} One of the values in {SpreadMode}.
     */
    get spreadMode(): number;
    _updateSpreadMode(pageNumber?: any): void;
    /**
     * @private
     */
    private _getPageAdvance;
    /**
     * Go to the next page, taking scroll/spread-modes into account.
     * @returns {boolean} Whether navigation occured.
     */
    nextPage(): boolean;
    /**
     * Go to the previous page, taking scroll/spread-modes into account.
     * @returns {boolean} Whether navigation occured.
     */
    previousPage(): boolean;
}
import { PDFRenderingQueue } from "./pdf_rendering_queue.js";
/**
 * @typedef {Object} PDFViewerOptions
 * @property {HTMLDivElement} container - The container for the viewer element.
 * @property {HTMLDivElement} [viewer] - The viewer element.
 * @property {EventBus} eventBus - The application event bus.
 * @property {IPDFLinkService} linkService - The navigation/linking service.
 * @property {DownloadManager} [downloadManager] - The download manager
 *   component.
 * @property {PDFFindController} [findController] - The find controller
 *   component.
 * @property {PDFScriptingManager} [scriptingManager] - The scripting manager
 *   component.
 * @property {PDFRenderingQueue} [renderingQueue] - The rendering queue object.
 * @property {boolean} [removePageBorders] - Removes the border shadow around
 *   the pages. The default value is `false`.
 * @property {number} [textLayerMode] - Controls if the text layer used for
 *   selection and searching is created, and if the improved text selection
 *   behaviour is enabled. The constants from {TextLayerMode} should be used.
 *   The default value is `TextLayerMode.ENABLE`.
 * @property {string} [imageResourcesPath] - Path for image resources, mainly
 *   mainly for annotation icons. Include trailing slash.
 * @property {boolean} [renderInteractiveForms] - Enables rendering of
 *   interactive form elements. The default value is `true`.
 * @property {boolean} [enablePrintAutoRotate] - Enables automatic rotation of
 *   landscape pages upon printing. The default is `false`.
 * @property {string} renderer - 'canvas' or 'svg'. The default is 'canvas'.
 * @property {boolean} [useOnlyCssZoom] - Enables CSS only zooming. The default
 *   value is `false`.
 * @property {number} [maxCanvasPixels] - The maximum supported canvas size in
 *   total pixels, i.e. width * height. Use -1 for no limit. The default value
 *   is 4096 * 4096 (16 mega-pixels).
 * @property {IL10n} l10n - Localization service.
 * @property {boolean} [enableScripting] - Enable embedded script execution
 *   (also requires {scriptingManager} being set). The default value is `false`.
 */
declare function PDFPageViewBuffer(size: any): void;
declare class PDFPageViewBuffer {
    /**
     * @typedef {Object} PDFViewerOptions
     * @property {HTMLDivElement} container - The container for the viewer element.
     * @property {HTMLDivElement} [viewer] - The viewer element.
     * @property {EventBus} eventBus - The application event bus.
     * @property {IPDFLinkService} linkService - The navigation/linking service.
     * @property {DownloadManager} [downloadManager] - The download manager
     *   component.
     * @property {PDFFindController} [findController] - The find controller
     *   component.
     * @property {PDFScriptingManager} [scriptingManager] - The scripting manager
     *   component.
     * @property {PDFRenderingQueue} [renderingQueue] - The rendering queue object.
     * @property {boolean} [removePageBorders] - Removes the border shadow around
     *   the pages. The default value is `false`.
     * @property {number} [textLayerMode] - Controls if the text layer used for
     *   selection and searching is created, and if the improved text selection
     *   behaviour is enabled. The constants from {TextLayerMode} should be used.
     *   The default value is `TextLayerMode.ENABLE`.
     * @property {string} [imageResourcesPath] - Path for image resources, mainly
     *   mainly for annotation icons. Include trailing slash.
     * @property {boolean} [renderInteractiveForms] - Enables rendering of
     *   interactive form elements. The default value is `true`.
     * @property {boolean} [enablePrintAutoRotate] - Enables automatic rotation of
     *   landscape pages upon printing. The default is `false`.
     * @property {string} renderer - 'canvas' or 'svg'. The default is 'canvas'.
     * @property {boolean} [useOnlyCssZoom] - Enables CSS only zooming. The default
     *   value is `false`.
     * @property {number} [maxCanvasPixels] - The maximum supported canvas size in
     *   total pixels, i.e. width * height. Use -1 for no limit. The default value
     *   is 4096 * 4096 (16 mega-pixels).
     * @property {IL10n} l10n - Localization service.
     * @property {boolean} [enableScripting] - Enable embedded script execution
     *   (also requires {scriptingManager} being set). The default value is `false`.
     */
    constructor(size: any);
    push: (view: any) => void;
    /**
     * After calling resize, the size of the buffer will be newSize. The optional
     * parameter pagesToKeep is, if present, an array of pages to push to the back
     * of the buffer, delaying their destruction. The size of pagesToKeep has no
     * impact on the final size of the buffer; if pagesToKeep has length larger
     * than newSize, some of those pages will be destroyed anyway.
     */
    resize: (newSize: any, pagesToKeep: any) => void;
    has: (view: any) => boolean;
}
import { TextLayerBuilder } from "./text_layer_builder.js";
import { AnnotationLayerBuilder } from "./annotation_layer_builder.js";
import { XfaLayerBuilder } from "./xfa_layer_builder.js";
import { StructTreeLayerBuilder } from "./struct_tree_layer_builder.js";
export {};
