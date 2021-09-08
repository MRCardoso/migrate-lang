import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import React, { useState } from "react";
import {FormControl, Dropdown, DropdownButton, Button, Row, Col, Form} from 'react-bootstrap';
import {randomBytes} from "crypto"

import Recognizer from "../components/Recognizer";
import SpeechInput from "../components/SpeechInput";
import Capsule from '../components/Capsule';

export default function Hash(){
	const [hash, setHash] = useState("")
	const [size, setSize] = useState("")
	const [type, setType] = useState(1)
	
	const createHash = () => {
		let newSize = size.replace(/[^0-9]/ig, '')
		if(!newSize){
			newSize = 20
		}
		setHash(randomBytes(parseInt(newSize)).toString(type === 1 ? "hex": "base64"))
	}

	return (
		<Capsule 
			title="Lista de frases"
			description="Aplicação react para exercitar conhecimentos e pratica do inglês"
			keywords="SPA, speech, english, practice, web developer, english test, speaking english, english exercise, migrate language, pratique inglês, mardozux"
			>
			<main className="scape-sidebar">
				<Recognizer>
					<SpeechInput type="text" title="Titúlo" disabled={false} printNote={true} hasLabel={true} />
				</Recognizer>
				<Recognizer>
					<SpeechInput type="textarea" title="Mensagem" disabled={false} printNote={true} hasLabel={true} />
				</Recognizer>

				<Row>
					<Form.Label>Texto Randomico</Form.Label>
					<Col md="8">
						<FormControl value={hash} placeholder="Create Hash" disabled={true} />
					</Col>
					<Col>
						<Recognizer isMany={false}>
							<SpeechInput type="text" title="Tamanho do hash" disabled={false} callback={(value) => setSize(value)} printNote={false} hasLabel={false} />
						</Recognizer>
					</Col>
					<Col>
						<DropdownButton variant="outline-secondary" title={type === 1 ? 'Hex': 'Base64'} id="input-group-dropdown-1">
							<Dropdown.Item onClick={() => setType(1)}>Hex</Dropdown.Item>
							<Dropdown.Item onClick={() => setType(2)}>base64</Dropdown.Item>
						</DropdownButton>
					</Col>
					<Col>
						<Button variant="primary" type="button" onClick={createHash}>Criar hash</Button>
					</Col>
				</Row>
			</main>
		</Capsule>
	)
}