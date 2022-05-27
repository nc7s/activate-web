export const DEFAULT_STYLES = `
	.--activate-web {
		position: fixed;
		z-index: 999;
		right: 5vw;
		bottom: 5vw;
		opacity: 50%;
		filter: invert(50%);
		font-size: 16px;
		/* System Fonts as used by Medium and WordPress, copy-pasted from https://css-tricks.com/snippets/css/system-font-stack/ */
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
		text-align: start;
	}
	.--activate-web--title {
		font-size: 1.5em;
	}
	.--activate-web--detail {
		font-size: .9em;
		max-width: 40ch;
	}
	.--activate-web--detail a {
		color: inherit;
		text-decoration: underline;
		font-size: 1em;
	}
`;
export const STYLE_CLASS = '--activate-web';
export const STYLE_CLASS_TITLE = STYLE_CLASS + '--title';
export const STYLE_CLASS_DETAIL = STYLE_CLASS + '--detail';
export const DEFAULT_OPTIONS = {
    name: 'Open Web',
    gotoName: 'your editor',
};
export function _makeGoto(options) {
    return options.gotoLink === undefined ? options.gotoName :
        `<a href="${options.gotoLink}">${options.gotoName}</a>`;
}
export default class Activate {
    constructor(options) {
        this.activated = false;
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.createElement();
        if (this.options.textColor !== undefined) {
            // @ts-ignore
            this.el.style.color = options.textColor;
        }
    }
    createElement() {
        this.el = document.createElement('div');
        this.el.classList.add(STYLE_CLASS);
        this.titleEl = document.createElement('div');
        this.titleEl.classList.add(STYLE_CLASS_TITLE);
        this.titleEl.innerHTML = `Activate ${this.options.name}`;
        this.detailEl = document.createElement('div');
        this.detailEl.classList.add(STYLE_CLASS_DETAIL);
        this.detailEl.innerHTML = this.options.detailHtml ||
            `Go to ${_makeGoto(this.options)} to activate ${this.options.name}.`;
        this.el.appendChild(this.titleEl);
        this.el.appendChild(this.detailEl);
        const containerEl = document.createElement('div');
        if (!this.options.noDefaultStyle) {
            const styleEl = document.createElement('style');
            styleEl.textContent = DEFAULT_STYLES;
            containerEl.appendChild(styleEl);
        }
        containerEl.appendChild(this.el);
        this.el = containerEl;
    }
    attachElement(parent) {
        (parent || document.body).appendChild(this.el);
    }
    detachElement() {
        this.el.remove();
    }
    activate() {
        if (this.activated) {
            this.deactivate();
        }
        this.createElement();
        this.attachElement();
        this.activated = true;
    }
    deactivate() {
        this.detachElement();
        this.activated = false;
    }
    get isActivated() {
        return this.activated;
    }
}
