import React  from 'react'
import _Activate, { ActivateOptions as _Options } from './lib'

_Activate.activate()

// Let React know our custom element so it won't complain about it
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

