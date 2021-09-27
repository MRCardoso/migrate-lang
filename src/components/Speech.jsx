import React, { useState } from 'react'
import { Form, OverlayTrigger, Tooltip, DropdownButton, Button, Dropdown} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { requestTranslate } from '../services/requests'
import {copy, enabledCloud} from '../services/utils'
import Lang from './Lang'

export default function Speech(props){
    const {setPhrase, phraseReason, setIsListining, isListning, phrase, handleSaveNote, note, micLang, setMicLang} = props
    const {setMessager, setLoading} = useAuth()
    const [lang, setLang] = useState('en-US')
    const copyText = () =>{
        if(copy(note)){
            setMessager({variant: "success", message: "texto copiado para a área de transferência"})
        }
    }

    const customSave = (mode) => {
        handleSaveNote(mode, (status, message) => {
            setMessager({variant: (status ? "success": "danger"), message})
        })
    }
    const startRecording = (e) => {
        e.preventDefault()
        console.log(phrase)
        phrase && setIsListining(prevState => !prevState)
    }

    const toggleLanguage = () => {
        const nextValue = (lang === 'en-US' ? 'pt-BR' : 'en-US')
        setMicLang(nextValue)
        setLang(nextValue)
    }

    const onTranslate = () => {
        setLoading(true)
        
        requestTranslate(lang, [phrase])
            .then(translates => {
                toggleLanguage()
                setPhrase(translates[phrase])
            })
            .catch(error =>{
                setMessager({variant: "danger", message: error})
            })
            .finally(() => setLoading(false))
    }

    return (
        <React.Fragment>
            <div className="speech-container">
                <Form.Label>Digite algo</Form.Label>
                <div className="toggle-language">
                    <div className={`${lang === 'pt-BR' ? 'active-language' : ''}`}>Português</div>
                    <button type="button" onClick={() => toggleLanguage()}>
                        <i className="fa fa-exchange"></i>
                    </button>
                    <div className={`${lang === 'en-US' ? 'active-language' : ''}`}>Inglês</div>
                </div>
                <Form.Control as="textarea" className="mb-2" rows={6} onChange={e => setPhrase(e.target.value)} value={phrase} placeholder="Coloque seu texto aqui para ativar os botões abaixo..." />
                <div className="d-flex speech-buttons">
                    <div style={{flex: 1}}>
                        <Button variant={`${isListning ? 'primary': 'light'}`} disabled={!phrase} size="sm" type="button" aria-label="ativar/desativar fala" onClick={startRecording}>
                            <i className={`fa fa-${isListning ? "stop" : "microphone"}`}></i>
                        </Button>
                        <Button disabled={isListning || !phrase} size="sm" type="button" aria-label="traduzir" onClick={onTranslate}>
                            <i className="fa fa-language"></i>
                        </Button>
                    </div>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Salve o resultado nos dados do navegador, ou na nuvem e ajude a popular nossa base de dados.</Tooltip>}>
                        <DropdownButton size="sm" title="Salvar" variant={`${isListning || !phrase? 'light': 'primary'}`} disabled={isListning || !phrase}>
                            <Dropdown.Item href="#" onClick={() => customSave(false)}><i className={`fa fa-save`}></i> Salvar privado</Dropdown.Item>
                            {enabledCloud?
                            <Dropdown.Item href="#" onClick={() => customSave(true)}><i className={`fa fa-cloud`}></i> Salvar público</Dropdown.Item>
                            :""}
                        </DropdownButton>
                    </OverlayTrigger>
                </div>
                <hr />
                <div className={`speech-reason ${phraseReason.status ? 'text-success': (phraseReason.status===false? 'text-danger':'text-secondary')}`}>
                    {'status' in phraseReason && note ?
                        <>
                        <i className="mh-x2 clicable fa fa-copy" aria-label="Copiar texto" onClick={copyText}></i>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>{phraseReason.message}</Tooltip>}>
                            <i aria-label="Validacao" className={`mh-x2 clicable fa fa-${phraseReason.status ? 'check-circle': 'exclamation-circle'}`}></i>
                        </OverlayTrigger>
                        </>
                    : '' }
                    <strong>{note}</strong>
                </div>
            </div>
        </React.Fragment>
    )
}