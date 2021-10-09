import React from 'react'
import Link from 'next/link'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function Footer(){
    const d = new Date()
    let hour = d.getHours()
    let minute = d.getMinutes()
    minute = (minute <10 ? `0${minute}`: minute)
    hour = (hour < 10 ? `0${hour}`: hour)

    const thirdPart = [
        {url: 'https://www.linkedin.com/in/mrcardoso/', icon: 'linkedin', label: "Linkedin"},
        {url: 'https://github.com/MRCardoso', icon: 'git', label: "Github" },
        {url: 'https://www.facebook.com/mardozux', icon: 'facebook-square', label: "Página no facebook"},
        {url: 'https://www.instagram.com/mardozux/', icon: 'instagram', label: "Instagram de game developer"},
        {url: 'https://mardozux.itch.io/', icon: 'gamepad', label: "Jogos publicados" },
    ]

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
                    {thirdPart.map(t => {
                        return (
                            <li key={t.icon}>
                                <a href={t.url} target="_blank" rel="noreferrer" title={t.label}>
                                    <i className={`fa fa-${t.icon}`}></i>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </footer>
        </>
    )
}