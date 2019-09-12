import { WebView } from "alt";

interface DefType {
    ClientBound: { [event: string]: unknown[] },
    RenderBound: { [event: string]: unknown[] },
}

type RenderBound<Def extends DefType> = Def["RenderBound"];
type ClientBound<Def extends DefType> = Def["ClientBound"];

export interface TypedWebView<Def extends DefType> extends Omit<WebView, "emit" | "off" | "on"> {
    emit<E extends keyof RenderBound<Def>>(event: E, ...args: RenderBound<Def>[E]): void;

    off<E extends keyof ClientBound<Def>>(event: E, cb: (...args: ClientBound<Def>[E]) => void): void;
    
    on<E extends keyof ClientBound<Def>>(event: E, cb: (...args: ClientBound<Def>[E]) => void): void;
}

export interface TypedRender<Def extends DefType> {
    emit<E extends keyof ClientBound<Def>>(event: E, ...args: ClientBound<Def>[E]): void;

    off<E extends keyof RenderBound<Def>>(event: E, cb: (...args: RenderBound<Def>[E]) => void): void;
    
    on<E extends keyof RenderBound<Def>>(event: E, cb: (...args: RenderBound<Def>[E]) => void): void;
}

export function typedView<Def extends DefType>(url: string) {
    return new WebView(url) as TypedWebView<Def>;
}

export function typedRender<Def extends DefType>() {
    return (window as any).alt as TypedRender<Def>;
}
