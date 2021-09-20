import React from "react";

import Capsule from '../components/Capsule'
import Phrases from "../components/Phrases";

export default function Frases(){
	return (
		<Capsule
			title="Frase cadastradas"
			description="Lista com as frases escolhidas pelo usuário para futuros exercícios."
			path="frases"
			displayFooter={true}
			>
				<Phrases />
		</Capsule>
	)
}