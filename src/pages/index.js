import React from "react";

import Link from "next/link";
import Card from '../components/Card'
import Recognizer from '../components/Recognizer'
import SpeechCompare from "../components/SpeechCompare";
import Capsule from '../components/Capsule';
import Tips from '../components/Tips';
import { Container, Nav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import Image from 'next/image'

export default function Home() {
	const cards = [
		{
			title: "Como funciona esta aplicação",
			message: [
				"Pratique A fala com uma frase definida por você e compare sua pronúncia",
				"Traduza a frase preenchida para ver como está saindo sua escrita",
				"Escute a frase preenchida para ajudá-lo no seu aprendizado",
				"Alterne entre os idiomas(Inglês e Português) para falar, traduzer, ou ouvir",
				"Acesse as 'Histórias' e pratique com pequenos contos",
				"Salve as frases que mais sentir necessidade de praticar mais, seja privado em seu navegador, ou publíco em uma base de dados na nuvem",
				"Espero que esta aplicação ajude mesmo que pouco em seu caminho de uma nova língua, pois isso será bom para todos."
			] 
			
		}
	]

	return (
		<Capsule
			title="Pratique sua pronúncia do inglês"
			description="Aplicação para praticar e melhorar a pronunciação do inglês, rumo a proficiência."
			path=""
			displayFooter={true}
			displayTitle={false}
			useContainer={false}
		>
			<article className="flex-home black-purple">
				<Container>
					<h3 className="text-center">Esse é um site com apps feitos para ajudá-lo no aprendizado do inglês.</h3>
					<Recognizer isMany={false}>
						<SpeechCompare />
					</Recognizer>
					<section>
						<h4 className="text-center">Essas são as ferramentas</h4>
						<aside className="app-features mt-4">
							<div className="app-features-card">
								<h6><i className="fa fa-language mh-x2"></i>Tradutor</h6>
								<p>
									Traduza seus texto e frases aqui
								</p>
								<Link href="/translate">
									<a title="historias" className="w-100 btn btn-secondary">Acesse aqui</a>
								</Link>
							</div>
							<div className="app-features-card">
								<h6><i className="fa fa-book mh-x2"></i>Histórias</h6>
								<p>
									Aprenda com pequenas histórias, pratique enquanto lê, aprenda enquanto conhece novos mundos
								</p>
								<Link href="/imagineer">
									<a title="historias" className="w-100 btn btn-secondary">Acesse aqui</a>
								</Link>
							</div>
							<div className="app-features-card">
								<h6><i className="fa fa-gamepad mh-x2"></i>Jogue um jogo</h6>
								<p>
									Este é um simples jogo desenvolvido para ajuda-lo com a pronúncia enquanto progride e atinge seu maior score
								</p>
								<Link href="https://mardozux.itch.io/the-imaginner">
									<a title="The imaginner Game" className="w-100 btn btn-secondary" target="_blank" rel="noreferrer">Acesse aqui</a>
								</Link>
							</div>
						</aside>
					</section>
				</Container>
			</article>
			<article className="container">
				<div className="d-flex justify-content-center align-items-center">
					<Image src="/logo.png" alt="Logo Marca" width={228} height={220} />
					<div>
						<div className="mh-x2 mb-4">
							<h3>Está gostando desta aplicação, esta lhe ajudando no aprendizado?</h3>
							<p>Considere contribuir para ajudar a este projeto a crescer e sempre trazer novidades no seu aprendizado.</p>

							<form action="https://www.paypal.com/donate" method="post" target="_top">
								<input type="hidden" name="business" value="5GLEV64R9MAEU" />
								<input type="hidden" name="no_recurring" value="1" />
								<input type="hidden" name="item_name" value="Uma aplicacao com reconhecimento de fala pra praticar a pronuncia do ingles, em busca da proficiencia" />
								<input type="hidden" name="currency_code" value="BRL" />
								<input type="image" src="https://www.paypalobjects.com/pt_BR/BR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Faça doações com o botão do PayPal" />
								<img alt="Doar valor" border="0" src="https://www.paypal.com/pt_BR/i/scr/pixel.gif" width="1" height="1" />
							</form>
						</div>
					</div>
				</div>
				<hr />
			</article>
			<article className="container text-center">
				<h4>Conheça grammarly</h4>
				<p>
					Baixe este plugin em seu navegador, ele irá ajudá-lo a criar seus texto, com uma gramárica próxima do inglês nátivo.
				</p>
				<a href="https://www.grammarly.com/" className="btn btn-sm btn-secondary" target="_blank" rel="noreferrer">
					<i className="fa fa-puzzle-piece"></i> grammarly
				</a>
				<hr />
			</article>
			{/* <article className="flex-center container mt-4">
				{cards.map(c => {
					return (
						<div key={c.title}>
							<h4 className="text-center mb-4">{c.title}</h4>
							{c.message.map((t, i) =><p key={i}>{t}</p>)}
							<hr />
						</div>
					)
				})}
			</article> */}

			<article className="flex-center container">
				<Tips />
			</article>
			
		</Capsule>
	)
}