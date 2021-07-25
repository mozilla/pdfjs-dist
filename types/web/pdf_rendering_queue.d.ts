/**
 * Controls rendering of the views for pages and thumbnails.
 */
export class PDFRenderingQueue {
    pdfViewer: any;
    pdfThumbnailViewer: any;
    onIdle: any;
    highestPriorityPage: any;
    idleTimeout: NodeJS.Timeout | null;
    printing: boolean;
    isThumbnailViewEnabled: boolean;
    /**
     * @param {PDFViewer} pdfViewer
     */
    setViewer(pdfViewer: any): void;
    /**
     * @param {PDFThumbnailViewer} pdfThumbnailViewer
     */
    setThumbnailViewer(pdfThumbnailViewer: any): void;
    /**
     * @param {IRenderableView} view
     * @returns {boolean}
     */
    isHighestPriority(view: any): boolean;
    /**
     * @param {Object} currentlyVisiblePages
     */
    renderHighestPriority(currentlyVisiblePages: Object): void;
    /**
     * @param {Object} visible
     * @param {Array} views
     * @param {boolean} scrolledDown
     */
    getHighestPriority(visible: Object, views: any[], scrolledDown: boolean): any;
    /**
     * @param {IRenderableView} view
     * @returns {boolean}
     */
    isViewFinished(view: any): boolean;
    /**
     * Render a page or thumbnail view. This calls the appropriate function
     * based on the views state. If the view is already rendered it will return
     * `false`.
     *
     * @param {IRenderableView} view
     */
    renderView(view: any): boolean;
}
export namespace RenderingStates {
    const INITIAL: number;
    const RUNNING: number;
    const PAUSED: number;
    const FINISHED: number;
}
