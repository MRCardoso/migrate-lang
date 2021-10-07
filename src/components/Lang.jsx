import React from "react"
import {Button, Dropdown} from 'react-bootstrap'
import {setLanguage, getLanguageLabel} from '../services/storage'

const lang = getLanguageLabel()

export default function Lang({next, title, icon, activeted}){
    const languages = [
        {value: "en-US", label: "Inglês"},
        {value: "pt-BR", label: "Português"},
    ]
    
    return (
        activeted ? 
            <Dropdown>
                <Dropdown.Toggle size="sm" id={`lang-dropdown-${icon}`}>
                    {title} <i className={`fa fa-${icon}`}></i>
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
                    {languages.map(ln => {
                        return (<Dropdown.Item href="#" key={ln.value} onClick={e => next(e, ln.value)}>{ln.label}</Dropdown.Item>)
                    })}
                </Dropdown.Menu>
            </Dropdown>
        :
        <Button size="sm" variant="light" disabled>{title} <i className={`fa fa-${icon}`}></i></Button>
        
    )
}