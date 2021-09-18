import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import AuthContainer from './AuthContainer'

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const { signup } = useAuth()

    return (
        <AuthContainer title="Criar Conta" code="register" onSave={() => signup(email, password)}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password">
                <Form.Label>password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group id="confirmation">
                <Form.Label>confirmation</Form.Label>
                <Form.Control type="password" value={confirmation} onChange={e => setConfirmation(e.target.value)} required />
            </Form.Group>
        </AuthContainer>
    )
}
