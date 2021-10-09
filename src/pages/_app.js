import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import * as gtag from '../services/gtag'

function MyApp({ Component, pageProps }) {
	const router = useRouter()
		useEffect(() => {
			const handleRouteChange = (uri) => {
				console.log({uri})
				gtag.pageview(uri)
			}
			router.events.on('routeChangeComplete', handleRouteChange)
			return () => {
				router.events.off('routeChangeComplete', handleRouteChange)
			}
		}, [router.events])
	return (
	<>
		{/* Global Site Tag (gtag.js) - Google Analytics */}
		{gtag.GA_TRACKING_ID ? 
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				id="gtag-init"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${gtag.GA_TRACKING_ID}', {
						page_path: window.location.pathname,
					});
					`,
				}}
			/>
		</>
		: ''}
		<Component {...pageProps} />
	</>
  )
}

export default MyApp