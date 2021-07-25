export type AnnotationLayerBuilderOptions = {
    pageDiv: HTMLDivElement;
    pdfPage: any;
    annotationStorage?: any;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string | undefined;
    renderInteractiveForms: boolean;
    linkService: any;
    downloadManager: any;
    /**
     * - Localization service.
     */
    l10n: any;
    enableScripting?: boolean | undefined;
    hasJSActionsPromise?: Promise<boolean> | undefined;
    mouseState?: Object | undefined;
};
/**
 * @typedef {Object} AnnotationLayerBuilderOptions
 * @property {HTMLDivElement} pageDiv
 * @property {PDFPage} pdfPage
 * @property {AnnotationStorage} [annotationStorage]
 * @property {string} [imageResourcesPath] - Path for image resources, mainly
 *   for annotation icons. Include trailing slash.
 * @property {boolean} renderInteractiveForms
 * @property {IPDFLinkService} linkService
 * @property {DownloadManager} downloadManager
 * @property {IL10n} l10n - Localization service.
 * @property {boolean} [enableScripting]
 * @property {Promise<boolean>} [hasJSActionsPromise]
 * @property {Object} [mouseState]
 */
export class AnnotationLayerBuilder {
    /**
     * @param {AnnotationLayerBuilderOptions} options
     */
    constructor({ pageDiv, pdfPage, linkService, downloadManager, annotationStorage, imageResourcesPath, renderInteractiveForms, l10n, enableScripting, hasJSActionsPromise, mouseState, }: AnnotationLayerBuilderOptions);
    pageDiv: HTMLDivElement;
    pdfPage: any;
    linkService: any;
    downloadManager: any;
    imageResourcesPath: string;
    renderInteractiveForms: boolean;
    l10n: any;
    annotationStorage: any;
    enableScripting: boolean;
    _hasJSActionsPromise: Promise<boolean>;
    _mouseState: Object;
    div: HTMLDivElement | null;
    _cancelled: boolean;
    /**
     * @param {PageViewport} viewport
     * @param {string} intent (default value is 'display')
     * @returns {Promise<void>} A promise that is resolved when rendering of the
     *   annotations is complete.
     */
    render(viewport: any, intent?: string): Promise<void>;
    cancel(): void;
    hide(): void;
}
/**
 * @implements IPDFAnnotationLayerFactory
 */
export class DefaultAnnotationLayerFactory implements IPDFAnnotationLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @param {AnnotationStorage} [annotationStorage]
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
}
