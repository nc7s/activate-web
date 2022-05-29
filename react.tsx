import React  from 'react'
import _Activate, { ActivateOptions as _Options, registerCustomElement } from './lib'

registerCustomElement()

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'activate-web': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
		}
	}
}

export type ActivateOptions = Partial<_Options>

export default function Activate(props?: ActivateOptions & any) {
	return <activate-web {...props}></activate-web>
}

