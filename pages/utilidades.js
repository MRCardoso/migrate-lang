import React, { useState } from "react";
import {Form, InputGroup, FormControl, Accordion} from 'react-bootstrap';

import Recognizer from "../components/Recognizer";
import SpeechInput from "../components/SpeechInput";
import Capsule from '../components/Capsule';
import ToastModal from "../components/ToastModal";
import {randomBytes} from "crypto"
import {shuffle, rand, copy, validateNumber} from '../services/utils' 

export default function Utilities(){
	const [hash, setHash] = useState("")
	const [size, setSize] = useState(20)
	const [number, setNumber] = useState("")
	const [showMessage, setShowMessage] = useState(false)
	
	const createHash = () => {
        setHash(randomBytes(validateNumber(size, 20)).toString("base64"))
	}

    const createHex = () => {
        setHash(randomBytes(validateNumber(size, 20)).toString("hex"))
    }

	const alphabet = ["A", "B", "C", "D", "E", "F","G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
	const numbers = new Array(100).fill(0).map((_, i) => i + 1)

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
			title="Utilidades"
			description="Utilize sua fala para preencher campos do formulário, também crie uma chave aleatória."
			path="utilidades"
			displayFooter={true}
			>
			<ToastModal message={showMessage? 'texto copiado para a área de transferência': null} onClose={() => setShowMessage(false)} />

			<section className="flex-center full-height">
				<div className="mb-4">
					<Accordion defaultActiveKey="0">
						<Accordion.Item eventKey="0">
							<Accordion.Header>Alfabeto</Accordion.Header>
							<Accordion.Body className="text-center">
								{alphabet.map(letter => <span key={letter} className="button-circle button-purple">{letter}</span>)}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>Números</Accordion.Header>
							<Accordion.Body className="text-center">
								{numbers.map(numb => <span key={numb} className="button-circle button-purple">{numb}</span>)}
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
				<Form className="article">
					<Recognizer>
						<SpeechInput
							type="textarea"
							title="Conteúdo"
							placeholder="Pratique sua pronúncia, elabore frases livremente."
							clearOnEnd={true}
							disabled={true}
							printNote={true}
							hasLabel={true}
						/>
					</Recognizer>

					
					<div className="mb-4">
						<Form.Label>Gerador de Texto aleatório</Form.Label>
						<InputGroup className="mb-2">
							<InputGroup.Text className="clicable btn-info text-white" onClick={() => copyText()}>
								<i className="fa fa-copy"></i>
							</InputGroup.Text>
							<FormControl value={hash} placeholder="Seu código aleatorio" disabled={true} />
							<FormControl value={size} type="number" placeholder="Tamanho" onChange={e => setSize(e.target.value)} />
							
							<InputGroup.Text className="clicable btn-success text-white" onClick={() => createHash()}>
								<i aria-label="Hash string" className="fa fa-hashtag"></i> Hashstring
							</InputGroup.Text>
							<InputGroup.Text className="clicable btn-secondary text-white" onClick={() => createHex()}>
								<i aria-label="Token string" className="fa fa-key"></i> Token
							</InputGroup.Text>
						</InputGroup>
					</div>
					<div className="mb-4">
						<Recognizer isMany={false}>
								<SpeechInput
								type="text"
								title="Sorteio um número"
								placeholder="Diga números aleatorios e seguida embaralhamos e sorteamos o vencedor."
								disabled={true}
								callback={(value) => shuffleChoose(value)}
								clearOnEnd={true}
								printNote={true}
								hasLabel={true}
								/>
						</Recognizer>
						{number? <InputGroup.Text className="btn-success text-white">Valor Sorteado: {number}</InputGroup.Text> :''}
					</div>
				</Form>
			</section>
		</Capsule>
	)
}