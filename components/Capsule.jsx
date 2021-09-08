import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Head from 'next/head'

import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default function Capsule(props) {
	return (
		<div className="container">
			<Sidebar />
			<Head>
				<title>{props.title}</title>
				<meta name="description" content={props.description} />
                <meta name="keywords" content={props.keywords} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
            {props.children}
			<Footer />
		</div>
	)
}
