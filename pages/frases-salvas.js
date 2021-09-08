import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getWords, removeWord } from "../services/storage";

import Footer from '../components/Footer'
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
			title="Formulário diferente"
			description="Aplicação react para exercitar conhecimentos e pratica do inglês"
			keywords="SPA, speech, english, practice, web developer, english test, speaking english, english exercise, migrate language, pratique inglês, mardozux"
			>
			<main className="scape-sidebar">

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
			</main>
			<Footer />
		</Capsule>
	)
}