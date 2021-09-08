import React, {useEffect, useState} from "react";
import {FormControl, InputGroup, Form} from 'react-bootstrap';

export default function SpeechInput(props){
    const {setIsListining, isListning, note, startRecord} = props
    const [value, setValue] = useState('')
    
    useEffect(() => {
        if(startRecord === false){
            setValue(note)
            if(typeof props.callback === "function"){ props.callback(note) }
        } else if(startRecord === true){
            setValue('')
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[startRecord])
    
    return (
        <React.Fragment>
            <Form>
                {props.hasLabel? <Form.Label>{props.title}</Form.Label>: ''}
                <InputGroup className="mb-2">
                    { props.type && props.type === "textarea"
                    ? <FormControl as="textarea" value={value} rows={3} placeholder={props.title} onChange={e => setValue(e.target.value)} />
                    : <FormControl value={value} placeholder={props.title} onChange={e => setValue(e.target.value)} />
                    }
                    
                    <InputGroup.Text onClick={() => setIsListining(prevState => !prevState)}>
                        { isListning ? <i className="fa fa-stop-circle"></i> : <i className="fa fa-microphone"></i>}
                    </InputGroup.Text>
                </InputGroup>
                {props.printNote? <Form.Text className="Form.text-muted">{note}</Form.Text>: ''}
            </Form>

        </React.Fragment>
    )
}