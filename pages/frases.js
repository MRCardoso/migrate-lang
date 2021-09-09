import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getWords, removeWord } from "../services/storage";

import Capsule from '../components/Capsule';

export default function Phrase(){
	const [words, setWords] = useState([])
	useEffect(() => { reload() }, [])
	
	const reload = () =>{
		setWords(getWords())
	}
	const onRemove = (index) =>{
		removeWord(index) && reload()
	}
	return (
		<Capsule
			title="Frase cadastradas"
			description="Lista com as frases escolhidas pelo usuário para futuros exercicios."
			path="frases"
			displayFooter={false}
			>
			<section className="flex-center">
				{words.length > 0?
					words.map((word, index) => {
						return (
							<div key={index} className="list flex-between">
								<div>{word}</div>
								<Button variant="danger" onClick={() => onRemove(word)}>
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