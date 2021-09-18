// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React from "react";

import {Row} from "react-bootstrap";
import Card from '../components/Card'
import Recognizer from '../components/Recognizer'
import Speech from "../components/Speech";
import Capsule from '../components/Capsule';
import Tips from '../components/Tips';
import Utilities from "../components/Utilidades";

export default function Home() {
	const cards = [
		{
			title: "Como funciona esta aplicação",
			message: [
				"Sua voz será capturada pelo microfone (quando houver) e será convertida em texto para ver como esta indo sua pronúncia.",
				"Digite ou cole um texto no campo acima, clique no icone de microfone e tente acertar sua pronúncia.",
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

	return (
		<Capsule
			title="Pratique sua pronúncia do inglês"
			description="Aplicação para praticar e melhorar a pronunciação do inglês, rumo a proficiência."
			path=""
			displayFooter={true}
		>
			<article className="flex-center mt-4">
				<Recognizer>
					<Speech />
				</Recognizer>
			</article>

			<article className="flex-center">
				{cards.map(c => <Card key={c.title} title={c.title} message={c.message} />)}
			</article>

			<article className="flex-center">
				<Utilities />
			</article>
			
			<article className="flex-center">
				<Tips />
			</article>
			
		</Capsule>
	)
}