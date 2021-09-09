import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Head from 'next/head'

import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

import { canonicalName, appName } from '../services/metakeys';
import React, { useEffect, useState } from 'react'

export default function Capsule(props) {
	const url = canonicalName(props.path)
	const displaySidebar = (typeof props.displaySidebar === "undefined" ? true : props.displaySidebar)
	const [activeScroll, setActiveScroll] = useState(false)

	useEffect(() => {
		const scrollListener = () => {
			setActiveScroll((window.scrollY > 10 ? true: false))
		}

		window.addEventListener('scroll', scrollListener)
		return () => {
			window.removeEventListener('scroll', scrollListener)
		}

	}, [])

	const scrollTop = (e) => {
		e.preventDefault()
		window.scrollTo(0, 0)
	}
	return (
		<React.Fragment>
			<Head>
				{/* SEO Geral */}
				<title>{props.title}</title>
				<meta name="description" content={props.description} />
				{/* <link rel="canonical" href={url} /> */}
				<meta name="author" content="Marlon Cardoso" />
				<meta name="robots" content="index" />

				{/* Open Graph Facebook */}
				<meta property="og:title" content={props.title} />
				<meta property="og:description" content={props.description} />
				{/* <meta property="og:url" content={url} /> */}
				<meta property="og:site_name" content={appName} />
				<meta property="og:type" content="website" />
				{/* <meta property="og:image" content="https://exemplo.com/imagem.png" /> */}

				{/* Twitter */}
				<meta name="twitter:title" content={props.title} />
				<meta name="twitter:description" content={props.description} />
				{/* <meta name="twitter:url" content={url} /> */}
				<meta name="twitter:card" content="summary" />
				{/* <meta name="twitter:image" content="https://exemplo.com/imagem.png" /> */}
				<meta name="twitter:creator" content="@mus2cardoso" />
                
				<link rel="icon" href="/favicon.ico" />
			</Head>
			
			{displaySidebar ? <Sidebar activeScroll={activeScroll} /> : ''}
			
			<main className="container" id="app">
				{displaySidebar? <header className="scape-sidebar"><h1>{props.title}</h1></header> :''}
            	{props.children}
			</main>
			
			<button type="button" onClick={scrollTop} title="Pratique" className={`back-top ${activeScroll ? 'on-top' : ''}`}>
				<i className="fa fa-chevron-up"></i>
			</button>
			{props.displayFooter? <Footer /> : ''}
		</React.Fragment>
	)
}