import React, {useState} from 'react'
import {Form, Card, Button} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

export default function Profile(){
    const { currentUser, update, setMessager } = useAuth()
    
    const [name, setName] = useState(currentUser && currentUser.displayName || "")
    const [email, setEmail] = useState(currentUser && currentUser.email)
    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
	const updateUser = async (e) => {
        e.preventDefault()
        try {
            setMessager(null)
            setLoading(true)
            const data = {}
            
            if(currentUser.displayName !== name) data.name = name
            if(currentUser.email !== email) data.email = email
            if(currentUser.password !== password) data.password = password
            
            await update(data)
            setMessager({variant: "success", message: "Dados salvos com sucesso"})
        } catch (error) {
            setMessager({variant: "danger", message: error.message})
        }
        setLoading(false)
    }
    return (
        <div className="justify-content-center" style={{minHeight: '100vh'}}>
            <Card>
                <Card.Header>
                    <h1 className="text-center mb-4">{currentUser && currentUser.displayName}</h1>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={updateUser}>
                        <Form.Group id="email">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group id="confirmation">
                            <Form.Label>confirmation</Form.Label>
                            <Form.Control type="password" value={confirmation} onChange={e => setConfirmation(e.target.value)} />
                        </Form.Group>

                        <Button disabled={loading} className="w-100 mt-4" type="submit" variant="primary">Salvar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
	)
}