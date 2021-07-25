export type StructTreeLayerBuilderOptions = {
    pdfPage: any;
};
/**
 * @implements IPDFStructTreeLayerFactory
 */
export class DefaultStructTreeLayerFactory implements IPDFStructTreeLayerFactory {
    /**
     * @param {PDFPage} pdfPage
     * @returns {StructTreeLayerBuilder}
     */
    createStructTreeLayerBuilder(pdfPage: any): StructTreeLayerBuilder;
}
/**
 * @typedef {Object} StructTreeLayerBuilderOptions
 * @property {PDFPage} pdfPage
 */
export class StructTreeLayerBuilder {
    /**
     * @param {StructTreeLayerBuilderOptions} options
     */
    constructor({ pdfPage }: StructTreeLayerBuilderOptions);
    pdfPage: any;
    render(structTree: any): HTMLSpanElement | null;
    _setAttributes(structElement: any, htmlElement: any): void;
    _walk(node: any): HTMLSpanElement | null;
}
