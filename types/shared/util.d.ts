/**
 * Promise Capability object.
 */
export type PromiseCapability = {
    /**
     * - A Promise object.
     */
    promise: Promise<any>;
    /**
     * - If the Promise has been fulfilled/rejected.
     */
    settled: boolean;
    /**
     * - Fulfills the Promise.
     */
    resolve: Function;
    /**
     * - Rejects the Promise.
     */
    reject: Function;
};
/**
 * @type {any}
 */
export const BaseException: any;
export const FONT_IDENTITY_MATRIX: number[];
export const IDENTITY_MATRIX: number[];
export namespace OPS {
    export const dependency: number;
    export const setLineWidth: number;
    export const setLineCap: number;
    export const setLineJoin: number;
    export const setMiterLimit: number;
    export const setDash: number;
    export const setRenderingIntent: number;
    export const setFlatness: number;
    export const setGState: number;
    export const save: number;
    export const restore: number;
    export const transform: number;
    export const moveTo: number;
    export const lineTo: number;
    export const curveTo: number;
    export const curveTo2: number;
    export const curveTo3: number;
    export const closePath: number;
    export const rectangle: number;
    export const stroke: number;
    export const closeStroke: number;
    export const fill: number;
    export const eoFill: number;
    export const fillStroke: number;
    export const eoFillStroke: number;
    export const closeFillStroke: number;
    export const closeEOFillStroke: number;
    export const endPath: number;
    export const clip: number;
    export const eoClip: number;
    export const beginText: number;
    export const endText: number;
    export const setCharSpacing: number;
    export const setWordSpacing: number;
    export const setHScale: number;
    export const setLeading: number;
    export const setFont: number;
    export const setTextRenderingMode: number;
    export const setTextRise: number;
    export const moveText: number;
    export const setLeadingMoveText: number;
    export const setTextMatrix: number;
    export const nextLine: number;
    export const showText: number;
    export const showSpacedText: number;
    export const nextLineShowText: number;
    export const nextLineSetSpacingShowText: number;
    export const setCharWidth: number;
    export const setCharWidthAndBounds: number;
    export const setStrokeColorSpace: number;
    export const setFillColorSpace: number;
    export const setStrokeColor: number;
    export const setStrokeColorN: number;
    export const setFillColor: number;
    export const setFillColorN: number;
    export const setStrokeGray: number;
    export const setFillGray: number;
    export const setStrokeRGBColor: number;
    export const setFillRGBColor: number;
    export const setStrokeCMYKColor: number;
    export const setFillCMYKColor: number;
    export const shadingFill: number;
    export const beginInlineImage: number;
    export const beginImageData: number;
    export const endInlineImage: number;
    export const paintXObject: number;
    export const markPoint: number;
    export const markPointProps: number;
    export const beginMarkedContent: number;
    export const beginMarkedContentProps: number;
    export const endMarkedContent: number;
    export const beginCompat: number;
    export const endCompat: number;
    export const paintFormXObjectBegin: number;
    export const paintFormXObjectEnd: number;
    export const beginGroup: number;
    export const endGroup: number;
    export const beginAnnotations: number;
    export const endAnnotations: number;
    export const beginAnnotation: number;
    export const endAnnotation: number;
    export const paintJpegXObject: number;
    export const paintImageMaskXObject: number;
    export const paintImageMaskXObjectGroup: number;
    export const paintImageXObject: number;
    export const paintInlineImageXObject: number;
    export const paintInlineImageXObjectGroup: number;
    export const paintImageXObjectRepeat: number;
    export const paintImageMaskXObjectRepeat: number;
    export const paintSolidColorImageMask: number;
    export const constructPath: number;
}
export namespace VerbosityLevel {
    export const ERRORS: number;
    export const WARNINGS: number;
    export const INFOS: number;
}
export const UNSUPPORTED_FEATURES: {
    /** @deprecated unused */
    unknown: string;
    forms: string;
    javaScript: string;
    smask: string;
    shadingPattern: string;
    /** @deprecated unused */
    font: string;
    errorTilingPattern: string;
    errorExtGState: string;
    errorXObject: string;
    errorFontLoadType3: string;
    errorFontState: string;
    errorFontMissing: string;
    errorFontTranslate: string;
    errorColorSpace: string;
    errorOperatorList: string;
    errorFontToUnicode: string;
    errorFontLoadNative: string;
    errorFontGetPath: string;
    errorMarkedContent: string;
};
export namespace AnnotationBorderStyleType {
    export const SOLID: number;
    export const DASHED: number;
    export const BEVELED: number;
    export const INSET: number;
    export const UNDERLINE: number;
}
export namespace AnnotationFieldFlag {
    export const READONLY: number;
    export const REQUIRED: number;
    export const NOEXPORT: number;
    export const MULTILINE: number;
    export const PASSWORD: number;
    export const NOTOGGLETOOFF: number;
    export const RADIO: number;
    export const PUSHBUTTON: number;
    export const COMBO: number;
    export const EDIT: number;
    export const SORT: number;
    export const FILESELECT: number;
    export const MULTISELECT: number;
    export const DONOTSPELLCHECK: number;
    export const DONOTSCROLL: number;
    export const COMB: number;
    export const RICHTEXT: number;
    export const RADIOSINUNISON: number;
    export const COMMITONSELCHANGE: number;
}
export namespace AnnotationFlag {
    export const INVISIBLE: number;
    export const HIDDEN: number;
    export const PRINT: number;
    export const NOZOOM: number;
    export const NOROTATE: number;
    export const NOVIEW: number;
    const READONLY_1: number;
    export { READONLY_1 as READONLY };
    export const LOCKED: number;
    export const TOGGLENOVIEW: number;
    export const LOCKEDCONTENTS: number;
}
export namespace AnnotationMarkedState {
    export const MARKED: string;
    export const UNMARKED: string;
}
export namespace AnnotationReplyType {
    export const GROUP: string;
    export const REPLY: string;
}
export namespace AnnotationReviewState {
    export const ACCEPTED: string;
    export const REJECTED: string;
    export const CANCELLED: string;
    export const COMPLETED: string;
    export const NONE: string;
}
export namespace AnnotationStateModelType {
    const MARKED_1: string;
    export { MARKED_1 as MARKED };
    export const REVIEW: string;
}
export namespace AnnotationType {
    export const TEXT: number;
    export const LINK: number;
    export const FREETEXT: number;
    export const LINE: number;
    export const SQUARE: number;
    export const CIRCLE: number;
    export const POLYGON: number;
    export const POLYLINE: number;
    export const HIGHLIGHT: number;
    const UNDERLINE_1: number;
    export { UNDERLINE_1 as UNDERLINE };
    export const SQUIGGLY: number;
    export const STRIKEOUT: number;
    export const STAMP: number;
    export const CARET: number;
    export const INK: number;
    export const POPUP: number;
    export const FILEATTACHMENT: number;
    export const SOUND: number;
    export const MOVIE: number;
    export const WIDGET: number;
    export const SCREEN: number;
    export const PRINTERMARK: number;
    export const TRAPNET: number;
    export const WATERMARK: number;
    export const THREED: number;
    export const REDACT: number;
}
export namespace FontType {
    export const UNKNOWN: string;
    export const TYPE1: string;
    export const TYPE1C: string;
    export const CIDFONTTYPE0: string;
    export const CIDFONTTYPE0C: string;
    export const TRUETYPE: string;
    export const CIDFONTTYPE2: string;
    export const TYPE3: string;
    export const OPENTYPE: string;
    export const TYPE0: string;
    export const MMTYPE1: string;
}
export namespace ImageKind {
    export const GRAYSCALE_1BPP: number;
    export const RGB_24BPP: number;
    export const RGBA_32BPP: number;
}
export namespace CMapCompressionType {
    const NONE_1: number;
    export { NONE_1 as NONE };
    export const BINARY: number;
    export const STREAM: number;
}
declare const AbortException_base: any;
/**
 * Error used to indicate task cancellation.
 */
