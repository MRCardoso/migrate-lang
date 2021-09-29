import React, { useState } from 'react'
import Link from 'next/link'
import {Form, InputGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { create } from '../../services/firebase/entities/histories'
import { requestTranslate } from '../../services/requests'
import Recognizer from '../Recognizer'
import SpeechInput from '../SpeechInput'
import { text2Speech } from '../../services/utils'

export default function ImagineerForm() {
    const [content, setContent] = useState('')
    const [chapters, setChapters] = useState([])
    const [lang, setLang] = useState("en-US")
    const [listen, setListen] = useState(false)
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
            setMessager({variant: "success", message: "História criada com sucesso"})
            clearForm()
        } catch (error) {
            setMessager({variant: "danger", message: (error.message || "Não foi possível salvar História")})
        }
        setLoading(false)
    }

    const clearForm = () => {
        setContent("")
        setChapters([])
        setLang("pt-BR")
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
        setMessager({})
        
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
                console.log(error)
                setMessager({variant: "danger", message: (Array.isArray(error) || typeof error === "string" ? error : "Erro inesperado ao traduzir, tente novamente mais tarde.")})
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
                            placeholder="Dê um nome para a história..."
                            value={content}
                            setValue={setContent}
                            clearOnEnd={true}
                            disabled={false}
                            printNote={true}
                            hasLabel={true}
                        >
                            <InputGroup.Text className={`clicable ${listen ? 'circle-disable': ''}`} onClick={e=> !listen && text2Speech(content, lang, setListen)}><i aria-label="ouvir" className="fa fa-volume-down"></i></InputGroup.Text>
                        </SpeechInput>
                    </Recognizer>
                </Form.Group>

                <Button className="mb-4 w-100" size="sm" onClick={addChapter}><i className="fa fa-plus"></i> Adicionar Capítulo</Button>

                {chapters.length> 0 ? (
                    chapters.map((c, index) =>{
                        return (
                            <Form.Group key={index} className="mb-3" controlId="formGroupEmail">
                                <Recognizer isMany={false}>
                                    <SpeechInput
                                        type="textarea"
                                        title={`Capítulo ${index+1}`}
                                        language={lang}
                                        placeholder="Preencha o capítulo..."
                                        value={c.content}
                                        setValue={(v) => {updateChapter(v, index)}}
                                        callback={value => updateChapter(value, index) }
                                        clearOnEnd={true}
                                        disabled={false}
                                        printNote={true}
                                        hasLabel={true}
                                    >
                                        <InputGroup.Text className={`clicable ${listen ? 'circle-disable': ''}`} onClick={e=> !listen && text2Speech(c.content, lang,setListen)}><i aria-label="ouvir" className="fa fa-volume-down"></i></InputGroup.Text>
                                        <InputGroup.Text className="clicable btn-danger" onClick={e=> removeChapter(index)}><i aria-label="remover" className="fa fa-minus"></i></InputGroup.Text>
                                    </SpeechInput>
                                </Recognizer>
                            </Form.Group>
                        )
                    })
                ): ""}
            </Form>
        </div>
    )
}
