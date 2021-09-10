import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import {copy} from '../services/utils'

export default function Speech(props){
    const {setPhrase, phraseOk, setIsListining, isListning, phrase, handleSaveNote, note} = props
    const [showMessage, setShowMessage] = useState(null)
    const copyText = () =>{
        if(copy(note)){
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 1000);
        }
    }
    return (
        <React.Fragment>
            <Form.Group className="mb-3" controlId="content-to-compare">
                <Form.Label>Digite uma frase e pratique sua pronuncia</Form.Label>
                <Form.Control as="textarea" rows={4} onChange={e => setPhrase(e.target.value)} value={phrase} />
            </Form.Group>
            
            {showMessage === true ? <span className="alert alert-success mt-4 text-center">Texto copiado.</span> : ''}
            
            <div className="flex-inline">
                <div className={`box-2 ${phraseOk === true? 'text-success': (phraseOk === false ?'text-danger': '')}`}>
                    <p>{note? note: "Clique e fale"}</p>
                </div>
                <div className="box-buttons">
                    <button className="button-circle" aria-label="Ativar/desativar fala" type="button" onClick={() => setIsListining(prevState => !prevState)}>
                        { isListning ? <i className="fa fa-stop-circle"></i> : <i className="fa fa-microphone"></i>}
                    </button>
                    <button className="button-circle" type="button" aria-label="Copiar texto" onClick={copyText}>
                        <i className="fa fa-copy"></i>
                    </button>
                    <button className={`button-circle ${isListning || !note? 'circle-disable': ''}`} type="button" aria-label="Salvar texto" onClick={handleSaveNote} disabled={isListning || !note}>
                        <i className="fa fa-save"></i>
                    </button>
                </div>
                <div className="box-2 text-secundary">
                    <p>{phrase?phrase:"Compare"}</p>
                </div>
            </div>
        </React.Fragment>
    )
}