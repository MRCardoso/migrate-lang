import React from 'react'
import { Form, OverlayTrigger, Tooltip, DropdownButton, Button, Dropdown} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {copy, enabledCloud} from '../services/utils'
import Lang from './Lang'

export default function Speech(props){
    const {setPhrase, phraseReason, setIsListining, isListning, phrase, handleSaveNote, note, micLang, setMicLang} = props
    const {setMessager} = useAuth()
    const copyText = () =>{
        if(copy(phrase)){
            setMessager({variant: "success", message: "texto copiado para a área de transferência"})
        }
    }

    const customSave = (mode) => {
        handleSaveNote(mode, (status, message) => {
            setMessager({variant: (status ? "success": "danger"), message})
        })
    }
    const onMic = (e, value) => {
        e.preventDefault()
        if(phrase){
            setMicLang(value)
            setIsListining(prevState => !prevState)
        }
    }
    return (
        <React.Fragment>
            <div className="speech-container">
                <Form.Label>Digite algo</Form.Label>
                <Form.Control as="textarea" className="mb-2" rows={6} onChange={e => setPhrase(e.target.value)} value={phrase} placeholder="Coloque seu texto aqui para ativar os botões abaixo..." />
                <div className="d-flex speech-buttons">
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Copie o texto capturado.</Tooltip>}>
                        <Button variant={`${isListning || !phrase ? 'light': 'primary'}`} disabled={isListning || !phrase} size="sm" type="button" aria-label="Copiar texto" onClick={copyText}>
                            Copiar <i className="fa fa-copy"></i>
                        </Button>
                    </OverlayTrigger>

                    <Lang next={onMic} title="Praticar em:" activeted={phrase} icon={isListning ? "stop" : "microphone"} />
                    
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
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>{phraseReason.message}</Tooltip>}>
                            <i aria-label="Validacao" className={`mh-x2 clicable fa fa-${phraseReason.status ? 'check-circle': 'exclamation-circle'}`}></i>
                        </OverlayTrigger>
                    : '' }
                    <strong>{note}</strong>
                </div>
            </div>
        </React.Fragment>
    )
}