export class AbortException extends AbortException_base {
    [x: string]: any;
}
declare const InvalidPDFException_base: any;
export class InvalidPDFException extends InvalidPDFException_base {
    [x: string]: any;
}
declare const MissingPDFException_base: any;
export class MissingPDFException extends MissingPDFException_base {
    [x: string]: any;
}
declare const PasswordException_base: any;
export class PasswordException extends PasswordException_base {
    [x: string]: any;
    constructor(msg: any, code: any);
    code: any;
}
export namespace PasswordResponses {
    export const NEED_PASSWORD: number;
    export const INCORRECT_PASSWORD: number;
}
export namespace PermissionFlag {
    const PRINT_1: number;
    export { PRINT_1 as PRINT };
    export const MODIFY_CONTENTS: number;
    export const COPY: number;
    export const MODIFY_ANNOTATIONS: number;
    export const FILL_INTERACTIVE_FORMS: number;
    export const COPY_FOR_ACCESSIBILITY: number;
    export const ASSEMBLE: number;
    export const PRINT_HIGH_QUALITY: number;
}
export namespace StreamType {
    const UNKNOWN_1: string;
    export { UNKNOWN_1 as UNKNOWN };
    export const FLATE: string;
    export const LZW: string;
    export const DCT: string;
    export const JPX: string;
    export const JBIG: string;
    export const A85: string;
    export const AHX: string;
    export const CCF: string;
    export const RLX: string;
}
export namespace TextRenderingMode {
    export const FILL: number;
    export const STROKE: number;
    export const FILL_STROKE: number;
    const INVISIBLE_1: number;
    export { INVISIBLE_1 as INVISIBLE };
    export const FILL_ADD_TO_PATH: number;
    export const STROKE_ADD_TO_PATH: number;
    export const FILL_STROKE_ADD_TO_PATH: number;
    export const ADD_TO_PATH: number;
    export const FILL_STROKE_MASK: number;
    export const ADD_TO_PATH_FLAG: number;
}
declare const UnexpectedResponseException_base: any;
export class UnexpectedResponseException extends UnexpectedResponseException_base {
    [x: string]: any;
    constructor(msg: any, status: any);
    status: any;
}
declare const UnknownErrorException_base: any;
export class UnknownErrorException extends UnknownErrorException_base {
    [x: string]: any;
    constructor(msg: any, details: any);
    details: any;
}
export class Util {
    static makeCssRgb(r: any, g: any, b: any): string;
    static transform(m1: any, m2: any): any[];
    static applyTransform(p: any, m: any): any[];
    static applyInverseTransform(p: any, m: any): number[];
    static getAxialAlignedBoundingBox(r: any, m: any): number[];
    static inverseTransform(m: any): number[];
    static apply3dTransform(m: any, v: any): number[];
    static singularValueDecompose2dScale(m: any): number[];
    static normalizeRect(rect: any): any;
    static intersect(rect1: any, rect2: any): any[] | null;
}
declare const FormatError_base: any;
/**
 * Error caused during parsing PDF data.
 */
