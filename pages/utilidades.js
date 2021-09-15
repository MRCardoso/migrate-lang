import React, { useState } from "react"
import {FormControl, DropdownButton, Button, Dropdown, Row, Col, InputGroup, Form} from 'react-bootstrap'
import Capsule from '../components/Capsule'
import Recognizer from "../components/Recognizer"
import SpeechInput from "../components/SpeechInput"
import {randomBytes} from "crypto"
import {shuffle, rand, copy} from '../services/utils' 
import ToastModal from "../components/ToastModal"

export default function Random(){
	const [hash, setHash] = useState("")
	const [size, setSize] = useState("")
	const [type, setType] = useState(1)
    const [number, setNumber] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [colorPicker, setColorPicker] = useState("#FFF")

	const createHash = () => {
		let newSize = size.replace(/[^0-9]/ig, '')
		if(!newSize){
			newSize = 20
		}
		setHash(randomBytes(parseInt(newSize)).toString(type === 1 ? "hex": "base64"))
	}

    const shuffleChoose = (value) => {
        const values = value
            .split(' ')
            .map(v => String(v).replace(/[^0-9]/ig, '').trim())
            .filter(v => v)

        const shuffles = shuffle(values)
        const index = rand(0, shuffles.length-1)
        setNumber(shuffles[index])
    }

    const copyText = () =>{
        if(copy(hash)){
            setShowMessage(true)
        }
    }

	return (
        <Capsule 
			title="Algumas funcionalidade úteis"
			description="Gerador de texto randomicos e outras utilidades."
			path="randomize"
			displayFooter={true}
			>
            <ToastModal message={showMessage? 'texto copiado para a área de transferência': null} onClose={() => setShowMessage(false)} />
            <section className="flex-center full-height">
                <div className="article">
                    <Row>
                        <Col md="8">
                            <Form.Label>Gerador de Texto aleatório</Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Text className="btn-info text-white" onClick={() => copyText()}>
                                    <i className="fa fa-copy"></i>
                                </InputGroup.Text>
                                <FormControl value={hash} placeholder="Seu código aleatorio" disabled={true} />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Recognizer isMany={false}>
                                <SpeechInput type="text" title="Tamanho" disabled={false} callback={(value) => setSize(value)} printNote={false} hasLabel={true} />
                            </Recognizer>
                        </Col>
                        <Col>
                            <Form.Label className="text-right">Formato</Form.Label>
                            <DropdownButton variant="outline-secondary" title={type === 1 ? 'Hex': 'Base64'}>
                                <Dropdown.Item onClick={() => setType(1)}>Hex</Dropdown.Item>
                                <Dropdown.Item onClick={() => setType(2)}>base64</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col>
                            <Button variant="primary" type="button" aria-label="Criar hash" onClick={createHash}>Gerar hash</Button>
                        </Col>
                    </Row>
                </div>

                <div className="article mb-4">
                    <Row>
                        <Col>
                            <Recognizer isMany={false}>
                                <SpeechInput
                                    type="text"
                                    title="Sorteio um número"
                                    placeholder="Diga números aleatorios e seguida embaralhamos e sorteamos o vencedor."
                                    disabled={true}
                                    callback={(value) => shuffleChoose(value)}
                                    printNote={true}
                                    hasLabel={true}
                                />
                            </Recognizer>
                        </Col>
                        <Col>
                            {number? <button type="button" aria-label="Valor sorteado" className="button-circle">{number}</button>: ''}
                        </Col>
                    </Row>
                </div>
                <div className="article mb-4" style={{background: colorPicker}}>
                    <Form.Label htmlFor="exampleColorInput">Paleta de cores</Form.Label>
                    <Form.Control type="color" value={colorPicker} onChange={e => setColorPicker(e.target.value)} title="Escolha uma cor" />
                </div>
            </section>
        </Capsule>
	)
}