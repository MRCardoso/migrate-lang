import React, { useState } from 'react'
import { Form, OverlayTrigger, Tooltip, Spinner} from 'react-bootstrap'
import {copy} from '../services/utils'
import ToastModal from './ToastModal'

export default function Speech(props){
    const {setPhrase, phraseReason, setIsListining, isListning, phrase, handleSaveNote, note} = props
    const [showMessage, setShowMessage] = useState(null)
    const copyText = () =>{
        if(copy(phrase)){
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
            <div className="speech-container">
                <Form.Label>Digite algo</Form.Label>
                <Form.Control as="textarea" className="mb-2" rows={6} onChange={e => setPhrase(e.target.value)} value={phrase} placeholder="Coloque seu texto aqui para ativar os botões abaixo..." />
                <div className="speech-buttons">
                    <OverlayTrigger placement="left" overlay={<Tooltip>Iniciar/encerrar captura de fala.</Tooltip>}>
                        <button className={`button-circle ${isListning ? 'button-purple': ''} ${!phrase? 'circle-disable': ''}`} aria-label="Ativar/desativar fala" type="button" onClick={() => phrase && setIsListining(prevState => !prevState)}>
                            { isListning ? <i className="fa fa-stop"></i> : <i className="fa fa-microphone"></i>}
                        </button>
                    </OverlayTrigger>
                    
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Salve o texto capturado.</Tooltip>}>
                        <button className={`button-circle right ${!phrase? 'circle-disable': ''}`} type="button" aria-label="Salvar texto" onClick={customSave} disabled={!phrase}>
                            <i className="fa fa-save"></i>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Copie o texto capturado.</Tooltip>}>
                        <button className={`button-circle right ${!phrase? 'circle-disable': ''}`} type="button" aria-label="Copiar texto" onClick={copyText}>
                            <i className="fa fa-copy"></i>
                        </button>
                    </OverlayTrigger>
                </div>
                <hr />
                <div className={`${phraseReason.status ? 'text-success': (phraseReason.status===false? 'text-danger':'text-secondary')}`}>
                    {'status' in phraseReason && note ?
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>{phraseReason.message}</Tooltip>}>
                            <i style={{paddingRight: '4px'}} aria-label="Validacao" className={`clicable fa fa-${phraseReason.status ? 'check-circle': 'exclamation-circle'}`}></i>
                        </OverlayTrigger>
                    : '' }
                    <strong>{note}</strong>
                </div>
            </div>
        </React.Fragment>
    )
}