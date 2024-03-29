import React, {useState, useEffect } from "react";
import { save as onlineSave } from "../../services/firebase/entities/phrases";
import { isMobile } from "../../services/requests";
import { getLanguage, save as offlineSave } from '../../services/storage';


const instance = () =>{
	if(typeof window === "undefined") return {}
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	const mic = new SpeechRecognition()
	mic.continuous = true
	mic.interimResults = true
	console.log(getLanguage())
	// mic.lang = getLanguage()
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
	const [micLang, setMicLang] = useState("en-US")
	const [translation, setTranslation] = useState('')
	
	useEffect(() => {
		handleListening()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isListning])
	
	const comparePhrases = (transcoder) => {
		if(phrase && phrase.trim() && transcoder && transcoder.trim()){
			const wordTarget = phrase.toLowerCase().replace(/\n/ig, ' ').replace(/(\,|\.|\!|\?)/g,'').split(' ').filter(n => n.trim())
			const wordOrigin = transcoder.toLowerCase().split(' ')
			const missing = []
			
			wordTarget.map((wd, index) =>{
				if(index in wordOrigin && !(wordOrigin[index] === wd)){
					if(!(/\w\*\*\*/.test(wordOrigin[index]))){
						missing.push(wd)
					}
				}
				return wd
			})
			let reason = {
				status: false,
				message: "Lamento, sua pronúncia está incorreta, tente novamente."
			}
			
			if(missing.length===0 && wordTarget.length === wordOrigin.length){
				reason = {
					status: true,
					message: "Maravilha!! sua pronúncia está correta"
				}
			}
			setPhraseReason(reason)
		}
	}

	const onTranslate = (note) => {
		setTranslation(note)
	}
	
	const handleListening = () => {
		if(isListning){
			try {
				mic.lang = micLang
				setNote('')
				onTranslate('')
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
		
		mic.onstart = () => {console.log(`recording in ${mic.lang}...`)}
		mic.onaudiostart = () => {
			setStartRecord(true)
		}
		mic.onaudioend = (e) => {
			comparePhrases(note)
			onTranslate(note)
			setStartRecord(false)
		}

		mic.onresult = event => {
			let transcript = Array.from(event.results)
			let isFinal = false
			let allowClose = props.detectSpeak ?? false
			let isMany  = props.isMany ?? false
			if(isMany || !allowClose){
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

			if(allowClose && isFinal && !isMobile()){
				setIsListining(false)
			}

			mic.onerror = event => console.log(event.error)
		}
	}

	const handleSaveNote = async (saveCloud, next) => {
		try {
			if(phraseReason && "status" in phraseReason){
				var promises = [offlineSave(phrase, phraseReason.status, saveCloud, micLang)]
				if(saveCloud)
					promises.push(onlineSave(phrase, phraseReason.status, micLang))
				
				return Promise.all(promises).then(_ => {
					setNote('')
					setPhraseReason({})
					next(true, `Texto salvo nos dados do navegador ${saveCloud ? " e na nuvem": ""}`)
				}, err => {
					next(false, err.message || "Não foi possível salvar frase")
				})
			}
			
			return next(false, "Não há nada novo para salvar!")
		} catch (error) {
			next(false, "Não foi possível salvar frase")
		}
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
			handleSaveNote,
			micLang,
			setMicLang,
			translation,
			onTranslate,
			closeOnSpeakend: (props.isMany === undefined ? false: props.isMany)
		})}
		</>
	)
}