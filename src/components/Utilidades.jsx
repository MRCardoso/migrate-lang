import React, { useState } from "react";
import {Form, InputGroup, FormControl} from 'react-bootstrap';

import Recognizer from "./Recognizer";
import SpeechInput from "./SpeechInput";
import {randomBytes} from "crypto"
import {shuffle, rand, copy, validateNumber} from '../services/utils' 
import { useAuth } from "../contexts/AuthContext";

export default function Utilities(){
	const [hash, setHash] = useState("")
	const [size, setSize] = useState(20)
	const [number, setNumber] = useState("")
	const [numberValue, setNumberValue] = useState("")
	const {setMessager} = useAuth()
	
	const createHash = () => {
        setHash(randomBytes(validateNumber(size, 20)).toString("base64"))
	}

    const createHex = () => {
        setHash(randomBytes(validateNumber(size, 20)).toString("hex"))
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
			setMessager({variant: "success", message: "texto copiado para a área de transferência"})
        }
    }

	return (
		<Form className="article">
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
						lang="en-US"
						placeholder="Diga números aleatorios e seguida embaralhamos e sorteamos o vencedor."
						disabled={true}
						value={numberValue}
						setValue={setNumberValue}
						callback={value => shuffleChoose(value)}
						clearOnEnd={true}
						printNote={true}
						hasLabel={true}
						/>
				</Recognizer>
				{number? <InputGroup.Text className="btn-success text-white">Valor Sorteado: {number}</InputGroup.Text> :''}
			</div>
		</Form>
	)
}