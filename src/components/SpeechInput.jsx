import React, {useEffect, useState} from "react";
import {FormControl, InputGroup,FloatingLabel, Form} from 'react-bootstrap';

export default function SpeechInput(props){
    const {setIsListining, isListning, note, setNote, startRecord} = props
    const [value, setValue] = useState('')
    
    useEffect(() => {
        if(startRecord === false){
            setValue(note)
            if(typeof props.callback === "function"){
                props.callback(note, setValue)
            }
            if(props.clearOnEnd){
                setNote('')
            }
        } else if(startRecord === true){
            setValue('')
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[startRecord])

    useEffect(() => {
        if(props.clearField)
            refreshValue('')
    }, [props.clearField])

    const refreshValue = (value) => {
        if( typeof props.refreshOrigin === 'function')
            props.refreshOrigin(value)
        setValue(value)
    }
    
    return (
        <React.Fragment>
            <div>
                {props.hasLabel? <Form.Label>{props.title}</Form.Label>: ''}
                <InputGroup className="mb-2">
                    { props.type && props.type === "textarea"
                    ? <FormControl as="textarea" value={value} rows={6} placeholder={props.placeholder || props.title} onChange={e => refreshValue(e.target.value)} disabled={props.disabled} />
                    : <FormControl value={value} placeholder={props.placeholder || props.title} onChange={e => refreshValue(e.target.value)} disabled={props.disabled} />
                    }
                    <InputGroup.Text onClick={() => setIsListining(prevState => !prevState)} className={isListning? 'button-purple text-white': ''}>
                        { isListning ? <i className="fa fa-stop"></i> : <i className="fa fa-microphone"></i>}
                    </InputGroup.Text>
                </InputGroup>
                {props.printNote? <Form.Text className="Form.text-muted">{note}</Form.Text>: ''}
            </div>
        </React.Fragment>
    )
}