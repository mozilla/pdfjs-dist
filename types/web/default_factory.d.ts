export type PDFPageProxy = import("../src/display/api").PDFPageProxy;
export type PageViewport = import("../src/display/display_utils").PageViewport;
export type EventBus = import("./event_utils").EventBus;
export type IDownloadManager = import("./interfaces").IDownloadManager;
export type IL10n = import("./interfaces").IL10n;
export type IPDFAnnotationLayerFactory = import("./interfaces").IPDFAnnotationLayerFactory;
export type IPDFAnnotationEditorLayerFactory = import("./interfaces").IPDFAnnotationEditorLayerFactory;
export type IPDFLinkService = import("./interfaces").IPDFLinkService;
export type IPDFStructTreeLayerFactory = import("./interfaces").IPDFStructTreeLayerFactory;
export type IPDFTextLayerFactory = import("./interfaces").IPDFTextLayerFactory;
export type IPDFXfaLayerFactory = import("./interfaces").IPDFXfaLayerFactory;
export type TextHighlighter = import("./text_highlighter").TextHighlighter;
export type TextAccessibilityManager = import("./text_accessibility.js").TextAccessibilityManager;
/**
 * @implements IPDFAnnotationEditorLayerFactory
 */
export class DefaultAnnotationEditorLayerFactory implements IPDFAnnotationEditorLayerFactory {
    /**
     * @typedef {Object} CreateAnnotationEditorLayerBuilderParameters
     * @property {AnnotationEditorUIManager} [uiManager]
     * @property {HTMLDivElement} pageDiv
     * @property {PDFPageProxy} pdfPage
     * @property {IL10n} l10n
     * @property {AnnotationStorage} [annotationStorage] - Storage for annotation
     * @property {TextAccessibilityManager} [accessibilityManager]
     *   data in forms.
     */
    /**
     * @param {CreateAnnotationEditorLayerBuilderParameters}
     * @returns {AnnotationEditorLayerBuilder}
     */
    createAnnotationEditorLayerBuilder({ uiManager, pageDiv, pdfPage, accessibilityManager, l10n, annotationStorage, }: {
        uiManager?: any;
        pageDiv: HTMLDivElement;
        pdfPage: PDFPageProxy;
        l10n: IL10n;
        /**
         * - Storage for annotation
         */
        annotationStorage?: any;
        /**
         * data in forms.
         */
        accessibilityManager?: import("./text_accessibility.js").TextAccessibilityManager | undefined;
    }): AnnotationEditorLayerBuilder;
}
/**
 * @implements IPDFAnnotationLayerFactory
 */
export class DefaultAnnotationLayerFactory implements IPDFAnnotationLayerFactory {
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
     * @property {TextAccessibilityManager} [accessibilityManager]
     */
    /**
     * @param {CreateAnnotationLayerBuilderParameters}
     * @returns {AnnotationLayerBuilder}
     */
    createAnnotationLayerBuilder({ pageDiv, pdfPage, annotationStorage, imageResourcesPath, renderForms, l10n, enableScripting, hasJSActionsPromise, mouseState, fieldObjectsPromise, annotationCanvasMap, accessibilityManager, }: {
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
        accessibilityManager?: import("./text_accessibility.js").TextAccessibilityManager | undefined;
    }): AnnotationLayerBuilder;
}
/**
 * @implements IPDFStructTreeLayerFactory
 */
export class DefaultStructTreeLayerFactory implements IPDFStructTreeLayerFactory {
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
    }): StructTreeLayerBuilder;
}
/**
 * @implements IPDFTextLayerFactory
 */
export class DefaultTextLayerFactory implements IPDFTextLayerFactory {
    /**
     * @typedef {Object} CreateTextLayerBuilderParameters
     * @property {HTMLDivElement} textLayerDiv
     * @property {number} pageIndex
     * @property {PageViewport} viewport
     * @property {boolean} [enhanceTextSelection]
     * @property {EventBus} eventBus
     * @property {TextHighlighter} highlighter
     * @property {TextAccessibilityManager} [accessibilityManager]
     */
    /**
     * @param {CreateTextLayerBuilderParameters}
     * @returns {TextLayerBuilder}
     */
    createTextLayerBuilder({ textLayerDiv, pageIndex, viewport, enhanceTextSelection, eventBus, highlighter, accessibilityManager, }: {
        textLayerDiv: HTMLDivElement;
        pageIndex: number;
        viewport: PageViewport;
        enhanceTextSelection?: boolean | undefined;
        eventBus: EventBus;
        highlighter: TextHighlighter;
        accessibilityManager?: import("./text_accessibility.js").TextAccessibilityManager | undefined;
    }): TextLayerBuilder;
}
/**
 * @implements IPDFXfaLayerFactory
 */
export class DefaultXfaLayerFactory implements IPDFXfaLayerFactory {
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
import { AnnotationEditorLayerBuilder } from "./annotation_editor_layer_builder.js";
import { AnnotationLayerBuilder } from "./annotation_layer_builder.js";
import { StructTreeLayerBuilder } from "./struct_tree_layer_builder.js";
import { TextLayerBuilder } from "./text_layer_builder.js";
import { XfaLayerBuilder } from "./xfa_layer_builder.js";
