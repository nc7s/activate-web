import React from 'react'
import ReactDOM from 'react-dom'
import Activate from '../../react'
import '../style.css'

export default function App() {
	return (
		<div>
			<p>Go to <a href="/">vanilla JS demo</a></p>
			<p>Background photo: <a href="https://unsplash.com/photos/cqbLg3lZEpk">https://unsplash.com/photos/cqbLg3lZEpk</a></p>
			<button onClick={() => document.body.classList.toggle('dark')}>toggle dark</button>
			<p>It's at the bottom right ↘︎</p>
			<Activate name='Activate-Web' gotoName='GitHub repo' gotoLink='https://github.com/bnoctis/activate-web' />
		</div>
	)
}

ReactDOM.render(<App/>, document.getElementById('app-root'))
