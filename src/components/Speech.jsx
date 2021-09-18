import React, { useState } from 'react'
import { Form, OverlayTrigger, Tooltip, Button, DropdownButton, Dropdown} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {copy} from '../services/utils'

export default function Speech(props){
    const {setPhrase, phraseReason, setIsListining, isListning, phrase, handleSaveNote, note} = props
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
    return (
        <React.Fragment>
            <div className="speech-container">
                <Form.Label>Digite algo</Form.Label>
                <Form.Control as="textarea" className="mb-2" rows={6} onChange={e => setPhrase(e.target.value)} value={phrase} placeholder="Coloque seu texto aqui para ativar os botões abaixo..." />
                <div className="d-flex speech-buttons">
                    <div style={{flex: 1}}>
                        <OverlayTrigger placement="left" overlay={<Tooltip>Iniciar/encerrar captura de fala.</Tooltip>}>
                            <button className={`button-circle ${isListning ? 'button-purple': ''} ${!phrase? 'circle-disable': ''}`} aria-label="Ativar/desativar fala" type="button" onClick={() => phrase && setIsListining(prevState => !prevState)}>
                                { isListning ? <i className="fa fa-stop"></i> : <i className="fa fa-microphone"></i>}
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Copie o texto capturado.</Tooltip>}>
                            <button className={`button-circle ${!phrase? 'circle-disable': ''}`} type="button" aria-label="Copiar texto" onClick={copyText}>
                                <i className="fa fa-copy"></i>
                            </button>
                        </OverlayTrigger>
                    </div>
                    
                    
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Salve o resultado nos dados do navegador, ou na nuvem e ajude a popular nossa base de dados.</Tooltip>}>
                            <DropdownButton size="sm" title="Salvar" disabled={isListning || !phrase}>
                                <Dropdown.Item href="#" onClick={() => customSave(false)}><i className={`fa fa-save`}></i> Salvar offline</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => customSave(true)}><i className={`fa fa-cloud`}></i> Salvar offline e online</Dropdown.Item>
                            </DropdownButton>
                        </OverlayTrigger>
                    </div>
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