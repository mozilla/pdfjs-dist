export type PDFPageProxy = import("../src/display/api").PDFPageProxy;
export type PageViewport = import("../src/display/display_utils").PageViewport;
export type IPDFLinkService = import("./interfaces").IPDFLinkService;
export type AnnotationEditorUIManager = import("../src/display/editor/tools.js").AnnotationEditorUIManager;
export type AnnotationStorage = any;
export type TextAccessibilityManager = import("./text_accessibility.js").TextAccessibilityManager;
export type IL10n = import("./interfaces").IL10n;
export type AnnotationEditorLayerBuilderOptions = {
    /**
     * - Editor mode
     */
    mode: number;
    pageDiv: HTMLDivElement;
    pdfPage: PDFPageProxy;
    accessibilityManager: TextAccessibilityManager;
    annotationStorage: any;
    /**
     * - Localization service.
     */
    l10n: IL10n;
    uiManager: AnnotationEditorUIManager;
};
/**
 * @typedef {Object} AnnotationEditorLayerBuilderOptions
 * @property {number} mode - Editor mode
 * @property {HTMLDivElement} pageDiv
 * @property {PDFPageProxy} pdfPage
 * @property {TextAccessibilityManager} accessibilityManager
 * @property {AnnotationStorage} annotationStorage
 * @property {IL10n} l10n - Localization service.
 * @property {AnnotationEditorUIManager} uiManager
 */
export class AnnotationEditorLayerBuilder {
    /**
     * @param {AnnotationEditorLayerBuilderOptions} options
     */
    constructor(options: AnnotationEditorLayerBuilderOptions);
    pageDiv: HTMLDivElement;
    pdfPage: import("../src/display/api").PDFPageProxy;
    annotationStorage: any;
    accessibilityManager: import("./text_accessibility.js").TextAccessibilityManager;
    l10n: import("./interfaces").IL10n;
    annotationEditorLayer: any;
    div: HTMLDivElement | null;
    _cancelled: boolean;
    /**
     * @param {PageViewport} viewport
     * @param {string} intent (default value is 'display')
     */
    render(viewport: PageViewport, intent?: string): Promise<void>;
    cancel(): void;
    hide(): void;
    show(): void;
    destroy(): void;
    #private;
}
