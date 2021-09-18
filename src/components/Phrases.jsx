import React, { useEffect, useState } from "react";
import { Alert, OverlayTrigger, Tooltip, Spinner, Button} from "react-bootstrap"
import {alphabetValues, copy} from '../services/utils'
import { list as onlineList, remove as onlineRemove } from "../services/firebase/entities/phrases"
import { list as offlineList, remove as offlineRemove } from "../services/storage";
import { useAuth } from "../contexts/AuthContext";

export default function Phrases({mode}){
	const [words, setWords] = useState([])
	const [loading, setLoading] = useState(true)
	const [disableAction, setDisableAction] = useState(false)
	const [filterLetter, setFilterLetter] = useState(null)
	const [letters, setLetters] = useState([])
    const {setMessager} = useAuth()
	
	useEffect(async () => {
        let phrases = []
        if (mode === "online"){
            phrases = await onlineList()
        } else{
            phrases = await offlineList()
        }
        refreshLetters(phrases)
        setWords(phrases)
        setLoading(false)
    }, [])

	const copyText = (text) =>{
		if(copy(text)){
			setMessager({message: "texto copiado para a área de transferência", variant: "success"})
		}
	}

	const refreshLetters = phrases => {
		const letterArray = []
		phrases.forEach(phrase => {
			const l = phrase.content[0].toUpperCase()
			if(letterArray.indexOf(l) === -1) letterArray.push(l)
		})

		setLetters(letterArray)
	}

	const filterValues = (word) =>{
		if(filterLetter == null)
			return true
		return (filterLetter && word.content[0].toLowerCase() === String(filterLetter).toLowerCase())
	}
	
	const onRemove = async ({id}) =>{
		setDisableAction(true)
		try {
            if (mode === "online"){
                await onlineRemove(id)
            } else{
                await offlineRemove(id)
            }
			const newWords = words.filter(w => w.id!==id)
			refreshLetters(newWords)
			setWords(newWords)
		} catch (error) {
			setMessager({message: error.message, variant: "danger"})
		}
		setDisableAction(false)
	}
	return (
		<>
			<section className="flex-center">
			{ 
				loading ? 
				<div className="d-flex align-items-center justify-content-center" style={{minHeight: '50vh'}}>
					<Spinner animation="grow" />
				</div>
				: 
				words.length > 0? [
					<div key="filter-letter" className="d-flex justify-content-center mt-4 mb-4">
						{alphabetValues.map(letter => {
							if(letters.indexOf(letter) !== -1)
								return <button key={letter} className="btn btn-primary" style={{margin: '0 2px'}} onClick={() => setFilterLetter(filterLetter == letter ? null : letter)}>{letter}</button>
							return <span key={letter} className="btn" style={{margin: '0 2px'}}>{letter}</span>
						})}
					</div>,
					words
					.filter(filterValues)
					.map((word, index) => {
						return (
							<div key={index} className="list">
								<div className="list-phrase">
									<header>
										<i aria-label="Copiar texto" onClick={() => copyText(word.content)} className="clicable fa fa-copy"></i> 
										<strong style={{margin: '0 4px'}}>{word.content}</strong>
									</header>
								</div>
								<div className="list-pronounce">
									{/* <strong>Pronúncias</strong> */}
									<OverlayTrigger placement="left" overlay={<Tooltip>Pronúncias corretas</Tooltip>}>
										<div className="text-success shadow-success">
											<i aria-label="Pronúncias corretas" className="fa fa-check-circle"></i> {word.hit}
										</div>
									</OverlayTrigger>
									<OverlayTrigger placement="right" overlay={<Tooltip>Pronúncias erradas</Tooltip>}>
										<div className="text-danger shadow-danger">
											<i aria-label="Pronúncias erradas" className="fa fa-exclamation-circle"></i> {word.fail}
										</div>
									</OverlayTrigger>
								</div>
								<OverlayTrigger placement="right" overlay={<Tooltip>Remover pronúncia</Tooltip>}>
									<Button disabled={disableAction} size="sm" variant="danger" aria-label="Remover frase" onClick={() => onRemove(word)}>
										<i className="fa fa-times-circle"></i>
									</Button>
								</OverlayTrigger>
							</div>
						)
					})
				] :
				<Alert variant="warning">
					Nenhuma frase foi encontrada
				</Alert>
			}
			</section>
		</>
	)
}