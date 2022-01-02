import React, { useEffect, useState } from "react";
import { Alert, OverlayTrigger, Tooltip, Spinner, Button, Form, Accordion} from "react-bootstrap"
import {alphabetValues, copy, enabledCloud } from '../services/utils'
import { list as onlineList, remove as onlineRemove } from "../services/firebase/entities/phrases"
import { list as offlineList, remove as offlineRemove } from "../services/storage";
import { useAuth } from "../contexts/AuthContext";
import { PAGE_SIZE } from "../services/firebase/crud";
import Paginator from "./Paginator";

export default function Phrases(props){
	const isModal = (typeof props.isModal === "undefined" ? false : props.isModal)
	const [isOnline, setIsOnline] = useState(true)
	const [phrases, setPhrases] = useState([])
	const [phrasesRaw, setPhrasesRaw] = useState([])
	const [cacheOnline, setCacheOnline] = useState(false)
	const [loading, setLoading] = useState(true)
	const [disableAction, setDisableAction] = useState(false)
	const [filter, setFilter] = useState({text:"",letter:""})
	const [letters, setLetters] = useState([])
	const [paginator, setPaginator] = useState(null)
    const {setMessager} = useAuth()
	
	useEffect(() => {
		loadData(isOnline)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		if(phrasesRaw.length > 0){
			let newPhrases = []
			if(filter.letter !== "" || filter.text !== ""){
				for (let i=0;i<phrasesRaw.length; i++){
					const p = phrasesRaw[i]
					if(filter.text !== ""){
						const valueItem = filter.text.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
						if(!(new RegExp(valueItem).test(p.content.toLowerCase()))){
							continue;
						}
					}
					if(filter.letter !== "" && p.content[0].toUpperCase() !== filter.letter){
						continue
					}
					newPhrases.push(p)
				}
			} else{
				newPhrases = phrasesRaw
			}

			setPhrases(newPhrases)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter])

	const copyText = (text) =>{
		if(copy(text)){
			setMessager({message: "texto copiado para a área de transferência", variant: "success"})
		}
	}

	const refreshData = (phrases) => {
		const letterArray = []
		phrases.sort((a, b) => a.content.localeCompare(b.content))
		phrases.forEach(phrase => {
			const l = phrase.content[0].toUpperCase()
			if(letterArray.indexOf(l) === -1) letterArray.push(l)
		})
		
		setLetters(letterArray)
		setPhrasesRaw(phrases)
		setPhrases(phrases)
	}

	const loadData = async (value) => {
		let phrases = []
		setIsOnline(value)
		refreshData([])
		setLoading(true)

		try {
			if(value){
				if(cacheOnline === false){
					const onData = await onlineList(PAGE_SIZE, null)
					phrases = onData.items
					setPaginator(onData.paginator)
					setCacheOnline(onData.items)
				} else{
					phrases = cacheOnline
				}
			}
			else{
				phrases = await offlineList()
			}
	
			refreshData(phrases)
		} catch (error) {
			setMessager({message: error.message || "Não foi possível baixar frases", variant: "danger"})
		}
		
		setLoading(false)
	}
	
	const onRemove = async ({id}) =>{
		setDisableAction(true)
		try {
            if (isOnline){
                await onlineRemove(id)
            } else{
                await offlineRemove(id)
            }
			refreshData(phrasesRaw.filter(p => p.id!==id))
		} catch (error) {
			setMessager({message: error.message, variant: "danger"})
		}
		setDisableAction(false)
	}

	const renderPhrases = () => {
		const content = []
		phrases.forEach((phrase, index) => {
			content.push(
				<div key={index} className="list">
					<div className="list-phrase">
						<header>
							<i aria-label="Copiar texto" onClick={() => isModal && props.onSelectPhrase ? props.onSelectPhrase(phrase.content) : copyText(phrase.content) } className="clicable mh-x2 fa fa-copy"></i>
							<strong style={{margin: '0 4px'}}>{phrase.content}</strong>
						</header>
					</div>
					<div className="list-pronounce">
						{/* <strong>Pronúncias</strong> */}
						<OverlayTrigger placement="bottom" overlay={<Tooltip>Pronúncias corretas</Tooltip>}>
							<div className="text-success shadow-success">
								<i aria-label="Pronúncias corretas" className="fa fa-check-circle"></i> {phrase.hit}
							</div>
						</OverlayTrigger>
						<OverlayTrigger placement="bottom" overlay={<Tooltip>Pronúncias erradas</Tooltip>}>
							<div className="text-danger shadow-danger">
								<i aria-label="Pronúncias erradas" className="fa fa-exclamation-circle"></i> {phrase.fail}
							</div>
						</OverlayTrigger>
					</div>
					{!isModal && !isOnline?
					<OverlayTrigger placement="bottom" overlay={<Tooltip>Remover pronúncia</Tooltip>}>
						<Button disabled={disableAction} size="sm" variant="danger" aria-label="Remover frase" onClick={() => onRemove(phrase)}>
							<i className="fa fa-times-circle"></i>
						</Button>
					</OverlayTrigger>
					:""}
				</div>
			)
		})

		return content
	}

	return (
		<>
			<section className="flex-center" style={{minHeight: '100vh'}}>
				{
					enabledCloud('phrases')
					? <Form.Check type="switch" className="mb-2" id="is-database-online" label="Base de dados online" checked={isOnline} onChange={() => loadData(isOnline ? false : true)} /> 
					: ''
				}
				<Accordion flush>
					<Accordion.Item eventKey="0">
						<Accordion.Header>Busca avançada</Accordion.Header>
						<Accordion.Body>
							<div key="filter-letter" className="mt-4 mb-4">
								{/* <h6 className="mb-2">Filtrar</h6> */}
								{alphabetValues.map(letter => {
									if(letters.indexOf(letter) !== -1){
										return <button key={letter}
													className={`btn btn-sm btn-${filter.letter == letter ? 'primary': 'secondary'}`}
													style={{margin: '0 2px'}}
													onClick={() => setFilter({...filter, letter: filter.letter === letter ? "" : letter})}
												>{letter}</button>
									}
									return <span key={letter} className="btn btn-sm" style={{margin: '0 2px'}}>{letter}</span>
								})}
							</div>
							<Form.Group className="mb-3" controlId="formSearchWord">
								{/* <Form.Label>Buscar</Form.Label> */}
								<Form.Control type="email" value={filter.text} autoComplete="off" onChange={e => setFilter({...filter, text: e.target.value})} placeholder="Busque por uma frase..." />
							</Form.Group>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			{ 
				loading ? 
				<div className="d-flex align-items-center justify-content-center" style={{minHeight: '50vh'}}>
					<Spinner animation="grow" />
				</div>
				: 
				<>
					{isOnline ? <Paginator pager={paginator} request={onlineList} response={refreshData} /> : ''}
					{phrases.length > 0?  renderPhrases() :
					<Alert variant="warning" className="mt-2">
						{filter.text? `Nenhuma frase encontrada para a busca "${filter.text}"` : "Nenhuma frase foi encontrada"}
					</Alert>}
				</>
			}
			</section>
		</>
	)
}