import React, { useEffect, useState } from "react";
import { Alert, OverlayTrigger, Tooltip, Spinner, Button, Form} from "react-bootstrap"
import {alphabetValues, copy, enabledCloud } from '../services/utils'
import { list as onlineList, remove as onlineRemove } from "../services/firebase/entities/phrases"
import { list as offlineList, remove as offlineRemove } from "../services/storage";
import { useAuth } from "../contexts/AuthContext";

export default function Phrases(props){
	const isModal = (typeof props.isModal === "undefined" ? false : props.isModal)
	const [database, setDatabase] = useState("offline")
	const [phrases, setPhrases] = useState([])
	const [phrasesRaw, setPhrasesRaw] = useState([])
	const [cacheOnline, setCacheOnline] = useState(false)
	const [loading, setLoading] = useState(true)
	const [disableAction, setDisableAction] = useState(false)
	const [filter, setFilter] = useState({text:"",letter:""})
	const [letters, setLetters] = useState([])
    const {setMessager} = useAuth()
	
	useEffect(() => {
		loadData(database)
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
		setDatabase(value)
		refreshData([])
		setLoading(true)

		try {
			if(value === "online"){
				if(cacheOnline === false){
					phrases = await onlineList()
					setCacheOnline(phrases)
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
            if (database === "online"){
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
					{!isModal && database==="offline"?
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
				<div className="pronounce-filters">
					<div style={{display: 'flex', flexDirection:'column'}}>
						<span className="mb-2" style={{verticalAlign:'bottom'}}>Base de dados</span>
						<div>
							<button className={`btn btn-sm btn-${database === "offline"?"primary":"light"}`} style={{flex: 1, margin: '0 2px'}} onClick={() => loadData("offline")}>Privado</button>
							{enabledCloud?
							<button className={`btn btn-sm btn-${database === "online"?"primary":"light"}`} style={{flex: 1, margin: '0 2px'}} onClick={() => loadData("online")}>Público</button>
							:""}
						</div>
					</div>
					
					<hr />
					<div key="filter-letter" className="mt-4 mb-4">
						<h6 className="mb-2">Filter por letra</h6>
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
					
					<hr />
					
					<Form.Group className="mb-3" controlId="formSearchWord">
						<Form.Label>Buscar</Form.Label>
						<Form.Control type="email" value={filter.text} autoComplete="off" onChange={e => setFilter({...filter, text: e.target.value})} placeholder="Busque por uma frase..." />
					</Form.Group>
				</div>
			{ 
				loading ? 
				<div className="d-flex align-items-center justify-content-center" style={{minHeight: '50vh'}}>
					<Spinner animation="grow" />
				</div>
				: 
				phrases.length > 0?  renderPhrases() :
				<Alert variant="warning" className="mt-2">
					{filter.text? `Nenhuma frase encontrada para a busca "${filter.text}"` : "Nenhuma frase foi encontrada"}
				</Alert>
			}
			</section>
		</>
	)
}