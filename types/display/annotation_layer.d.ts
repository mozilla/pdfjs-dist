export type AnnotationElementParameters = {
    data: Object;
    layer: HTMLDivElement;
    page: any;
    viewport: any;
    linkService: any;
    downloadManager: any;
    annotationStorage?: AnnotationStorage;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string;
    renderInteractiveForms: boolean;
    svgFactory: Object;
};
export type AnnotationLayerParameters = {
    viewport: any;
    div: HTMLDivElement;
    annotations: any[];
    page: any;
    linkService: any;
    downloadManager: any;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string;
    renderInteractiveForms: boolean;
};
/**
 * @typedef {Object} AnnotationLayerParameters
 * @property {PageViewport} viewport
 * @property {HTMLDivElement} div
 * @property {Array} annotations
 * @property {PDFPage} page
 * @property {IPDFLinkService} linkService
 * @property {DownloadManager} downloadManager
 * @property {string} [imageResourcesPath] - Path for image resources, mainly
 *   for annotation icons. Include trailing slash.
 * @property {boolean} renderInteractiveForms
 */
export class AnnotationLayer {
    /**
     * Render a new annotation layer with all annotation elements.
     *
     * @public
     * @param {AnnotationLayerParameters} parameters
     * @memberof AnnotationLayer
     */
    public static render(parameters: AnnotationLayerParameters): void;
    /**
     * Update the annotation elements on existing annotation layer.
     *
     * @public
     * @param {AnnotationLayerParameters} parameters
     * @memberof AnnotationLayer
     */
    public static update(parameters: AnnotationLayerParameters): void;
}
import { AnnotationStorage } from "./annotation_storage.js";
