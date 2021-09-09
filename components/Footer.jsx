import React from 'react'
import Link from 'next/link'

export default function Footer(){
    const d = new Date()
    let hour = d.getHours()
    let minute = d.getMinutes()
    minute = (minute <10 ? `0${minute}`: minute)
    hour = (hour < 10 ? `0${hour}`: hour)

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
        <footer className="footer">
            <span>{prettyMessage()}</span>
            <span>
                Desenvolvido com <i role="img" aria-label="coracao" className="fa fa-heart text-danger"></i> + <i role="img" aria-label="coracao" className="fa fa-code text-success"></i> por
                <strong>
                    <Link href="https://www.linkedin.com/in/mrcardoso/">
                        <a title="Marlon R. Cardoso" target="_blank" rel="noreferrer"> Marlon R. Cardoso</a>
                    </Link>
                </strong>
            </span>
        </footer>
    )
}