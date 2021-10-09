import React from "react";

import Recognizer from '../components/Recognizer/Recognizer'
import Speech from "../components/Recognizer/Speech";
import Capsule from '../components/Capsule';

export default function traduzir() {

	return (
		<Capsule
			title="Reconhecimento de voz"
			description="Aplicação para praticar e melhorar a pronunciação do inglês, rumo a proficiência."
			path="falar"
			displayFooter={true}
		>
			<article className="flex-center" style={{minHeight: '100vh'}}>
				<Recognizer isMany={true}>
					<Speech textPlaceholder="" textSize={18} enableSpeak={true} enableTranslate={false} enableListening={true} enableSave={false} enableChangeLanguage={true} />
                </Recognizer>
			</article>
		</Capsule>
	)
}