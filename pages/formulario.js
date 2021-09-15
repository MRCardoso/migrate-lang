import React, { useState } from "react";
import {Button, Form, Alert} from 'react-bootstrap';

import Recognizer from "../components/Recognizer";
import SpeechInput from "../components/SpeechInput";
import Capsule from '../components/Capsule';
import Card from '../components/Card';
import { getDateFromValue, setArticle } from '../services/storage';
import ToastModal from "../components/ToastModal";

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

	const renderMessages = () => {
		if(error.length > 0){
			return (<ul>{error.map((e,i) => <li key={i}>{e}</li>)}</ul>)
		}
		if(success){
			return "Formulário salvo com sucesso."
		}
		return null
	}

	const renderMessageOut = () => (error.length > 0 ? setError([]) : (success ? setSuccess(false) : null))
	const renderMessageColor = () => (error.length > 0 ? "danger" : (success ? "success" : "secondary"))

	return (
		<Capsule 
			title="Formulário por voz"
			description="Utilize sua fala para preencher campos do formulário, também crie uma chave aleatória."
			path="formulario"
			displayFooter={true}
			>
			<ToastModal message={renderMessages()} onClose={renderMessageOut} variant={renderMessageColor()} />

			<section className="flex-center full-height">
				<Card title="Campos preenchidos por fala" message={messages} />	
				<Form>
					<Recognizer isMany={false}>
						<SpeechInput 
							type="text"
							title="Título"
							placeholder="Defina seu título"
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
							placeholder="Ex: january 01 2021"
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
							placeholder="Ex: december 31 2021"
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
							placeholder="Defina sua mensagem"
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
					Salvar
				</Button>
			</section>
		</Capsule>
	)
}