import React, { useState } from "react";
import {Button, Form, Alert} from 'react-bootstrap';

import Recognizer from "../components/Recognizer";
import SpeechInput from "../components/SpeechInput";
import Capsule from '../components/Capsule';
import Card from '../components/Card';
import { getDateFromValue, setArticle } from '../services/storage';

export default function Formulary(){
	const [clearForm, setClearForm] = useState(false)
	const [error, setError] = useState([])
	const [success, setSuccess] = useState(false)
	const [title, setTitle] = useState('')
	const [message, setMessage] = useState('')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	
	const messages = [
		"Deixe de lado a digitação e de quebra aproveite pra praticar seu inglês.",
		"Ao lado do campo estará um botão para ativar o microfine e preencher o campo com sua fala, quando terminar.",
	]

	const formatDate = (value, mutate, key) => {
		const validated = getDateFromValue(value)
		mutate(validated ? validated: 'InvalidDate')
		if(key==0)
			setStartDate(validated)
		else
			setEndDate(validated)
	}
	const save = () => {
		const errors = []
		if(!title) errors.push('Título é obrigatório.')
		if(!message) errors.push('Mensagem é obrigatória.')
		if(!(startDate && startDate !== "InvalidDate")) errors.push('Inicio é obrigatório.')
		if(!(endDate && endDate !== "InvalidDate")) errors.push('Fim é obrigatório.')

		setError([...errors])
		
		if(errors.length === 0){
			const done = setArticle({title, message, startDate, endDate, id: Date.now()})
			setSuccess(done)
			setClearForm(done)
		} else{
			setSuccess(false)
		}
	}

	return (
		<Capsule 
			title="Formulário por voz"
			description="Utilize sua fala para preencher campos do formulário, também crie uma chave aleatória."
			path="formulario"
			displayFooter={true}
			>
			<section className="flex-center full-height">
				<article>
					<Card title="Campos preenchidos por fala" message={messages} />
				</article>
				<Form>
					{error.length > 0 ? 
					<Alert variant="danger"  onClose={() => setError([])} dismissible>
						Por favor corriga os erros abaixo:
						<ul>
							{error.map((e,i) => <li key={i}>{e}</li>)}
						</ul>
					</Alert> 
					: (
						success ? 
						<Alert variant="success"  onClose={() => setSuccess(false)} dismissible>
							Formulário salvo com sucesso.
						</Alert> 
						: ''
					)}
					<Recognizer isMany={false}>
						<SpeechInput 
							type="text"
							title="Título"
							clearField={clearForm}
							clearOnEnd={true}
							refreshOrigin={value => setTitle(value) }
							callback={value => setTitle(value)}
							disabled={false}
							printNote={true}
							hasLabel={true}
						/>
					</Recognizer>
					<Recognizer isMany={false}>
						<SpeechInput
							type="text"
							title="Inicio"
							clearField={clearForm}
							clearOnEnd={true}
							refreshOrigin={value => setStartDate(value) }
							callback={(value, mutate) => formatDate(value, mutate, 0)}
							disabled={false}
							printNote={true}
							hasLabel={true}
						/>
					</Recognizer>
					<Recognizer isMany={false}>
						<SpeechInput
							type="text"
							title="Fim"
							clearField={clearForm}
							clearOnEnd={true}
							refreshOrigin={value => setEndDate(value) }
							callback={(value, mutate) => formatDate(value, mutate, 1)}
							disabled={false}
							printNote={true}
							hasLabel={true}
						/>
					</Recognizer>
					<Recognizer>
						<SpeechInput
							type="textarea"
							title="Mensagem"
							clearField={clearForm}
							clearOnEnd={true}
							refreshOrigin={value => setMessage(value) }
							callback={value => setMessage(value)}
							disabled={false}
							printNote={true}
							hasLabel={true}
						/>
					</Recognizer>
				</Form>

				<Button variant="primary" type="button" aria-label="Salvar" className="mt-4" onClick={save}>
					<i className="fa fa-save"></i> Salvar
				</Button>
			</section>
		</Capsule>
	)
}