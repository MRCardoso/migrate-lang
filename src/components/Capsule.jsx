import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Head from 'next/head'

import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

import { canonicalName, appName, noIndexPath } from '../services/metakeys';
import React, { useEffect, useState } from 'react'
import About from './About'
import AuthProvider from '../contexts/AuthContext'

export default function Capsule(props) {
	const url = canonicalName(props.path)
	const logoUrl = canonicalName("logo.png")
	
	const displaySidebar = (typeof props.displaySidebar === "undefined" ? true : props.displaySidebar)
	const displayTitle = (typeof props.displayTitle === "undefined" ? true : props.displayTitle)
	const useContainer = (typeof props.useContainer === "undefined" ? true : props.useContainer)
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

	const renderCommon = () => {
		return <>
			{displaySidebar ? <Sidebar activeScroll={activeScroll} currentPath={props.path} /> : ''}
			<main id="app">
				<section className={`${useContainer?'container': ''}`}>
					{displayTitle? <header><h1>{props.title}</h1></header> :''}
					{props.children}
				</section>
				{!props.path ? <About />: ''}
			</main>
			<button type="button" onClick={scrollTop} aria-label="Voltar ao topo" title="Voltar ao topo" className={`back-top ${activeScroll ? 'on-top' : ''}`}>
				<i className="fa fa-chevron-up"></i>
			</button>
			{props.displayFooter? <Footer /> : ''}
		</>
	}
	return (
		<React.Fragment>
			<Head>
				{/* SEO Geral */}
				<title>{props.title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content={props.description} />
				<link rel="canonical" href={url} />
				<meta name="author" content="Marlon Cardoso" />
				<meta name="robots" content={noIndexPath(props.path)? "noindex": "index"} />

				{/* Open Graph Facebook */}
				<meta property="og:title" content={props.title} />
				<meta property="og:description" content={props.description} />
				<meta property="og:url" content={url} />
				<meta property="og:site_name" content={appName} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={logoUrl} />

				{/* Twitter */}
				<meta name="twitter:title" content={props.title} />
				<meta name="twitter:description" content={props.description} />
				<meta name="twitter:url" content={url} />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:image" content={logoUrl} />
				<meta name="twitter:creator" content="@mus2cardoso" />
                
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AuthProvider recall={props.recall}>
				{ /auth\//.test(props.path) ? <main id="app">{props.children}</main> : renderCommon() }
			</AuthProvider>
		</React.Fragment>
	)
}