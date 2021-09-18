import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {Button, Form, Card} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

export default function AuthContainer({children, code, title, onSave}) {
    const [loading, setLoading] = useState(false)
    const {setMessager} = useAuth()
    
    const handlerSave = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setMessager(null)
            await onSave()
            Router.push("/")
        } catch (error) {
            setMessager({variant:"danger", message: error.message})
        }
        setLoading(false)
    }

    let valuesList = []
    switch(code){
        case "register": valuesList = ["Acesse sua conta", "acessar", "login"]; break;
        case "login": valuesList = ["Novo por aqui?", "criar conta", "register"]; break;
        case "forgot": valuesList = ["Acesse sua conta", "acessar", "login"];  break;
    }
    const [labelText, linkText, linkUri] = valuesList
    return (
        <>
           <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
                <div className="w-100" style={{maxWidth: '400px'}}>
                    <Card>
                        <Card.Header>
                            <h1 className="text-center mb-4">{title}</h1>
                            <Link href="/">
                                <a title="Voltar">
                                    <i aria-label="Voltar para home" className="fa fa-arrow-left"></i>
                                </a>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handlerSave}>
                                {children}
                                
                                {code==="login"? <Link href={`/auth/forgot`}><a title="Esqueci a senha">Esqueci a senha</a></Link>: ""}
                                
                                <Button disabled={loading} className="w-100 mt-4" type="submit" variant="primary">Enviar</Button>
                            </Form>
                            <div className="w-100 text-center mt-4">
                                {labelText} <Link href={`/auth/${linkUri}`}><a title={linkText}>{linkText}</a></Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>  
        </>
    )
}
