export class PDFSinglePageViewer extends BaseViewer {
    constructor(options: any);
    _previousPageNumber: any;
    _shadowViewer: DocumentFragment | undefined;
    _updateScrollDown: any;
    _ensurePageViewVisible(): void;
}
import { BaseViewer } from "./base_viewer.js";
