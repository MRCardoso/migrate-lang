import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {Form, FloatingLabel, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { getChapter, list } from '../../services/firebase/entities/histories'

export default function ImagineerList(props) {
    const {setPhrase, phraseReason, setIsListining, isListning, startRecord, setPhraseReason, setNote, note} = props
    const [histories, setHistories] = useState([])
    const [history, setHistory] = useState(null)
    const [chapters, setChapters] = useState([])
    const [chapterIndex, setChapterIndex] = useState(0)
    const [stateChapters, setStateChapters] = useState([])
    const [chaptersCache, setChaptersCache] = useState({})
    const {setMessager, setLoading} = useAuth()

    // run in component creating
    useEffect(() => {
        async function loadApi(){
            try {
                setLoading(true)
                const data = await list()
                setHistories(data)
                updateProps(null, [])
            } catch (err) {
                console.log({err})
                setMessager({variant: "danger", message: "Não foi possível baixar histórias"})
            }
            setLoading(false)
        }

        loadApi()
        return () => {
            setChaptersCache({})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(startRecord === false){
            const items = [...stateChapters]
            let hit = phraseReason.status === true ? 1 : 0
            let fail = phraseReason.status === false ? 1 : 0
            
            if(items[chapterIndex]) {
                hit += items[chapterIndex].hit
                fail += items[chapterIndex].fail
            }

            console.log(phraseReason, chapterIndex, hit, fail)

            items[chapterIndex] = {hit, fail}
            setStateChapters(items)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[startRecord])

    const updateProps = (h, c) =>{
        setHistory(h)
        setChapters(c)
        setNote("")
        setStateChapters([])
        setPhraseReason({})
        setChapterIndex(0)
    }

    const loadChapter = async (history) => {
        setLoading(true)
        try {
            let data = []
            if(history!==""){
                if(chaptersCache[history]){
                    data = chaptersCache[history]
                    console.warn(`chapters from the cache`)
                } else{
                    data = await getChapter(history)
                    chaptersCache[history] = data
                }
                data.sort((a, b) => a.order - b.order)
            }
            
            updateProps(histories.find(h => h.id===history), data)
        } catch (error) {
            console.log(error)
            setMessager({variant: "danger", message: "Não foi possível recuperar capítulos"})
        }
        setLoading(false)
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
                            <div className="clicable" onClick={e=> setChapterIndex(index)}>
                                {chapterIndex === index && !isListning && note ? renderValidateContent(c.content) : c.content}
                                <br />
                                {stateChapters[index]?
                                <>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Pronúncias corretas</Tooltip>}>
                                        <>
                                        <i aria-label="Pronúncias corretas" className="text-success fa fa-check-circle"></i> {stateChapters[index].hit}
                                        </>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Pronúncias erradas</Tooltip>}>
                                        <>
                                        <i aria-label="Pronúncias erradas" className="text-danger fa fa-exclamation-circle"></i> {stateChapters[index].fail}
                                        </>
                                    </OverlayTrigger>
                                </>
                                :''}
                            </div>
                        </div>
                        )
                    })}
                </div>
            :""}
        </div>
    )
}
