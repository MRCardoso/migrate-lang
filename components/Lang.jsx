import React from "react"
import { DropdownButton, Dropdown} from 'react-bootstrap'
import {setLanguage, getLanguage} from '../services/storage'

const lang = getLanguage().toLowerCase()


export default function Lang(){
    const changeLanguage  = (event, value) => {
		event.preventDefault()
		setLanguage(value)
		window.location.reload()
	}
    const languages = [
        {value: "en-US", label: "EN"},
        {value: "pr-BR", label: "PR"},
    ]

    return (
        <DropdownButton size="sm" title={lang}>
            {languages.map(ln => {
                return (<Dropdown.Item href="#" key={ln.value} onClick={e => changeLanguage(e, ln.value)}>{ln.label}</Dropdown.Item>)
            })}
        </DropdownButton>
    )
}