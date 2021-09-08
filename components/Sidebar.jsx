import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import { Container, Nav, Navbar } from "react-bootstrap"
import Lang from "./Lang"

export default function Sidebar() {

	return (
		<Navbar bg="light" expand="lg" fixed="top">
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
                        <Link href="/formulario" className="active">
                            <a className="nav-link">Formulário</a>
                        </Link>
                        <Link href="/frases-salvas">
                            <a className="nav-link">Frases salvas</a>
                        </Link>
					</Nav>
				</Navbar.Collapse>
				<Lang />
			</Container>
		</Navbar>
	)
}