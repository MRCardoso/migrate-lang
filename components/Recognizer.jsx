import React, {useState, useEffect } from "react";
import { getLanguage, setWord } from '../services/storage';


const instance = () =>{
	if(typeof window === "undefined") return {}
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	const mic = new SpeechRecognition()
	mic.continuous = true
	mic.interimResults = true
	console.log(getLanguage())
	mic.lang = getLanguage()
	return mic
}

const mic = instance()

export default function Recognizer(props){
	const [isListning, setIsListining] = useState(false)
	const [phrase, setPhrase] = useState('')
	const [note, setNote] = useState('')
	const [saveNotes, setSaveNotes] = useState([])
	const [phraseReason, setPhraseReason] = useState({})
	const [startRecord, setStartRecord] = useState(null)
	
	useEffect(() => {
		handleListening()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isListning])
	
	const comparePhrases = (transcoder) => {
		if(phrase && phrase.trim()){
			const wordTarget = phrase.toLowerCase().replace(/\n/ig, ' ').split(' ').filter(n => n.trim())
			const wordOrigin = transcoder.toLowerCase().split(' ')
			const missing = []
			wordTarget.map((wd, index) =>{
				if(index in wordOrigin && !(wordOrigin[index] === wd)){
					missing.push(wd)
				}
				return wd
			})
			let reason = {
				status: false,
				message: "Lamento, houve alguns erros em sua pronúncia, tente novamente."
			}
			if(missing.length===0){
				reason = {
					status: true,
					message: "Maravilha!! sua pronúncia esta certa"
				}
			}
			setPhraseReason(reason)
		}
	}
	
	const handleListening = () => {
		if(isListning){
			try {
				setNote('')
				setPhraseReason({})
				mic.start()
				mic.onend = ()=> { mic.start() }
			} catch (error) {
				console.warn(error)
				mic.stop()	
			}
		} else{
			mic.stop()
			mic.onend = () => console.log('end')
		}
		
		mic.onstart = () => {console.log('Mic is on')}
		mic.onaudiostart = () => {
			setStartRecord(true)
		}
		mic.onaudioend = (e) => {
			setStartRecord(false)
			comparePhrases(note)
		}

		mic.onresult = event => {
			let transcript = Array.from(event.results)
			let isFinal = false
			if(!phrase && (props.isMany === undefined || props.isMany)){
				transcript = transcript.map(result => result[0].transcript)

				if(transcript.indexOf("X") !== -1 || transcript.indexOf("x") !== -1){
					setNote('')
					mic.stop()
					return
				}
			} else{
				transcript = transcript.pop()
				isFinal = transcript.isFinal
				transcript = [transcript[0].transcript.trim()]
			}
			
			transcript = transcript.join('')
			setNote(transcript)

			if(isFinal){
				setIsListining(false)
			}

			mic.onerror = event => console.log(event.error)
		}
	}

	const handleSaveNote = () => {
		setWord(note)
		setNote('')
	}

	return (
		<>
		{React.cloneElement(props.children, {
			isListning, 
			phrase, 
			note, 
			saveNotes, 
			phraseReason,
			startRecord,
			setIsListining,
			setPhrase,
			setNote,
			setSaveNotes,
			setPhraseReason,
			handleListening,
			handleSaveNote
		})}
		</>
	)
}