export type PDFPageProxy = import("../src/display/api").PDFPageProxy;
export type PageViewport = import("../src/display/display_utils").PageViewport;
export type AnnotationLayerBuilder = import("./annotation_layer_builder").AnnotationLayerBuilder;
export type AnnotationEditorLayerBuilder = import("./annotation_editor_layer_builder").AnnotationEditorLayerBuilder;
export type EventBus = import("./event_utils").EventBus;
export type StructTreeLayerBuilder = any;
export type TextHighlighter = import("./text_highlighter").TextHighlighter;
export type TextLayerBuilder = import("./text_layer_builder").TextLayerBuilder;
export type RenderingStates = any;
export type XfaLayerBuilder = import("./xfa_layer_builder").XfaLayerBuilder;
/**
 * @interface
 */
export class IDownloadManager {
    /**
     * @param {string} url
     * @param {string} filename
     */
    downloadUrl(url: string, filename: string): void;
    /**
     * @param {Uint8Array} data
     * @param {string} filename
     * @param {string} [contentType]
     */
    downloadData(data: Uint8Array, filename: string, contentType?: string | undefined): void;
    /**
     * @param {HTMLElement} element
     * @param {Uint8Array} data
     * @param {string} filename
     * @returns {boolean} Indicating if the data was opened.
     */
    openOrDownloadData(element: HTMLElement, data: Uint8Array, filename: string): boolean;
    /**
     * @param {Blob} blob
     * @param {string} url
     * @param {string} filename
     */
    download(blob: Blob, url: string, filename: string): void;
}
/**
 * @interface
 */
export class IL10n {
    /**
     * @returns {Promise<string>} - Resolves to the current locale.
     */
    getLanguage(): Promise<string>;
    /**
     * @returns {Promise<string>} - Resolves to 'rtl' or 'ltr'.
     */
    getDirection(): Promise<string>;
    /**
     * Translates text identified by the key and adds/formats data using the args
     * property bag. If the key was not found, translation falls back to the
     * fallback text.
     * @param {string} key
     * @param {Object | null} [args]
     * @param {string} [fallback]
     * @returns {Promise<string>}
     */
    get(key: string, args?: Object | null | undefined, fallback?: string | undefined): Promise<string>;
    /**
     * Translates HTML element.
     * @param {HTMLElement} element
     * @returns {Promise<void>}
     */
    translate(element: HTMLElement): Promise<void>;
}
/**
 * @interface
 */
export class IPDFAnnotationEditorLayerFactory {
    /**
     * @typedef {Object} CreateAnnotationEditorLayerBuilderParameters
     * @property {AnnotationEditorUIManager} [uiManager]
     * @property {HTMLDivElement} pageDiv
     * @property {PDFPageProxy} pdfPage
     * @property {IL10n} l10n
     * @property {AnnotationStorage} [annotationStorage] - Storage for annotation
     *   data in forms.
     */
    /**
     * @param {CreateAnnotationEditorLayerBuilderParameters}
     * @returns {AnnotationEditorLayerBuilder}
     */
    createAnnotationEditorLayerBuilder({ uiManager, pageDiv, pdfPage, l10n, annotationStorage, }: {
        uiManager?: any;
        pageDiv: HTMLDivElement;
        pdfPage: PDFPageProxy;
        l10n: IL10n;
        /**
         * - Storage for annotation
         * data in forms.
         */
        annotationStorage?: any;
    }): AnnotationEditorLayerBuilder;
}
/**
 * @interface
 */
export class IPDFAnnotationLayerFactory {
    /**
     * @typedef {Object} CreateAnnotationLayerBuilderParameters
     * @property {HTMLDivElement} pageDiv
     * @property {PDFPageProxy} pdfPage
     * @property {AnnotationStorage} [annotationStorage] - Storage for annotation
     *   data in forms.
     * @property {string} [imageResourcesPath] - Path for image resources, mainly
     *   for annotation icons. Include trailing slash.
     * @property {boolean} renderForms
     * @property {IL10n} l10n
     * @property {boolean} [enableScripting]
     * @property {Promise<boolean>} [hasJSActionsPromise]
     * @property {Object} [mouseState]
     * @property {Promise<Object<string, Array<Object>> | null>}
     *   [fieldObjectsPromise]
     * @property {Map<string, HTMLCanvasElement>} [annotationCanvasMap] - Map some
     *   annotation ids with canvases used to render them.
     */
    /**
     * @param {CreateAnnotationLayerBuilderParameters}
     * @returns {AnnotationLayerBuilder}
     */
    createAnnotationLayerBuilder({ pageDiv, pdfPage, annotationStorage, imageResourcesPath, renderForms, l10n, enableScripting, hasJSActionsPromise, mouseState, fieldObjectsPromise, annotationCanvasMap, }: {
        pageDiv: HTMLDivElement;
        pdfPage: PDFPageProxy;
        /**
         * - Storage for annotation
         * data in forms.
         */
        annotationStorage?: any;
        /**
         * - Path for image resources, mainly
         * for annotation icons. Include trailing slash.
         */
        imageResourcesPath?: string | undefined;
        renderForms: boolean;
        l10n: IL10n;
        enableScripting?: boolean | undefined;
        hasJSActionsPromise?: Promise<boolean> | undefined;
        mouseState?: Object | undefined;
        fieldObjectsPromise?: Promise<{
            [x: string]: Object[];
        } | null> | undefined;
        /**
         * - Map some
         * annotation ids with canvases used to render them.
         */
        annotationCanvasMap?: Map<string, HTMLCanvasElement> | undefined;
    }): AnnotationLayerBuilder;
}
/** @typedef {import("../src/display/api").PDFPageProxy} PDFPageProxy */
/** @typedef {import("../src/display/display_utils").PageViewport} PageViewport */
/** @typedef {import("./annotation_layer_builder").AnnotationLayerBuilder} AnnotationLayerBuilder */
/** @typedef {import("./annotation_editor_layer_builder").AnnotationEditorLayerBuilder} AnnotationEditorLayerBuilder */
/** @typedef {import("./event_utils").EventBus} EventBus */
/** @typedef {import("./struct_tree_builder").StructTreeLayerBuilder} StructTreeLayerBuilder */
/** @typedef {import("./text_highlighter").TextHighlighter} TextHighlighter */
/** @typedef {import("./text_layer_builder").TextLayerBuilder} TextLayerBuilder */
/** @typedef {import("./ui_utils").RenderingStates} RenderingStates */
/** @typedef {import("./xfa_layer_builder").XfaLayerBuilder} XfaLayerBuilder */
/**
 * @interface
 */
