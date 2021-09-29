import React, {useEffect, useState} from "react";
import {FormControl, InputGroup,FloatingLabel, Form} from 'react-bootstrap';

export default function SpeechInput(props){
    const {setIsListining, isListning, note, setNote, startRecord, setMicLang, language, value, setValue, clearField} = props
    const [] = useState('')
    
    useEffect(() => {
        if(startRecord === false){
            setValue(note)
            props.clearOnEnd && setNote('')

            if(typeof props.callback === "function"){
                props.callback(note)
            }
        } else if(startRecord === true){
            setValue('')
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[startRecord])

    useEffect(() => {
        clearField && setValue('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearField])

    const toggleVoice = () => {
        setMicLang(language)
        setIsListining(prevState => !prevState)
    }
    
    return (
        <React.Fragment>
            <div>
                {props.hasLabel? <Form.Label>{props.title}</Form.Label>: ''}
                <InputGroup className="mb-2">
                    { props.type && props.type === "textarea"
                    ? <FormControl as="textarea" value={value} placeholder={props.placeholder || props.title} onChange={e => setValue(e.target.value)} disabled={props.disabled} />
                    : <FormControl value={value} placeholder={props.placeholder || props.title} onChange={e => setValue(e.target.value)} disabled={props.disabled} />
                    }
                    <InputGroup.Text onClick={toggleVoice} className={isListning? 'button-purple text-white': ''}>
                        { isListning ? <i className="fa fa-stop"></i> : <i className="fa fa-microphone"></i>}
                    </InputGroup.Text>
                    {props.children}
                </InputGroup>
                {props.printNote? <Form.Text className="Form.text-muted">{note}</Form.Text>: ''}
            </div>
        </React.Fragment>
    )
}