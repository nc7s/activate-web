import {
	ActivateOptions as _ActivateOptions, _makeGoto, DEFAULT_OPTIONS,
	DEFAULT_STYLES, STYLE_CLASS, STYLE_CLASS_TITLE, STYLE_CLASS_DETAIL,
} from './lib'

export interface ActivateOptions extends Omit<_ActivateOptions, 'titleHtml' | 'detailHtml'> {
	detailHtml?: any,
}

export default function Activate(options: ActivateOptions) {
	options = Object.assign({}, DEFAULT_OPTIONS, options)
	return (
	<div>
		{ !options.noDefaultStyle && <style> { DEFAULT_STYLES } </style> }
		<div className={STYLE_CLASS} style={{ color: options.textColor || 'inherit' }}>
			<div className={STYLE_CLASS_TITLE}>Activate {options.name}</div>
			{ options.detailHtml ?
				<div className={STYLE_CLASS_DETAIL}>{options.detailHtml}</div> :
				<div className={STYLE_CLASS_DETAIL}>
					Go to {options.gotoLink ? <a href={options.gotoLink}>{options.gotoName}</a> : options.gotoName} to activate {options.name}.
				</div>
			}
		</div>
	</div>
	)
}

