import React from 'react'
import Link from 'next/link'
import { gaEventShare, whatsappLink } from '../../services/metakeys'

export default function LinkShare(props) {
    return (
        <Link href={whatsappLink()}>
            <a onClick={gaEventShare} title="Compartilhe no whatsapp" className='w-50 btn btn-success' target="_blank" rel="noreferrer">
                <i className="mh-x2 fa fa-whatsapp"></i>
                Compartilhe com os amigos
            </a>
        </Link>
    )
}