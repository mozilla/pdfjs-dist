export type IPDFXfaLayerFactory = import("./interfaces").IPDFXfaLayerFactory;
export type XfaLayerBuilderOptions = {
    pageDiv: HTMLDivElement;
    pdfPage: any;
    annotationStorage?: any;
    linkService: any;
    xfaHtml?: Object | undefined;
};
/**
 * @implements IPDFXfaLayerFactory
 */
export class DefaultXfaLayerFactory implements IPDFXfaLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @param {AnnotationStorage} [annotationStorage]
     * @param {Object} [xfaHtml]
     */
    createXfaLayerBuilder(pageDiv: HTMLDivElement, pdfPage: any, annotationStorage?: any, xfaHtml?: Object | undefined): XfaLayerBuilder;
}
/**
 * @typedef {Object} XfaLayerBuilderOptions
 * @property {HTMLDivElement} pageDiv
 * @property {PDFPage} pdfPage
 * @property {AnnotationStorage} [annotationStorage]
 * @property {IPDFLinkService} linkService
 * @property {Object} [xfaHtml]
 */
export class XfaLayerBuilder {
    /**
     * @param {XfaLayerBuilderOptions} options
     */
    constructor({ pageDiv, pdfPage, annotationStorage, linkService, xfaHtml }: XfaLayerBuilderOptions);
    pageDiv: HTMLDivElement;
    pdfPage: any;
    annotationStorage: any;
    linkService: any;
    xfaHtml: Object | undefined;
    div: HTMLDivElement | null;
    _cancelled: boolean;
    /**
     * @param {PageViewport} viewport
     * @param {string} intent (default value is 'display')
     * @returns {Promise<Object | void>} A promise that is resolved when rendering
     *   of the XFA layer is complete. The first rendering will return an object
     *   with a `textDivs` property that  can be used with the TextHighlighter.
     */
    render(viewport: any, intent?: string): Promise<Object | void>;
    cancel(): void;
    hide(): void;
}
