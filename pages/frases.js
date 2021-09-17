import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getWords, removeWord } from "../services/storage";

import Capsule from '../components/Capsule';
import { list } from "../services/collections/phrases";

export default function Phrase(){
	const [words, setWords] = useState([])
	useEffect(async () => {
		// reload()
		const phrases = await list()
		setWords(phrases)
	}, [])

	const reload = () =>{
		// setWords(getWords())
	}
	const onRemove = (index) =>{
		removeWord(index) && reload()
	}
	return (
		<Capsule
			title="Frase cadastradas"
			description="Lista com as frases escolhidas pelo usuário para futuros exercícios."
			path="frases"
			displayFooter={false}
			>
			<section className="flex-center">
				{words.length > 0?
					words.map((word, index) => {
						return (
							<div key={index} className="list flex-between">
								<div className="list-phrase">
									<header>
										<h4>{word.content}</h4>
									</header>
									<div className="list-pronounce">
										<strong>Pronúncias</strong>
										<span className="text-success">
											{/* <i className="fa fa-check-circle"></i> */}
											{word.hit} Acertos
										</span>
										<span className="text-danger">
											{/* <i className="fa fa-exclamation-circle"></i> */}
											{word.fail} Erros
										</span>
									</div>
								</div>
								<Button variant="danger" aria-label="Remover frase" onClick={() => onRemove(word)}>
									<i className="fa fa-times-circle"></i>
								</Button>
							</div>
						)
					})
				:
				<Alert variant="warning">
					Não ha nenhuma frase salva em sua base de dados local
				</Alert>
				}
			</section>
		</Capsule>
	)
}