export type PDFDocumentProxy = import("../src/display/api").PDFDocumentProxy;
export type EventBus = import("./event_utils").EventBus;
export type IPDFLinkService = import("./interfaces").IPDFLinkService;
export type PDFFindControllerOptions = {
    /**
     * - The navigation/linking service.
     */
    linkService: IPDFLinkService;
    /**
     * - The application event bus.
     */
    eventBus: EventBus;
};
export namespace FindState {
    const FOUND: number;
    const NOT_FOUND: number;
    const WRAPPED: number;
    const PENDING: number;
}
/**
 * @typedef {Object} PDFFindControllerOptions
 * @property {IPDFLinkService} linkService - The navigation/linking service.
 * @property {EventBus} eventBus - The application event bus.
 */
/**
 * Provides search functionality to find a given string in a PDF document.
 */
export class PDFFindController {
    /**
     * @param {PDFFindControllerOptions} options
     */
    constructor({ linkService, eventBus }: PDFFindControllerOptions);
    _linkService: import("./interfaces").IPDFLinkService;
    _eventBus: import("./event_utils").EventBus;
    executeCommand: ((cmd: any, state: any) => void) | undefined;
    get highlightMatches(): boolean | undefined;
    get pageMatches(): any[] | undefined;
    get pageMatchesLength(): any[] | undefined;
    get selected(): {
        pageIdx: number;
        matchIdx: number;
    } | undefined;
    get state(): any;
    /**
     * Set a reference to the PDF document in order to search it.
     * Note that searching is not possible if this method is not called.
     *
     * @param {PDFDocumentProxy} pdfDocument - The PDF document to search.
     */
    setDocument(pdfDocument: PDFDocumentProxy): void;
    _pdfDocument: import("../src/display/api").PDFDocumentProxy | null | undefined;
    /**
     * @private
     */
    private _onFind;
    _dirtyMatch: boolean | undefined;
    _state: any;
    _findTimeout: any;
    _highlightMatches: boolean | undefined;
    scrollMatchIntoView({ element, selectedLeft, pageIndex, matchIndex, }: {
        element?: null | undefined;
        selectedLeft?: number | undefined;
        pageIndex?: number | undefined;
        matchIndex?: number | undefined;
    }): void;
    _scrollMatches: boolean | undefined;
    _reset(): void;
    _pageMatches: any[] | undefined;
    _pageMatchesLength: any[] | undefined;
    _selected: {
        pageIdx: number;
        matchIdx: number;
    } | undefined;
    _offset: {
        pageIdx: null;
        matchIdx: null;
        wrapped: boolean;
    } | undefined;
    _extractTextPromises: any[] | undefined;
    _pageContents: any[] | undefined;
    _pageDiffs: any[] | undefined;
    _hasDiacritics: any[] | undefined;
    _matchesCountTotal: number | undefined;
    _pagesToSearch: number | null | undefined;
    _pendingFindMatches: Set<any> | undefined;
    _resumePageIdx: any;
    _firstPageCapability: any;
    /**
     * @type {string} The (current) normalized search query.
     */
    get _query(): string;
    _rawQuery: any;
    _shouldDirtyMatch(state: any): boolean;
    /**
     * Determine if the search query constitutes a "whole word", by comparing the
     * first/last character type with the preceding/following character type.
     */
    _isEntireWord(content: any, startIdx: any, length: any): boolean;
    _calculateRegExpMatch(query: any, entireWord: any, pageIndex: any, pageContent: any): void;
    _convertToRegExpString(query: any, hasDiacritics: any): any[];
    _calculateMatch(pageIndex: any): void;
    _extractText(): void;
    _updatePage(index: any): void;
    _updateAllPages(): void;
    _nextMatch(): void;
    _matchesReady(matches: any): boolean;
    _nextPageMatch(): void;
    _advanceOffsetPage(previous: any): void;
    _updateMatch(found?: boolean): void;
    _onFindBarClose(evt: any): void;
    _requestMatchesCount(): {
        current: number;
        total: number | undefined;
    };
    _updateUIResultsCount(): void;
    _updateUIState(state: any, previous?: boolean): void;
}