export class IPDFLinkService {
    /**
     * @type {number}
     */
    get pagesCount(): number;
    /**
     * @param {number} value
     */
    set page(arg: number);
    /**
     * @type {number}
     */
    get page(): number;
    /**
     * @param {number} value
     */
    set rotation(arg: number);
    /**
     * @type {number}
     */
    get rotation(): number;
    /**
     * @param {boolean} value
     */
    set externalLinkEnabled(arg: boolean);
    /**
     * @type {boolean}
     */
    get externalLinkEnabled(): boolean;
    /**
     * @param {string|Array} dest - The named, or explicit, PDF destination.
     */
    goToDestination(dest: string | any[]): Promise<void>;
    /**
     * @param {number|string} val - The page number, or page label.
     */
    goToPage(val: number | string): void;
    /**
     * @param {HTMLAnchorElement} link
     * @param {string} url
     * @param {boolean} [newWindow]
     */
    addLinkAttributes(link: HTMLAnchorElement, url: string, newWindow?: boolean | undefined): void;
    /**
     * @param dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
    getDestinationHash(dest: any): string;
    /**
     * @param hash - The PDF parameters/hash.
     * @returns {string} The hyperlink to the PDF object.
     */
    getAnchorUrl(hash: any): string;
    /**
     * @param {string} hash
     */
    setHash(hash: string): void;
    /**
     * @param {string} action
     */
    executeNamedAction(action: string): void;
    /**
     * @param {number} pageNum - page number.
     * @param {Object} pageRef - reference to the page.
     */
    cachePageRef(pageNum: number, pageRef: Object): void;
    /**
     * @param {number} pageNumber
     */
    isPageVisible(pageNumber: number): void;
    /**
     * @param {number} pageNumber
     */
    isPageCached(pageNumber: number): void;
}
/**
 * @interface
 */
export class IPDFStructTreeLayerFactory {
    /**
     * @typedef {Object} CreateStructTreeLayerBuilderParameters
     * @property {PDFPageProxy} pdfPage
     */
    /**
     * @param {CreateStructTreeLayerBuilderParameters}
     * @returns {StructTreeLayerBuilder}
     */
    createStructTreeLayerBuilder({ pdfPage }: {
        pdfPage: PDFPageProxy;
    }): any;
}
/**
 * @interface
 */
export class IPDFTextLayerFactory {
    /**
     * @typedef {Object} CreateTextLayerBuilderParameters
     * @property {HTMLDivElement} textLayerDiv
     * @property {number} pageIndex
     * @property {PageViewport} viewport
     * @property {boolean} [enhanceTextSelection]
     * @property {EventBus} eventBus
     * @property {TextHighlighter} highlighter
     */
    /**
     * @param {CreateTextLayerBuilderParameters}
     * @returns {TextLayerBuilder}
     */
    createTextLayerBuilder({ textLayerDiv, pageIndex, viewport, enhanceTextSelection, eventBus, highlighter, }: {
        textLayerDiv: HTMLDivElement;
        pageIndex: number;
        viewport: PageViewport;
        enhanceTextSelection?: boolean | undefined;
        eventBus: EventBus;
        highlighter: TextHighlighter;
    }): TextLayerBuilder;
}
/**
 * @interface
 */
export class IPDFXfaLayerFactory {
    /**
     * @typedef {Object} CreateXfaLayerBuilderParameters
     * @property {HTMLDivElement} pageDiv
     * @property {PDFPageProxy} pdfPage
     * @property {AnnotationStorage} [annotationStorage] - Storage for annotation
     *   data in forms.
     */
    /**
     * @param {CreateXfaLayerBuilderParameters}
     * @returns {XfaLayerBuilder}
     */
    createXfaLayerBuilder({ pageDiv, pdfPage, annotationStorage }: {
        pageDiv: HTMLDivElement;
        pdfPage: PDFPageProxy;
        /**
         * - Storage for annotation
         * data in forms.
         */
        annotationStorage?: any;
    }): XfaLayerBuilder;
}
/**
 * @interface
 */
export class IRenderableView {
    /** @type {function | null} */
    resume: Function | null;
    /**
     * @type {string} - Unique ID for rendering queue.
     */
    get renderingId(): string;
    /**
     * @type {RenderingStates}
     */
    get renderingState(): any;
    /**
     * @returns {Promise} Resolved on draw completion.
     */
    draw(): Promise<any>;
}
