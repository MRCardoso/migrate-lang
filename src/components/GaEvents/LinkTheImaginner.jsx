import React from 'react'
import Link from 'next/link'
import { gaEventImaginner, gameUri } from '../../services/metakeys'

export default function LinkTheImaginner(props) {
    return (
        <Link href={gameUri}>
            <a onClick={gaEventImaginner} title="The imaginner Game" className={props.className} target="_blank" rel="noreferrer">
                {props.children}
            </a>
        </Link>
    )
}
