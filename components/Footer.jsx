import React from 'react'
import Link from 'next/link'
import Lang from './Lang';

export default function Footer(props){
    const d = new Date()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const prettyMessage = () => {
        let message
        if(hour >= 0 && hour < 6) {
            message = 'Boa madrugada'
        } else if(hour > 6 && hour < 12){
            message = 'Bom dia'
        } else if(hour >= 12 && hour < 16){
            message = 'Bom tarde'
        } else{
            message = 'Bom noite'
        }
        if(message){
            return `${message}, são ${hour}:${minute}`
        }
        return ''
    }

    const changeLanguage  = (event, value) => {
		event.preventDefault()
		setLanguage(value)
		window.location.reload()
	}
    const links = [
        {url: 'https://www.linkedin.com/in/mrcardoso/', icon: 'linkedin', title: "Linkedin"},
        {url: 'https://github.com/MRCardoso', icon: 'git' },
        {url: 'https://www.facebook.com/mardozux', icon: 'facebook-square', title: "Página no facebook"},
        {url: 'https://www.instagram.com/mardozux/', icon: 'instagram', title: "Instagram de game developer"},
        {url: 'https://mardozux.itch.io/', icon: 'gamepad', title: "Jogos publicados" },
    ]
    return (
        <footer className="footer">
            <span>{prettyMessage()}</span>
            <div className="links">
                <Link href="/formulario"><a title="Formulario">Formulario</a></Link>
                <Link href="/frases-salvas"><a title="Frases salva">Frases salva</a></Link>
            </div>
            <div className="links">
                {links.map(({icon, url, title}) => <a key={icon} href={url} target="_blank" rel="noreferrer" title={title}><i className={`fa fa-${icon}`}></i></a> )}
                <Lang />
            </div>
        </footer>
    )
}