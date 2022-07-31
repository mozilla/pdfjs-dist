export type AnnotationEditor = import("./editor.js").AnnotationEditor;
export type AnnotationEditorUIManager = import("./tools.js").AnnotationEditorUIManager;
export type AnnotationStorage = import("../annotation_storage.js").AnnotationStorage;
export type IL10n = any;
export type AnnotationEditorLayerOptions = {
    mode: Object;
    div: HTMLDivElement;
    uiManager: AnnotationEditorUIManager;
    enabled: boolean;
    annotationStorage: AnnotationStorage;
    pageIndex: number;
    l10n: any;
};
/**
 * @typedef {Object} AnnotationEditorLayerOptions
 * @property {Object} mode
 * @property {HTMLDivElement} div
 * @property {AnnotationEditorUIManager} uiManager
 * @property {boolean} enabled
 * @property {AnnotationStorage} annotationStorage
 * @property {number} pageIndex
 * @property {IL10n} l10n
 */
/**
 * Manage all the different editors on a page.
 */
export class AnnotationEditorLayer {
    static _initialized: boolean;
    /**
     * Compare the positions of two elements, it must correspond to
     * the visual ordering.
     *
     * @param {HTMLElement} e1
     * @param {HTMLElement} e2
     * @returns {number}
     */
    static "__#3@#compareElementPositions"(e1: HTMLElement, e2: HTMLElement): number;
    /**
     * @param {AnnotationEditorLayerOptions} options
     */
    constructor(options: AnnotationEditorLayerOptions);
    annotationStorage: import("../annotation_storage.js").AnnotationStorage;
    pageIndex: number;
    div: HTMLDivElement;
    get textLayerElements(): any;
    /**
     * Update the toolbar if it's required to reflect the tool currently used.
     * @param {number} mode
     */
    updateToolbar(mode: number): void;
    /**
     * The mode has changed: it must be updated.
     * @param {number} mode
     */
    updateMode(mode?: number): void;
    addInkEditorIfNeeded(isCommitting: any): void;
    /**
     * Set the editing state.
     * @param {boolean} isEditing
     */
    setEditingState(isEditing: boolean): void;
    /**
     * Add some commands into the CommandManager (undo/redo stuff).
     * @param {Object} params
     */
    addCommands(params: Object): void;
    /**
     * Enable pointer events on the main div in order to enable
     * editor creation.
     */
    enable(): void;
    /**
     * Disable editor creation.
     */
    disable(): void;
    /**
     * Set the current editor.
     * @param {AnnotationEditor} editor
     */
    setActiveEditor(editor: AnnotationEditor): void;
    enableClick(): void;
    disableClick(): void;
    attach(editor: any): void;
    detach(editor: any): void;
    /**
     * Remove an editor.
     * @param {AnnotationEditor} editor
     */
    remove(editor: AnnotationEditor): void;
    /**
     * Function called when the text layer has finished rendering.
     */
    onTextLayerRendered(): void;
    /**
     * Remove an aria-owns id from a node in the text layer.
     * @param {AnnotationEditor} editor
     */
    removePointerInTextLayer(editor: AnnotationEditor): void;
    /**
     * Find the text node which is the nearest and add an aria-owns attribute
     * in order to correctly position this editor in the text flow.
     * @param {AnnotationEditor} editor
     */
    addPointerInTextLayer(editor: AnnotationEditor): void;
    /**
     * Move a div in the DOM in order to respect the visual order.
     * @param {HTMLDivElement} div
     */
    moveDivInDOM(editor: any): void;
    /**
     * Add a new editor in the current view.
     * @param {AnnotationEditor} editor
     */
    add(editor: AnnotationEditor): void;
    /**
     * Add an editor in the annotation storage.
     * @param {AnnotationEditor} editor
     */
    addToAnnotationStorage(editor: AnnotationEditor): void;
    /**
     * Add or rebuild depending if it has been removed or not.
     * @param {AnnotationEditor} editor
     */
    addOrRebuild(editor: AnnotationEditor): void;
    /**
     * Add a new editor and make this addition undoable.
     * @param {AnnotationEditor} editor
     */
    addANewEditor(editor: AnnotationEditor): void;
    /**
     * Add a new editor and make this addition undoable.
     * @param {AnnotationEditor} editor
     */
    addUndoableEditor(editor: AnnotationEditor): void;
    /**
     * Get an id for an editor.
     * @returns {string}
     */
    getNextId(): string;
    /**
     * Create a new editor
     * @param {Object} data
     * @returns {AnnotationEditor}
     */
    deserialize(data: Object): AnnotationEditor;
    /**
     * Set the last selected editor.
     * @param {AnnotationEditor} editor
     */
    setSelected(editor: AnnotationEditor): void;
    /**
     * Add or remove an editor the current selection.
     * @param {AnnotationEditor} editor
     */
    toggleSelected(editor: AnnotationEditor): void;
    /**
     * Check if the editor is selected.
     * @param {AnnotationEditor} editor
     */
    isSelected(editor: AnnotationEditor): boolean;
    /**
     * Unselect an editor.
     * @param {AnnotationEditor} editor
     */
    unselect(editor: AnnotationEditor): void;
    /**
     * Pointerup callback.
     * @param {PointerEvent} event
     */
    pointerup(event: PointerEvent): void;
    /**
     * Pointerdown callback.
     * @param {PointerEvent} event
     */
    pointerdown(event: PointerEvent): void;
    /**
     * Drag callback.
     * @param {DragEvent} event
     */
    drop(event: DragEvent): void;
    /**
     * Dragover callback.
     * @param {DragEvent} event
     */
    dragover(event: DragEvent): void;
    /**
     * Destroy the main editor.
     */
    destroy(): void;
    /**
     * Render the main editor.
     * @param {Object} parameters
     */
    render(parameters: Object): void;
    viewport: any;
    /**
     * Update the main editor.
     * @param {Object} parameters
     */
    update(parameters: Object): void;
    /**
     * Get the scale factor from the viewport.
     * @returns {number}
     */
    get scaleFactor(): number;
    /**
     * Get page dimensions.
     * @returns {Object} dimensions.
     */
    get pageDimensions(): Object;
    get viewportBaseDimensions(): any[];
    /**
     * Set the dimensions of the main div.
     */
    setDimensions(): void;
    #private;
}
