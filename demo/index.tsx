import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Activate from '../react'
import './style.css'

export default function App() {
	const [now, setNow] = useState(new Date)
	const [showTime, setShowTime] = useState(false)
	useEffect(() => {
		const intervalId = setInterval(() => setNow(new Date), 1000)
		return () => clearInterval(intervalId)
	})
	return (
		<div>
			<p><a href="https://github.com/bnoctis/activate-web">Activate-Web</a> React demo</p>
			<p>Go to <a href="/vanilla.html">vanilla JS demo</a></p>
			<p>Source code of this demo page can be found at <code>demo/index.tsx</code></p>
			<p>Background photo: <a href="https://unsplash.com/photos/cqbLg3lZEpk">https://unsplash.com/photos/cqbLg3lZEpk</a></p>
			<button onClick={() => document.body.classList.toggle('dark')}>toggle dark</button>
			<p>It's at the bottom right ↘︎</p>
			<button onClick={() => setShowTime(!showTime)} className='show-button'>
			{ showTime ? `I've seen enough` : 'See the time... in real time' }
			</button>
			<Activate
			class={`${showTime ? 'onShow' : ''}`}
			name={ !showTime && 'Activate-Web' }
			gotoText={ !showTime && 'GitHub repo' }
			gotoLink={ !showTime && 'https://github.com/bnoctis/activate-web' }
			titleHtml={ showTime && `The year is ${now.getFullYear()}.` }
			detailHtml={ showTime && `And the time is ${now.toLocaleTimeString()}` }
			/>
		</div>
	)
}

createRoot(document.getElementById('app-root')!).render(<App/>)
