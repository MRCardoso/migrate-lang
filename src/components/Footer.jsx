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
            <span className="mb-2">
                Desenvolvido com <i role="img" aria-label="coracao" className="fa fa-heart text-danger"></i> + <i role="img" aria-label="coracao" className="fa fa-code text-success"></i> por
                <strong>
                    <Link href="https://www.linkedin.com/in/mrcardoso/">
                        <a title="Marlon R. Cardoso" target="_blank" rel="noreferrer"> Marlon R. Cardoso</a>
                    </Link>
                </strong>
            </span>
            <div>
                <form action="https://www.paypal.com/donate" method="post" target="_top">
                    <input type="hidden" name="business" value="5GLEV64R9MAEU" />
                    <input type="hidden" name="no_recurring" value="1" />
                    <input type="hidden" name="item_name" value="Uma aplicacao com reconhecimento de fala pra praticar a pronuncia do ingles, em busca da proficiencia" />
                    <input type="hidden" name="currency_code" value="BRL" />
                    <input type="image" src="https://www.paypalobjects.com/pt_BR/BR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Faça doações com o botão do PayPal" />
                    <img alt="Doar valor" border="0" src="https://www.paypal.com/pt_BR/i/scr/pixel.gif" width="1" height="1" />
                </form>
            </div>

        </footer>
    )
}