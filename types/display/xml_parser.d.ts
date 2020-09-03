export class SimpleXMLParser extends XMLParserBase {
    _currentFragment: any;
    _stack: any[] | null;
    _errorCode: number;
    parseFromString(data: any): {
        documentElement: any;
    } | undefined;
}
declare class XMLParserBase {
    _resolveEntities(s: any): any;
    _parseContent(s: any, start: any): {
        name: any;
        attributes: {
            name: string;
            value: any;
        }[];
        parsed: number;
    } | null;
    _parseProcessingInstruction(s: any, start: any): {
        name: any;
        value: any;
        parsed: number;
    };
    parseXml(s: any): void;
    onResolveEntity(name: any): string;
    onPi(name: any, value: any): void;
    onComment(text: any): void;
    onCdata(text: any): void;
    onDoctype(doctypeContent: any): void;
    onText(text: any): void;
    onBeginElement(name: any, attributes: any, isEmpty: any): void;
    onEndElement(name: any): void;
    onError(code: any): void;
}
export {};
