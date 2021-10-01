import React from "react";

import Link from "next/link";
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
		>
			<article className="flex-center mt-4">
				<Recognizer isMany={false}>
					<Speech />
				</Recognizer>
				<Link href="/imagineer">
					<a className="w-100 btn btn-primary" title="historias">Aprenda atravez de histórias</a>
				</Link>
				<div className="d-flex w-100 justify-content-center">Ou</div>
				<Link href="/imagineer/create">
					<a className="w-100 mb-4 btn btn-primary" title="historias">
						<i className="fa fa-plus"></i> Crie suas próprias
					</a>
				</Link>
				<p className="d-flex justify-content-center">
					Baixe a extensão
					<a href="https://www.grammarly.com/" className="btn btn-sm btn-secondary mh-x2" target="_blank" rel="noreferrer">
						<i className="fa fa-puzzle-piece"></i> grammarly
					</a>
					em seu navegador, para ajudar com a gramática.
				</p>
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