import React from "react";

import Tips from '../components/Tips';
import Capsule from '../components/Capsule';

export default function traduzir() {

	return (
		<Capsule
			title="Algumas dicas para ajudar"
			description="Aplicação para praticar e melhorar a pronunciação do inglês, rumo a proficiência."
			path="dicas"
			displayFooter={true}
		>
			<article className="flex-center container">
				<Tips />
			</article>
		</Capsule>
	)
}