import React from "react";

import Recognizer from '../components/Recognizer/Recognizer'
import Speech from "../components/Recognizer/Speech";
import Capsule from '../components/Capsule';

export default function traduzir() {

	return (
		<Capsule
			title="Traduza seus textos"
			description="Aplicação para praticar e melhorar a pronunciação do inglês, rumo a proficiência."
			path="traduzir"
			displayFooter={true}
		>
			<article className="flex-center" style={{minHeight: '100vh'}}>
				<Recognizer isMany={false}>
                    <Speech textPlaceholder="Coloque seu texto e traduza ou escute..." textSize={8} enableSpeak={false} enableTranslate={true} enableListening={true} enableSave={false} enableChangeLanguage={true} />
                </Recognizer>
			</article>
		</Capsule>
	)
}