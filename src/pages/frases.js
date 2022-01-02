import React from "react";

import Capsule from '../components/Capsule'
import Phrases from "../components/Phrases";

export default function Frases(){
	return (
		<Capsule
			title="Frase cadastradas"
			description="Aprenda inglês todos os dias com pequenas frazes, como melhorar seu aprendizado com frazes que mais tem dificuldade, como tornar o aprendizado divertidos"
			path="frases"
			displayFooter={true}
			>
				<Phrases />
		</Capsule>
	)
}