import React from "react";
import Link from 'next/link'
import { Container, Nav, Navbar} from "react-bootstrap"
import LinkTheImaginner from "./GaEvents/LinkTheImaginner";

export default function Sidebar({activeScroll, currentPath}) {
	const paths = [
		{uri: '/falar', label: 'Falar', icon: 'microphone'},
		{uri: '/traduzir', label: 'Traduzir', icon: 'language'},
		{uri: '/historias', label: 'Histórias', icon: 'book'},
		{uri: '/frases', label: 'Frases', icon: 'quote-right'},
		{uri: '/dicas', label: 'Dicas', icon: 'info'},
	];
	const indexPaths = [
		{uri: '#sobre', label: "Sobre"},
		{uri: '#contato', label: "Contato"},
		{uri: '#doar', label: "Doar", icon: "heart"}
	];
	const isCurrentLink = (value) => {
		if(currentPath){
			return new RegExp(currentPath).test(value)
		}
		return false
	}
	return (
		<header>
			<Navbar className={`black-purple ${activeScroll ? 'border-buttom-white fixed-top': ''}`} expand="lg">
				<Container>
					<Link href="/">
						<a className="navbar-brand text-white" title="Home - Megrolang">Megrolang</a>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<LinkTheImaginner className="nav-link"><i className="mh-x2 fa fa-steam"></i></LinkTheImaginner>
						</Nav>
						<Nav className="me-right">
							{currentPath!==""? 
								paths.map(p => {
									return (
										<Link key={p.uri} href={p.uri}>
											<a className={'nav-link '+(isCurrentLink(p.uri) ? 'active-link' : '')} title={p.label}>
												{p.icon ? <i className={`mh-x2 fa fa-${p.icon}`}></i> : ''}
												{p.label}
											</a>
										</Link>
									)
								})
							: indexPaths.map(p => {
								return (
									<Link key={p.uri} href={p.uri}>
										<a className={'nav-link '+(isCurrentLink(p.uri) ? 'active-link' : '')} title={p.label}>
											{p.icon ? <i className={`mh-x2 fa fa-${p.icon}`}></i> : ''}
											{p.label}
										</a>
									</Link>
								)
							})}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}