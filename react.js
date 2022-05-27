import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { DEFAULT_OPTIONS, DEFAULT_STYLES, STYLE_CLASS, STYLE_CLASS_TITLE, STYLE_CLASS_DETAIL, } from './lib';
export default function Activate(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);
    return (_jsxs("div", { children: [!options.noDefaultStyle && _jsxs("style", { children: [" ", DEFAULT_STYLES, " "] }), _jsxs("div", { className: STYLE_CLASS, style: { color: options.textColor || 'inherit' }, children: [_jsxs("div", { className: STYLE_CLASS_TITLE, children: ["Activate ", options.name] }), options.detailHtml ?
                        _jsx("div", { className: STYLE_CLASS_DETAIL, children: options.detailHtml }) :
                        _jsxs("div", { className: STYLE_CLASS_DETAIL, children: ["Go to ", options.gotoLink ? _jsx("a", { href: options.gotoLink, children: options.gotoName }) : options.gotoName, " to activate ", options.name, "."] })] })] }));
}