export class FormatError extends FormatError_base {
    [x: string]: any;
}
/**
 * Gets length of the array (Array, Uint8Array, or string) in bytes.
 * @param {Array<any>|Uint8Array|string} arr
 * @returns {number}
 */
export function arrayByteLength(arr: Array<any> | Uint8Array | string): number;
/**
 * Combines array items (arrays) into single Uint8Array object.
 * @param {Array<Array<any>|Uint8Array|string>} arr - the array of the arrays
 *   (Array, Uint8Array, or string).
 * @returns {Uint8Array}
 */
export function arraysToBytes(arr: Array<Array<any> | Uint8Array | string>): Uint8Array;
export function assert(cond: any, msg: any): void;
export function bytesToString(bytes: any): string;
/**
 * Promise Capability object.
 *
 * @typedef {Object} PromiseCapability
 * @property {Promise<any>} promise - A Promise object.
 * @property {boolean} settled - If the Promise has been fulfilled/rejected.
 * @property {function} resolve - Fulfills the Promise.
 * @property {function} reject - Rejects the Promise.
 */
/**
 * Creates a promise capability object.
 * @alias createPromiseCapability
 *
 * @returns {PromiseCapability}
 */
export function createPromiseCapability(): PromiseCapability;
export function createObjectURL(data: any, contentType: any, forceDataSchema?: boolean): string;
export function escapeString(str: any): any;
export function getModificationDate(date?: Date): string;
export function getVerbosityLevel(): number;
export function info(msg: any): void;
export function isArrayBuffer(v: any): boolean;
export function isArrayEqual(arr1: any, arr2: any): any;
export function isBool(v: any): boolean;
export function isNum(v: any): boolean;
export function isString(v: any): boolean;
export function isSameOrigin(baseUrl: any, otherUrl: any): boolean;
/**
 * Attempts to create a valid absolute URL.
 *
 * @param {URL|string} url - An absolute, or relative, URL.
 * @param {URL|string} baseUrl - An absolute URL.
 * @returns Either a valid {URL}, or `null` otherwise.
 */
export function createValidAbsoluteUrl(url: URL | string, baseUrl: URL | string): URL | null;
export namespace IsLittleEndianCached { }
export namespace IsEvalSupportedCached { }
/**
 * @param {string} str
 */
export function removeNullCharacters(str: string): string;
export function setVerbosityLevel(level: any): void;
export function shadow(obj: any, prop: any, value: any): any;
export function string32(value: any): string;
export function stringToBytes(str: any): Uint8Array;
export function stringToPDFString(str: any): string;
export function stringToUTF8String(str: any): string;
export function utf8StringToString(str: any): string;
export function warn(msg: any): void;
export function unreachable(msg: any): void;
export {};
