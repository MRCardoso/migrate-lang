import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { DropdownButton, Dropdown} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function User() {
    const {logout, currentUser} = useAuth()
    
    const getOut = async() => {
        try {
            await logout()
            Router.push("/")
        } catch (error) {
            console.log({error})
        }
    }
    return (
        <>
         {
            currentUser 
            ?
                <DropdownButton size="sm" title="Dados do usuário">
                    <Dropdown.Item href="#">
                        <Link href="/profile">
                            <a title="Acessar perfil" style={{textDecoration: 'none', color: '#2D2D2F'}}>
                                {!currentUser.displayName ? "Editar Perfil": currentUser.displayName}
                            </a>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={getOut}>Sair</Dropdown.Item>
                </DropdownButton>
            : <>
                <Link href="/auth/login">
                    <a title="Acessar conta" className="btn btn-sm">Login</a>
                </Link>
                <Link href="/auth/register">
                    <a title="Criar conta" className="btn btn-sm">Registar</a>
                </Link>
            </> }
        </>
    )
}
