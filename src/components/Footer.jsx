import React, { useState, useEffect } from 'react'
import { gaEventSocialMidia } from '../services/metakeys'
import { list } from "../services/firebase/entities/links"
import packageInfo from '../../package.json'

export default function Footer(){
    const [links, setLinks] = useState([])
    const d = new Date()
    let hour = d.getHours()
    let minute = d.getMinutes()
    minute = (minute <10 ? `0${minute}`: minute)
    hour = (hour < 10 ? `0${hour}`: hour)

    useEffect(() => {
        const dowork = async () => {
            const values = await list()
            setLinks(values.items)
        }
        dowork()
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

    const prettyMessage = () => {
        let message
        if(hour >= 0 && hour < 6) {
            message = 'Boa madrugada'
        } else if(hour > 6 && hour < 12){
            message = 'Bom dia'
        } else if(hour >= 12 && hour < 18){
            message = 'Bom tarde'
        } else{
            message = 'Bom noite'
        }
        if(message){
            return `${message}, são ${hour}:${minute}`
        }
        return ''
    }

    return (
        <>
            <footer className="footer">
                <span>{prettyMessage()}</span>
                <ul>
                    {links.map(t => {
                        return (
                            <li key={t.icon}>
                                <a href={t.url} target="_blank" rel="noreferrer" onClick={() => gaEventSocialMidia(t.label)} title={t.label}>
                                    <i className={`fa fa-${t.icon}`}></i>
                                </a>
                            </li>
                        )
                    })}
                    <li>V{packageInfo.version}</li>
                </ul>
            </footer>
        </>
    )
}