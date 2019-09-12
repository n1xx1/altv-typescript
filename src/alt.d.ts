declare module "alt" {

    export class BaseObject {
        readonly type: number;
        readonly valid: boolean;

        destroy(): void;
        getMeta(key: string): any;
        setMeta(key: string, value: any): void;
    }

    export class WebView extends BaseObject {
        isVisible: boolean;
        url: string;

        constructor(v8webview: string);
        constructor(url: string, isOverlay: number|boolean, targetTexture: string);
        emit(evName: string, ...args: any[]): void;
        execJS(p0: string): void;
        focus(): void;
        off(evName: string, p1Fn: Function): void;
        on(evName: string, p1Fn: Function): void;
        unfocus(): void;
    }
    
}