import React, { useState } from 'react'
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
            <div className="flex-inline">
                <textarea className="textarea" rows="4" onChange={e => setPhrase(e.target.value)} value={phrase}></textarea> 
            </div>

            {showMessage === true ? <span className="alert alert-success mt-4 text-center">Texto copiado.</span> : ''}
            
            <div className="flex-inline">
                <div className={`box-2 ${phraseOk === true? 'text-success': (phraseOk === false ?'text-danger': '')}`}>
                    <p>{note? note: "Clique e fale"}</p>
                </div>
                <div className="box-buttons">
                    <button className="button-circle" type="button" onClick={() => setIsListining(prevState => !prevState)}>
                        { isListning ? <i className="fa fa-stop-circle"></i> : <i className="fa fa-microphone"></i>}
                    </button>
                    <button className="button-circle" type="button" onClick={copyText}>
                        <i className="fa fa-copy"></i>
                    </button>
                    <button className={`button-circle ${isListning || !note? 'circle-disable': ''}`} type="button"  onClick={handleSaveNote} disabled={isListning || !note}>
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