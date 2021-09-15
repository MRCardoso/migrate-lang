// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React from "react";

import {Row, Accordion} from "react-bootstrap";
import Card from '../components/Card'
import Recognizer from '../components/Recognizer'
import Speech from "../components/Speech";
import Capsule from '../components/Capsule';
import Tips from '../components/Tips';

export default function Home() {
	const cards = [
		{
			title: "Como funciona esta aplicação",
			message: [
				"Sua voz será capturada por seu microfone (quando houver) e será convertida em texto para ver como esta indo sua pronúncia.",
				"Você pode digitar ou colar um texto no campo da direita e ver se consegue reproduzir corretamente.",
				"Pode simplesmente ativar o microfone e exercitar seu \"speaking\" livremente, moldando as frases que sua mente imaginar.",
				"Você pode salvar (nos dados do seu navegador) as frases que ver úteis para praticar quando quizer.",
				"Espero que esta aplicação ajude mesmo que pouco em seu caminho de uma nova língua, pois isso será bom para todos."
			] 
			
		},
		{
			title: "Fácil nunca é",
			message: [
				"O inglês sempre foi um desafio para muitas pessoas, e um pesadelo para outras.",
				"E nosso sistema de ensino não ajuda, no colégio, o inglês era só uma repetição de verbo 'to be' e sempre saia sabendo menos.",
				"Mas não é algo impossível, aprender um novo idioma é algo que demanda tempo e dedicação.",
				"Como todas as coisas na vida, o segredo da excelência é a repetição ;)",

			]
		},
		{
			title: "Não lute contra a corrente.",
			message: [
				"Como tem sido a muito tempo, os EUA tem geredo tendência e padrões que são espelhadas em todo mundo.",
				"E muitas vezes vários produtos e serviços que começam a ganhar destaque aqui, já eram coisa antida a muito tempo nos paises de primeiro mundo.",
				"a verdade e difícil, mas precisa ser dita, se vc não puder se aprofundar em algum porque o inglês e um empecilho"
			]
		},
	]

	const alphabet = ["A", "B", "C", "D", "E", "F","G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
	const numbers = new Array(100).fill(0).map((_, i) => i + 1)

	return (
		<Capsule
			title="Pratique sua pronúncia do inglês"
			description="Aplicação para praticar e melhorar a pronunciação do inglês, rumo a proficiência."
			path=""
			displayFooter={true}
		>
			<article className="flex-center">
				<Row>
					<Recognizer>
						<Speech />
					</Recognizer>
				</Row>
				<Accordion defaultActiveKey="0" className="mb-4">
					<Accordion.Item eventKey="0">
						<Accordion.Header>Alfabeto</Accordion.Header>
						<Accordion.Body className="text-center">
							{alphabet.map(letter => <span key={letter} className="button-circle">{letter}</span>)}
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1">
						<Accordion.Header>Números</Accordion.Header>
						<Accordion.Body className="text-center">
							{numbers.map(numb => <span key={numb} className="button-circle">{numb}</span>)}
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>

			</article>
			
			<article className="flex-center">
				{cards.map(c => <Card key={c.title} title={c.title} message={c.message} />)}
			</article>

			<article className="flex-center">
				<Tips />
			</article>
			
		</Capsule>
	)
}