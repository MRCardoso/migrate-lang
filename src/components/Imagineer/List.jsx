import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {Form, FloatingLabel, Button} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { getChapter, list } from '../../services/firebase/entities/histories'

export default function ImagineerList(props) {
    const {setPhrase, phraseReason, setIsListining, isListning, phrase, setPhraseReason, setNote, note} = props
    const [histories, setHistories] = useState([])
    const [history, setHistory] = useState([])
    const [chapters, setChapters] = useState([])
    const [chapterIndex, setChapterIndex] = useState(0)
    const {setMessager, setLoading} = useAuth()

    useEffect(async() => {
        try {
            setLoading(true)
            const data = await list()
            setHistories(data)
        } catch (err) {
            setMessager({variant: "danger", message: String(err)})
        }
        setLoading(false)
    }, [])
        
    const loadChapter = async (history) => {
        try {
            let data = []
            if(history!==""){
                data = await getChapter(history)
                data.sort((a, b) => a.order - b.order)
            }
            
            const h = histories.find(h => h.id===history)
            setHistory(h)
            setChapters(data)
            setNote("")
            setPhraseReason({})
            setChapterIndex(0)
        } catch (error) {
            setMessager({variant: "danger", message: "Não foi possível recuperar capítulos"})
        }
    }

    const renderValidateContent = content =>{
        const targets = content.toLowerCase().replace(/\n/ig, ' ').split(' ').filter(n => n.trim())
        const origins = note.toLowerCase().split(' ')
        return targets.map((word, index) => {
            return <span key={index} style={{fontWeight: 'bolder'}} className={`text-${index in origins && origins[index] === word.replace(/[^0-9a-z']/, '') ? 'success' : ''}`}>{word} </span>
        })
    }

    const startRecordChapter = (index, c) => {
        if(chapterIndex === index){
            setPhrase(c.content)
            setIsListining(prevState => !prevState)
        }
    }

    return (
        <div className="flex-center" style={{minHeight: '100vh'}}>
            <Link href="/imagineer/create">
                <a className="btn btn-primary mb-4" title="Criar história">Crie sua propria história</a>
            </Link>
            <FloatingLabel controlId="chooseHistory" onChange={(e) => loadChapter(e.target.value, 0)} label="Escolha uma história e pratique">
                <Form.Select aria-label="Floating label select example">
                    <option value="">Selecione</option>
                    {histories.map(h => <option key={h.id} value={h.id}>{h.content}</option>)}
                </Form.Select>
            </FloatingLabel>
            {history ?
                <div className="histories">
                    <h3 className="pt-4">{history.content}</h3>
                    <p>{note}</p>
                    {chapters.map((c, index) => {
                        return (
                        <div key={index} className={`histories-content ${chapterIndex !== index? 'histories-content-disabled': ''}`}>
                            <button type="button" className={`btn btn-${chapterIndex === index && isListning ? 'primary' : 'light'}`} onClick={() => startRecordChapter(index, c)}>
                                { chapterIndex === index && isListning ? <i className="fa fa-stop"></i> : <i className="fa fa-microphone"></i>}
                            </button>
                            <div className="clicable" onClick={e=> setChapterIndex(index)}>{chapterIndex === index && !isListning && note ? renderValidateContent(c.content) : c.content}</div>
                            {chapterIndex === index && 'status' in phraseReason ? 
                            <button type="button" className={`btn btn-${phraseReason.status ? 'success': 'danger'} btn-sm`}>
                                <i className={`fa fa-${phraseReason.status ? 'check-circle': 'exclamation-circle'}`}></i>
                            </button>
                            :''}
                        </div>
                        )
                    })}
                </div>
            :""}
            {/* {chapters.map(c => <p>{c.content}</p>)} */}
        </div>
    )
}
