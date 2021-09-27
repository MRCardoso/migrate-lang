import React, { useState } from 'react'
import Link from 'next/link'
import {Form, InputGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { create } from '../../services/firebase/entities/histories'
import { requestTranslate } from '../../services/requests'
import Recognizer from '../Recognizer'
import SpeechInput from '../SpeechInput'

export default function ImagineerForm() {
    const [content, setContent] = useState('')
    const [chapters, setChapters] = useState([])
    const [lang, setLang] = useState("pt-BR")
    const {setMessager, setLoading} = useAuth()
    

    const saveForm = async() => {
        const errors = []
        if(!content) errors.push("O Título da história é obrigatório.") 
        chapters.map((c, i) => {
            if(!c.content) errors.push(`O Título do capítulo ${i+1} é obrigatório.`) 
        })

        if(errors.length>0){
            return setMessager({variant: "danger", message: errors})
        }
        setLoading(true)
        try {
            await create({content, lang, chapters})
            setLoading(false)
            reload()
        } catch (error) {
            setLoading(false)
            setMessager({variant: "danger", message: (err.message || "Não foi possível salvar História")})
        }
    }

    const addChapter = () => {
        const items = [...chapters]
        items.push({content: ''})
        setChapters(items)
    }

    const removeChapter = (index) => {
        const items = [...chapters]
        items.splice(index, 1)
        setChapters(items)

    }
    const updateChapter = (value, index) => {
        const items = [...chapters]
        items[index] = {content: value}
        setChapters(items)
    }

    const onTranslate = () => {
        const items = [content]
        chapters.map(c => items.push(c.content))
        
        setLoading(true)
        
        requestTranslate(lang, items)
            .then(translates => {
                console.log(translates)
                setLang(lang==="en-US" ? "pt-BR": "en-US")
                
                if(content in translates){
                    setContent(translates[content])
                }
                const chaptersCopy = [...chapters]
                setChapters(
                    chaptersCopy.reduce((acc, chapter) => {
                        if(chapter.content in translates)
                            chapter.content = translates[chapter.content]
                        acc.push(chapter)
                        return acc
                    }, [])
                )
            })
            .catch(error =>{
                setMessager({variant: "danger", message: error})
            })
            .finally(() => setLoading(false))
    }

    return (
        <div className="flex-center" style={{minHeight: '100vh'}}>
            <Form>
                <div className="d-flex mb-4">
                    <div style={{flex: 1}}>
                        <Link href="/imagineer">
                            <a title="Crie sua propria história" className="btn btn-light">
                                <i className="fa fa-chevron-left"></i> Voltar
                            </a>
                        </Link>
                    </div>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Traduz os textos preenchidos de acordo com o idioma selecionado.</Tooltip>}>
                        <Button style={{marginRight: '6px'}} onClick={onTranslate}>Traduzir</Button>
                    </OverlayTrigger>
                    <Button onClick={saveForm}>Salvar</Button>
                </div>
                
                <hr />
                
                <Form.Group className="mb-3" controlId="storyLang">
                    <Form.Label>Idioma</Form.Label>
                    <div className="toggle-language mb-4">
                        <div className={`${lang === 'pt-BR' ? 'active-language' : ''}`}>Português</div>
                        <button type="button" onClick={() => setLang(old => old === 'en-US' ? 'pt-BR' : 'en-US')}>
                            <i className="fa fa-exchange"></i>
                        </button>
                        <div className={`${lang === 'en-US' ? 'active-language' : ''}`}>Inglês</div>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="storyContent">
                    <Recognizer isMany={false}>
                        <SpeechInput
                            type="text"
                            title="Título"
                            language={lang}
                            placeholder="Dê um nome a sua história..."
                            value={content}
                            setValue={setContent}
                            clearOnEnd={true}
                            disabled={false}
                            printNote={true}
                            hasLabel={true}
                        />
                    </Recognizer>
                </Form.Group>

                <Button className="mb-4 w-100" size="sm" onClick={addChapter}><i className="fa fa-plus"></i> Adicionar Capítulo</Button>

                {chapters.length> 0 ? (
                    chapters.map((c, index) =>{
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
        </div>
    )
}
