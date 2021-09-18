import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import AuthContainer from './AuthContainer'

export default function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signin } = useAuth()

    return (
        <AuthContainer title="Login" code="login" onSave={() => signin(email, password)}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password">
                <Form.Label>password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
        </AuthContainer>
    )
}
