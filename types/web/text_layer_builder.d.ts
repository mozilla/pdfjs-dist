export type PageViewport = import("../src/display/display_utils").PageViewport;
export type EventBus = import("./event_utils").EventBus;
export type TextHighlighter = import("./text_highlighter").TextHighlighter;
export type TextAccessibilityManager = import("./text_accessibility.js").TextAccessibilityManager;
export type TextLayerBuilderOptions = {
    /**
     * - The text layer container.
     */
    textLayerDiv: HTMLDivElement;
    /**
     * - The application event bus.
     */
    eventBus: EventBus;
    /**
     * - The page index.
     */
    pageIndex: number;
    /**
     * - The viewport of the text layer.
     */
    viewport: PageViewport;
    /**
     * - Optional object that will handle
     * highlighting text from the find controller.
     */
    highlighter: TextHighlighter;
    accessibilityManager?: import("./text_accessibility.js").TextAccessibilityManager | undefined;
};
/**
 * @typedef {Object} TextLayerBuilderOptions
 * @property {HTMLDivElement} textLayerDiv - The text layer container.
 * @property {EventBus} eventBus - The application event bus.
 * @property {number} pageIndex - The page index.
 * @property {PageViewport} viewport - The viewport of the text layer.
 * @property {TextHighlighter} highlighter - Optional object that will handle
 *   highlighting text from the find controller.
 * @property {TextAccessibilityManager} [accessibilityManager]
 */
/**
 * The text layer builder provides text selection functionality for the PDF.
 * It does this by creating overlay divs over the PDF's text. These divs
 * contain text that matches the PDF text they are overlaying.
 */
export class TextLayerBuilder {
    constructor({ textLayerDiv, eventBus, pageIndex, viewport, highlighter, accessibilityManager, }: {
        textLayerDiv: any;
        eventBus: any;
        pageIndex: any;
        viewport: any;
        highlighter?: null | undefined;
        accessibilityManager?: null | undefined;
    });
    textLayerDiv: any;
    eventBus: any;
    textContent: any;
    textContentItemsStr: any[];
    textContentStream: any;
    renderingDone: boolean;
    pageNumber: any;
    viewport: any;
    textDivs: any[];
    textLayerRenderTask: any;
    highlighter: any;
    accessibilityManager: any;
    /**
     * Renders the text layer.
     *
     * @param {number} [timeout] - Wait for a specified amount of milliseconds
     *                             before rendering.
     */
    render(timeout?: number | undefined): void;
    /**
     * Cancel rendering of the text layer.
     */
    cancel(): void;
    setTextContentStream(readableStream: any): void;
    setTextContent(textContent: any): void;
    #private;
}
