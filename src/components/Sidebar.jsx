import React, {useState} from "react";
import Link from 'next/link'
import { Container, Nav, Navbar, Form} from "react-bootstrap"

export default function Sidebar({activeScroll, currentPath}) {
	const paths = [
		{uri: '/frases', label: 'Frases', icon: 'quote-right'},
		{uri: '/falar', label: 'Falar', icon: 'microphone'},
		{uri: '/traduzir', label: 'Traduzir', icon: 'language'},
		{uri: '/historias', label: 'Histórias', icon: 'book'},
		{uri: '/dicas', label: 'Dicas', icon: 'info'},
	];
	const indexPaths = [];
	const isCurrentLink = (value) => {
		if(currentPath){
			return new RegExp(currentPath).test(value)
		}
		return false
	}
	
	if(!currentPath) {
		indexPaths.push({uri: '#contato', label: "Contato"})
	}
	return (
		<header>
			<Navbar className={`black-purple ${activeScroll ? 'border-buttom-white fixed-top': ''}`} expand="lg">
				<Container>
					<Link href="/">
						<a className="navbar-brand text-white">Megrolang</a> 
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto"></Nav>
						<Nav className="me-right">
							{currentPath!==""? 
								paths.map(p => {
									return (
										<Link key={p.uri} href={p.uri}>
											<a className={'nav-link '+(isCurrentLink(p.uri) ? 'active-link' : '')}>
												{p.icon ? <i className={`mh-x2 fa fa-${p.icon}`}></i> : ''}
												{p.label}
											</a>
										</Link>
									)
								})
							:""}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}