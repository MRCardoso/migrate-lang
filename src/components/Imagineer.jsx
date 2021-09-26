import React, { useEffect, useState } from 'react'
import {Form, FloatingLabel, InputGroup, Button} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { create, getChapter, list } from '../services/firebase/entities/histories'
import Lang from './Lang'
import ModalForm from './Modal'

export default function Imagineer(props) {
    const {setPhrase, phraseReason, setIsListining, isListning, phrase, handleSaveNote, setNote, note} = props
    const [histories, setHistories] = useState([])
    const [history, setHistory] = useState([])
    const [chapters, setChapters] = useState([])
    const [chapterSize, setChapterSize] = useState(0)
    const [chapterIndex, setChapterIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [formHistory, setFormHistory] = useState({content: '', chapters: [], image: ''})
    const {setMessager, setLoading} = useAuth()

    useEffect(() => {
        reload()
    }, [])

    const reload = async () => {
        try {
            setLoading(true)
            const data = await list()
            setHistories(data)
        } catch (err) {
            setMessager({status: false, message: String(err)})
        }
        setLoading(false)
    }

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
            setChapterSize(data.length)
            setPhrase(data.length > 0 ? data[0].content : "")
            setNote("")
            setChapterIndex(0)
        } catch (error) {
            setMessager({status: false, message: "Não foi possível recuperar capítulos"})
        }
    }
    
    const createModalForm = () => {
        setModalOpen(true)
        setFormHistory({content: '', chapters: [], image: ''})
    }

    const saveForm = async() => {
        setLoading(true)
        try {
            await create(formHistory)
            setLoading(false)
            reload()
        } catch (error) {
            setLoading(false)
            setMessager({status: false, message: "Não foi possível salvar História"})
        }
    }

    const addChapter = () => {
        const items = {...formHistory}
        items.chapters.push({content: ''})
        setFormHistory(items)
    }

    const removeChapter = (index) => {
        const items = {...formHistory}
        items.chapters.splice(index, 1)
        setFormHistory(items)

    }
    const updateChapter = (value, index) => {
        const items = {...formHistory}
        items.chapters[index] = {content: value}
        setFormHistory(items)
    }

    const renderValidateContent = content =>{
        const targets = content.toLowerCase().replace(/\n/ig, ' ').split(' ').filter(n => n.trim())
        const origins = note.toLowerCase().split(' ')
        return targets.map((word, index) => {
            return <span className={`text-${index in origins && origins[index] === word.replace(/[^0-9a-z]/, '') ? 'success' : ''}`}>{word} </span>
        })
    }

    return (
        <div className="flex-center" style={{minHeight: '100vh'}}>
            <Button className="mb-4" onClick={createModalForm}>Crie sua propria história...</Button>
            <ModalForm isOpen={modalOpen} closeCallback={e => setModalOpen(false)} title="Crie sua história">
                <Form>
                    <Button className="w-100 mb-4" onClick={saveForm}>Salvar história</Button>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" autoComplete="off" value={formHistory.content} onChange={e => setFormHistory({...formHistory, content: e.target.value})} placeholder="título..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type="text" autoComplete="off" value={formHistory.image} onChange={e => setFormHistory({...formHistory, image: e.target.value})} placeholder="Imagem..." />
                    </Form.Group>
                    <Lang next={(e, value) => setFormHistory({...formHistory, lang: value})} title="Idioma" activeted={true} icon={"microphone"} />
                    <div className="d-flex flex-between">
                        <Button className="mb-4" size="sm" onClick={addChapter}><i className="fa fa-plus"></i> Adicionar Capítulo</Button>
                    </div>
                    {formHistory.chapters.length> 0 ? (
                        formHistory.chapters.map((c, index) =>{
                            return (
                                <Form.Group key={index} className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Capítulo {index+1}</Form.Label>
                                    <InputGroup className="mb-2">
                                        <Form.Control type="text" autoComplete="off" value={c.content} onChange={e => updateChapter(e.target.value, index) } placeholder="título..." />
                                        <InputGroup.Text className="btn-danger" onClick={e=> removeChapter(index)}><i className="fa fa-minus"></i></InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            )
                        })
                    ): ""}
                </Form>
            </ModalForm>
            <FloatingLabel controlId="chooseHistory" onChange={(e) => loadChapter(e.target.value, 0)} label="Escolha uma história e pratique">
                <Form.Select aria-label="Floating label select example">
                    <option value="">Selecione</option>
                    {histories.map(h => <option key={h.id} value={h.id}>{h.content}</option>)}
                </Form.Select>
            </FloatingLabel>
            {chapterSize > 0 && chapterIndex < chapterSize ?
                <div className="histories" style={{backgroundImage: `url("${history.image}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                    <h3 className="pt-4">Capítulo: {chapterIndex + 1}/{chapterSize}</h3>
                    <div className="histories-content">
                        {!isListning && note?
                        renderValidateContent(chapters[chapterIndex].content)
                        :
                        chapters[chapterIndex].content
                        }
                    </div>
                    {note}
                    <div className="flex-inline pb-4">
                        <Button style={{marginRight: '14px'}} size="sm" variant={`${isListning ? 'primary': 'light'}`} onClick={e=> setIsListining(prevState => !prevState)}>
                        { isListning ? <i className="fa fa-stop"></i> : <i className="fa fa-microphone"></i>} Pratique
                        </Button>
                        <Button variant="primary" size="sm" onClick={e=> setChapterIndex((chapterIndex+1) >= chapterSize ? 0 : chapterIndex+1)}>
                            { (chapterIndex+1) >= chapterSize ? "Inicio" : "Próximo"} <i className="fa fa-chevron-right"></i>
                        </Button>
                    </div>
                </div>
            :""}
            {/* {chapters.map(c => <p>{c.content}</p>)} */}
        </div>
    )
}
