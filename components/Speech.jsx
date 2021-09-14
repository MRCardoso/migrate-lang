import React, { useState } from 'react'
import { Form, OverlayTrigger,Tooltip } from 'react-bootstrap'
import {copy} from '../services/utils'

export default function Speech(props){
    const {setPhrase, phraseReason, setIsListining, isListning, phrase, handleSaveNote, note} = props
    const [showMessage, setShowMessage] = useState(null)
    const copyText = () =>{
        if(copy(note)){
            setShowMessage("Texto copiado.")
            setTimeout(() => {
                setShowMessage(null)
            }, 1000);
        }
    }

    const customSave = () => {
        handleSaveNote()
        setShowMessage("Texto salvo.")
        setTimeout(() => {
            setShowMessage(null)
        }, 1000);
    }
    return (
        <React.Fragment>
            {showMessage !== null ? <span className="text-success mt-4">{showMessage}</span> : ''}
            <div className="flex-inline">
                <div className="box-2 flex-vertical text-secundary">
                    <Form.Label>Digite uma frase e compare com sua pronúncia</Form.Label>
                    <Form.Control as="textarea" rows={6} onChange={e => setPhrase(e.target.value)} value={phrase} placeholder="Digite uma frase e pratique sua pronúncia" />
                </div>
                <div className={`box-2 box-recognizer ${phraseReason.status === true? 'text-success': (phraseReason.status === false ? 'text-danger': '')}`}>
                    <p className="box-content">{note? note: "Sua voz será convertida em texto aqui..."}</p>
                    <div className="box-buttons">
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Iniciar/encerrar captura de fala.</Tooltip>}>
                            <button className="button-circle" aria-label="Ativar/desativar fala" type="button" onClick={() => setIsListining(prevState => !prevState)}>
                                { isListning ? <i className="fa fa-stop-circle"></i> : <i className="fa fa-microphone"></i>}
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Copie o texto capturado.</Tooltip>}>
                            <button className="button-circle" type="button" aria-label="Copiar texto" onClick={copyText}>
                                <i className="fa fa-copy"></i>
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Salve o texto capturado.</Tooltip>}>
                            <button className={`button-circle ${isListning || !note? 'circle-disable': ''}`} type="button" aria-label="Salvar texto" onClick={customSave} disabled={isListning || !note}>
                                <i className="fa fa-save"></i>
                            </button>
                        </OverlayTrigger>
                        {'status' in phraseReason ?
                            <OverlayTrigger placement="bottom" overlay={<Tooltip>{phraseReason.message}</Tooltip>}>
                                <button className={`box-notify ${phraseReason.status === true? 'btn-success' : 'btn-danger'}`} type="button" aria-label="Salvar texto">
                                    <i aria-label="Validacao" className={`fa fa-${phraseReason.status ? 'check-circle': 'exclamation-circle'}`}></i>
                                </button>
                            </OverlayTrigger>
                        : "" }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}