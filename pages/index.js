// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React from "react";

import {Row} from "react-bootstrap";
import Card from '../components/Card'
import Recognizer from '../components/Recognizer'
import Speech from "../components/Speech";
import Capsule from '../components/Capsule';
import Tips from '../components/Tips';

export default function Home() {
	const cards = [
		{
			title: "Objetivo",
			message: [
				"Você pode copiar uma frase/palavra no campo texto e praticar algumas palavras que tenha mais dificuldade em falar.",
				"Você pode salvar as frases que ver úteis para futuras conferências/práticas no dados do seu navegador.",
				"Logo virá um jogo para PC, que usará esta base de palavras geradas nesta aplicação como mecânica base do mesmo, então fique de olho, assim que o game estiver pronto, ele será baixado aqui, assim como no portfólio também.",
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
			<article className="flex-center full-height" id="block-speech">
				<Row>
					<Recognizer>
						<Speech />
					</Recognizer>
				</Row>
			</article>
			
			<article className="flex-center" id="block-cards">
				{cards.map(c => <Card key={c.title} title={c.title} message={c.message} />)}
			</article>

			<article className="flex-center" id="block-tips">
				<Tips />
			</article>
			
		</Capsule>
	)
}