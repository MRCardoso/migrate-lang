import React from 'react'

export default function Speech(props){
    const {setPhrase, phraseOk, setIsListining, isListning, phrase, handleSaveNote, note} = props
    return (
        <React.Fragment>
            <div className="flex-row">
                <textarea className="textarea" rows="4" onChange={e => setPhrase(e.target.value)} value={phrase}></textarea> 
            </div>
            <div className="flex-row flex-between">
                <div className={`box-2 ${phraseOk === true? 'text-success': (phraseOk === false ?'text-danger': '')}`}>
                    <p>{note? note: "Click in mic and speech"}</p>
                </div>
                <button className="button-circle" type="button" onClick={() => setIsListining(prevState => !prevState)}>
                    { isListning ? <i className="fa fa-stop-circle"></i> : <i className="fa fa-microphone"></i>}
                </button>
                <button className={`button-circle ${isListning || !note? 'circle-disable': ''}`} type="button"  onClick={handleSaveNote} disabled={isListning || !note}>
                    <i className="fa fa-save"></i>
                </button>
                <div className="box-2 text-info">
                    <p>{phrase?phrase:"Phrase to compare"}</p>
                </div>
            </div>
        </React.Fragment>
    )
}