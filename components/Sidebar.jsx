import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import { Container, Nav, Navbar, Button } from "react-bootstrap"
import Lang from "./Lang"

export default function Sidebar({activeScroll}) {

	const thirdPart = [
        {url: 'https://www.linkedin.com/in/mrcardoso/', icon: 'linkedin', label: "Linkedin"},
        {url: 'https://github.com/MRCardoso/migrate-lang/issues', icon: 'git' },
        {url: 'https://www.facebook.com/mardozux', icon: 'facebook-square', label: "Página no facebook"},
        {url: 'https://www.instagram.com/mardozux/', icon: 'instagram', label: "Instagram de game developer"},
        {url: 'https://mardozux.itch.io/', icon: 'gamepad', label: "Jogos publicados" },
    ]
	const paths = [
		{uri: '/formulario', label: 'Formulário'},
		{uri: '/frases', label: 'Frases'},
		{uri: '/artigos', label: 'Artigos'},
		{uri: '/randomize', label: 'Randomize'},
		{uri: '/sobre', label: 'Sobre'},
	]

	return (
		<header>
			<Navbar className={activeScroll ? 'black-purple fixed-top': ''} expand="lg">
				<Container>
					<Link href="/">
						<a className="navbar-brand">
						<Image
							src="/logo.png"
							alt="Logo Marca"
							width={60}
							height={40}
							/>
						</a>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							{paths.map(p => {
								return (
									<Link key={p.uri} href={p.uri} className="active">
										<a className="nav-link">{p.label}</a>
									</Link>
								)
							})}
						</Nav>
						<Nav className="me-right links-outline">
							{thirdPart.map(t => {
								return (
									<a key={t.icon} href={t.url} target="_blank" rel="noreferrer" title={t.label}>
										<i className={`fa fa-${t.icon}`}></i>
									</a>
								)
							})}
						</Nav>
						<Lang />
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}