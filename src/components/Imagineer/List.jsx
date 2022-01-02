import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {Form, FloatingLabel, OverlayTrigger, Tooltip, Button, Badge, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { getChapter, list } from '../../services/firebase/entities/histories'
import { copy, text2Speech } from '../../services/utils'
import { gaEventStories } from '../../services/metakeys'
import { PAGE_SIZE } from '../../services/firebase/crud'
import Paginator from '../Paginator'

export default function ImagineerList(props) {
    const {setPhrase, phraseReason, setIsListining, isListning, startRecord, setPhraseReason, setNote, note} = props
    const [histories, setHistories] = useState([])
    const [history, setHistory] = useState(null)
    const [chapters, setChapters] = useState([])
    const [chapterIndex, setChapterIndex] = useState(0)
    const [stateChapters, setStateChapters] = useState([])
    const [chaptersScore, setChapterScore] = useState({hit: 0, fail: 0}) 
    const [listen, setListen] = useState(false)
    const [paginator, setPaginator] = useState(null)
    const {setMessager, setLoading} = useAuth()

    // run in component creating
    useEffect(() => {
        async function loadApi(){
            try {
                setLoading(true)
                const onData = await list(PAGE_SIZE)
                setPaginator(onData.paginator)
                refreshData(onData.items)
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

            setChapterScore({hit: (chaptersScore.hit+hit), fail: (chaptersScore.fail+fail) })
            
            if(items[chapterIndex]) {
                hit += items[chapterIndex].hit
                fail += items[chapterIndex].fail
            }

            items[chapterIndex] = {hit, fail}
            setStateChapters(items)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[startRecord])

    const refreshData = (data) => {
        setHistories(data)
        updateProps(null, [])
    }

    const updateProps = (h, c) =>{
        setHistory(h)
        setChapters(c)
        setNote("")
        setStateChapters([])
        setChapterScore({hit: 0, fail: 0})
        setPhraseReason({})
        setChapterIndex(0)
    }

    const loadChapter = async (history) => {
        setLoading(true)
        try {
            let data = []
            if(history!==""){
                const onData = await getChapter(history)
                data = onData.items
                data.sort((a, b) => a.order - b.order)
            }
            const hCurr = histories.find(h => h.id===history)
            gaEventStories(hCurr.content)
            updateProps(hCurr, data)
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

    const copyText = (value) =>{
        if(copy(value)){
            setMessager({variant: "success", message: "texto copiado para a área de transferência"})
        }
    }

    return (
        <div className="flex-center" style={{minHeight: '100vh'}}>
            <div className={history?'hide':''}>
                <Paginator pager={paginator} request={list} response={refreshData} />
            </div>
            {histories.length > 0 ?
                history ?
                    <Button aria-label='Selecione outra história' onClick={_ => updateProps(null, [])}>Selecione outra história</Button> 
                :
                histories.map(h => {
                    return (
                        <div className='list list-story' key={h.id} onClick={_ => loadChapter(h.id, 0)}>
                            <h5>{h.content}</h5>
                            <small><strong>Fonte:</strong> {h.linkRef}</small>
                        </div>
                    )
                })
             :
             <Alert variant="warning" className="mt-2">
                Nenhuma história para contar
            </Alert>}
            {history ?
                <div className="histories">
                    <h3 className="pt-4 text-center">
                        {history.content}
                    </h3>
                    {history.linkRef ? 
                    <div className="text-center mb-4">
                        <strong className="mh-x2">Fonte:</strong>
                        {/^http(s)?/.test(history.linkRef) ? 
                            <Link href={history.linkRef}>
                                <a target="_blank" rel="noreferrer" title="Fonte da história">{history.linkRef}</a>
                            </Link>
                        : history.linkRef}
                    </div>
                    :''}
                    <div className="histories-score">
                        <div>
                            <strong>Capítulos</strong>
                            <span>{chapterIndex+1}/{chapters.length}</span>
                        </div>
                        <div>
                            <strong>Acertos</strong>
                            <span>{chaptersScore.hit}</span>
                        </div>
                        <div>
                            <strong>Erros</strong>
                            <span>{chaptersScore.fail}</span>
                        </div>
                    </div>
                    <p className="text-center mt-2 mb-2">{note}</p>
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
                                    <Button variant={chapterIndex === index && listen ? "primary" : "light"} disabled={chapterIndex !== index} size="sm" onClick={() => text2Speech(c.content, history.lang, setListen)}>
                                        <i className={`fa fa-${chapterIndex === index && listen ? 'stop' :'volume-up'}`}></i>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Ouvir</Tooltip>}>
                                    <Button variant="light" size="sm" type="button" aria-label="Copiar texto" onClick={() => copyText(c.content)}>
                                        <i className="fa fa-copy"></i>
                                    </Button>
                                </OverlayTrigger>
                                <>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Pronúncias corretas</Tooltip>}>
                                        <div className={`mh-x2 btn btn-light btn-sm${chapterIndex !== index ? ' histories-content-disabled': ''}`}>
                                            <i aria-label="Pronúncias corretas" className="text-success mh-x2 fa fa-check-circle"></i> {stateChapters[index] ? stateChapters[index].hit: 0}
                                        </div>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Pronúncias erradas</Tooltip>}>
                                        <div className={`mh-x2 btn btn-light btn-sm${chapterIndex !== index ? ' histories-content-disabled': ''}`}>
                                            <i aria-label="Pronúncias erradas" className="text-danger mh-x2 fa fa-exclamation-circle"></i>{stateChapters[index] ? stateChapters[index].fail : 0}
                                        </div>
                                    </OverlayTrigger>
                                </>
                            </div>
                        </div>
                        )
                    })}
                </div>
            :""}

            <Link href="/nova-historia">
                <a className="button-circle button-purple text-white button-fixed-left-down" title="Nova história">
                    <i className="fa fa-plus"></i>
                </a>
            </Link>
        </div>
    )
}
