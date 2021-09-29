import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {Form, FloatingLabel, OverlayTrigger, Tooltip, Button} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { getChapter, list } from '../../services/firebase/entities/histories'
import { text2Speech } from '../../services/utils'

export default function ImagineerList(props) {
    const {setPhrase, phraseReason, setIsListining, isListning, startRecord, setPhraseReason, setNote, note} = props
    const [histories, setHistories] = useState([])
    const [history, setHistory] = useState(null)
    const [chapters, setChapters] = useState([])
    const [chapterIndex, setChapterIndex] = useState(0)
    const [stateChapters, setStateChapters] = useState([])
    const [listen, setListen] = useState(false)
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
                data = await getChapter(history)
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
                            <div className="clicable" onClick={e=> setChapterIndex(index)}>
                                {chapterIndex === index && !isListning && note ? renderValidateContent(c.content) : c.content}
                                <br />
                                
                            </div>
                            <div className="histories-reasons">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Praticar</Tooltip>}>
                                    <Button variant={chapterIndex === index && isListning ? 'primary' : 'light'} disabled={chapterIndex !== index} size="sm" onClick={() => startRecordChapter(index, c)}>
                                        { chapterIndex === index && isListning ? <i className="fa fa-stop"></i> : <i className="fa fa-microphone"></i>}
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Ouvir</Tooltip>}>
                                    <Button variant="light" disabled={chapterIndex !== index || listen} size="sm" onClick={() => text2Speech(c.content, history.lang, setListen)}>
                                        <i className="fa fa-volume-up"></i>
                                    </Button>
                                </OverlayTrigger>
                                {stateChapters[index]?
                                <>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Pronúncias corretas</Tooltip>}>
                                        <div className="mh-x2 btn btn-light btn-sm">
                                            <i aria-label="Pronúncias corretas" className="text-success mh-x2 fa fa-check-circle"></i>{stateChapters[index].hit}
                                        </div>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Pronúncias erradas</Tooltip>}>
                                        <div className="mh-x2 btn btn-light btn-sm">
                                            <i aria-label="Pronúncias erradas" className="text-danger mh-x2 fa fa-exclamation-circle"></i>{stateChapters[index].fail}
                                        </div>
                                    </OverlayTrigger>
                                </>
                                :''}
                            </div>
                        </div>
                        )
                    })}
                </div>
            :""}

            <Link href="/imagineer/create">
                <a className="button-circle button-purple text-white button-fixed-left-down" title="Criar história">
                    <i className="fa fa-plus"></i>
                </a>
            </Link>
        </div>
    )
}
