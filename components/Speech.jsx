import React, { useState } from 'react'
import { Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {copy} from '../services/utils'
import ToastModal from './ToastModal'

export default function Speech(props){
    const {setPhrase, phraseReason, setIsListining, isListning, phrase, handleSaveNote, note} = props
    const [showMessage, setShowMessage] = useState(null)
    const copyText = () =>{
        if(copy(note)){
            setShowMessage("texto copiado para a área de transferência")
        }
    }

    const customSave = () => {
        handleSaveNote()
        setShowMessage("Texto salvo nos dados do navegador")
    }
    return (
        <React.Fragment>
            <ToastModal message={showMessage} onClose={()=> setShowMessage(null)} />
            <div className="flex-inline">
                <div className="box-2 flex-vertical">
                    <Form.Label>Digite algo</Form.Label>
                    <Form.Control as="textarea" rows={6} onChange={e => setPhrase(e.target.value)} value={phrase} placeholder="Sua voz será comparada com o texto colocado aqui..." />
                </div>
                <div className={`box-2 flex-vertical ${phraseReason.status === true? 'text-success': (phraseReason.status === false ? 'text-danger': '')}`}>
                    <div className="box-content">
                        <h6>Diga algo</h6>
                        {note? note: "Ative o microfone e fale livremente, ou compare com o texto ao lado..."}
                    </div>
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