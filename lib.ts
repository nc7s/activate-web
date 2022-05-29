export const DEFAULT_STYLES = `
	* {
		user-select: none;
	}

	:host {
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

	::part(title) {
		font-size: 1.5em;
	}

	::part(detail) {
		font-size: .9em;
		max-width: 40ch;
	}

	a {
		color: inherit;
		text-decoration: underline;
	}

	a:hover {
		text-decoration: underline dashed;
	}

	a:visited {
		color: inherit;
	}
`

const ATTR_LC_MAP = {
	'gototext': 'gotoText',
	'gotolink': 'gotoLink',
	'titlehtml': 'titleHtml',
	'detailhtml': 'detailHtml',
}

export const OPTION_KEYS = ['name', 'gotoText', 'gotoLink', 'titleHtml', 'detailHtml']

const FALSY_STRINGS = ['false', 'null', 'undefined']

export interface ActivateOptions {
	name: string,
	gotoText: string,
	gotoLink: string,
	titleHtml: string,
	detailHtml: string,
}

export const DEFAULT_OPTIONS: ActivateOptions = {
	name: 'Open Web',
	gotoText: 'your favorite editor',
	gotoLink: '',
	titleHtml: '',
	detailHtml: '',
}

export default class Activate extends HTMLElement {
	#options: ActivateOptions = Object.create(DEFAULT_OPTIONS)

	titleEl: HTMLElement
	detailEl: HTMLElement

	mutationObserver: MutationObserver

	constructor() {
		super()

		this.titleEl = document.createElement('div')
		this.titleEl.setAttribute('part', 'title')

		this.detailEl = document.createElement('div')
		this.detailEl.setAttribute('part', 'detail')

		const defaultStyleEl = document.createElement('style')
		defaultStyleEl.textContent = DEFAULT_STYLES

		this.attachShadow({
			mode: 'open',
		})
		this.shadowRoot?.append(defaultStyleEl, this.titleEl, this.detailEl)

		this.mutationObserver = new MutationObserver(() => {
			this.updateTitle()
			this.updateDetail()
		})
	}

	static activate(tagName: string = 'activate-web') {
		if(window.customElements.get(tagName)) {
			return
		}
		window.customElements.define(tagName, Activate)
		const activateEls = document.querySelectorAll(tagName)
		if(activateEls.length !== 0) {
			for(let el of activateEls) {
				if(!(el instanceof Activate)) {
					window.customElements.upgrade(el)
				}
			}
		}
	}

	get name() {
		return this.#options.name
	}

	get gotoText() {
		return this.#options.gotoText
	}

	get gotoLink() {
		return this.#options.gotoLink
	}

	get titleHtml() {
		return this.#options.titleHtml
	}

	get detailHtml() {
		return this.#options.detailHtml
	}

	set name(value: string) {
		this.#options.name = value
		this.updateTitle()
		this.updateDetail()
	}

	set gotoText(value: string) {
		this.#options.gotoText = value
		this.updateDetail()
	}

	set gotoLink(value: string) {
		this.#options.gotoLink = value
		this.updateDetail()
	}

	set titleHtml(value: string) {
		this.#options.titleHtml = value
		this.updateTitle()
	}

	set detailHtml(value: string) {
		this.#options.detailHtml = value
		this.updateDetail()
	}

	updateAttribute(attr: string, value: string) {
		if(attr in ATTR_LC_MAP) {
			// @ts-ignore
			attr = ATTR_LC_MAP[attr]
		}
		if(!OPTION_KEYS.includes(attr)) {
			return
		}
		switch(attr) {
		case 'titleHtml':
		case 'detailHtml':
			if(FALSY_STRINGS.includes(value)) {
				value = ''
			}
		}
		if(FALSY_STRINGS.includes(value)) {
			return
		}
		// @ts-ignore
		this.#options[attr] = value

		switch(attr) {
		case 'name':
		case 'titleHtml':
		case 'detailHtml':
			this.updateTitle()
		case 'gotoText':
		case 'gotoLink':
			this.updateDetail()
		}
	}

	updateTitle() {
		this.titleEl.innerHTML = this.titleHtml || this._titleHtml()
	}

	updateDetail() {
		this.detailEl.innerHTML = this.detailHtml || this._detailHtml()
	}

	_titleHtml() {
		return `Activate ${this.#options.name}`
	}

	_detailHtml() {
		return `Go to ${this._makeGoto()} to activate ${this.#options.name}.`
	}

	_makeGoto() {
		const text = this.#options.gotoText
		const link = this.#options.gotoLink
		return link ? `<a href="${link}">${text}</a>` : text
	}

	static get observedAttributes() {
		return Object.keys(ATTR_LC_MAP)
	}

	connectedCallback() {
		let attr: keyof ActivateOptions
		for (attr in this.#options) {
			const value = this.getAttribute(attr)
			if(value && value !== this.#options[attr] && value !== 'false') {
				this.#options[attr] = value
			}
		}
		this.updateTitle()
		this.updateDetail()

		this.mutationObserver.observe(this, {
			attributeFilter: Activate.observedAttributes
		})
	}

	disconnectedCallback() {
		this.mutationObserver.disconnect()
	}

	attributeChangedCallback(attr: string, _: string, curr: string) {
		this.updateAttribute(attr, curr)
	}
}

