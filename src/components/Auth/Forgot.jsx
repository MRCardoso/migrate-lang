import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import AuthContainer from './AuthContainer'

export default function Signup() {
    const [email, setEmail] = useState("")
    const { forgot } = useAuth()

    return (
        <AuthContainer title="Esqueci a senha" code="forgot" onSave={() => forgot(email)}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
        </AuthContainer>
    )
}
