import React, {useState} from "react";
import Link from 'next/link'
import Image from 'next/image'
import { Container, Nav, Navbar, Form} from "react-bootstrap"
import Lang from "./Lang"

export default function Sidebar({activeScroll, currentPath}) {
	const [colorPicker, setColorPicker] = useState("#EAEBFD")
	const thirdPart = [
        {url: 'https://www.linkedin.com/in/mrcardoso/', icon: 'linkedin', label: "Linkedin"},
        {url: 'https://github.com/MRCardoso', icon: 'git' },
        {url: 'https://www.facebook.com/mardozux', icon: 'facebook-square', label: "Página no facebook"},
        {url: 'https://www.instagram.com/mardozux/', icon: 'instagram', label: "Instagram de game developer"},
        {url: 'https://mardozux.itch.io/', icon: 'gamepad', label: "Jogos publicados" },
    ]
	const paths = [
		{uri: '/utilidades', label: 'Utilidades'},
		{uri: '/frases', label: 'Frases'},
	]
	const isCurrentLink = (value) => {
		if(currentPath){
			return new RegExp(currentPath).test(value)
		}
		return false
	}
	const setCollor = (value) => {
		document.body.style = `background: ${value} !important`
		setColorPicker(value)
	}
	if(!currentPath) paths.push({uri: '#contato', label: "Contato"})

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
									<Link key={p.uri} href={p.uri}>
										<a className={'nav-link '+(isCurrentLink(p.uri) ? 'active-link' : '')}>{p.label}</a>
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
						<Form.Control type="color" value={colorPicker} onChange={e => setCollor(e.target.value)} title="Escolha uma cor" />
						<Lang />
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}