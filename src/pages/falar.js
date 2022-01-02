import React from "react";

import Recognizer from '../components/Recognizer/Recognizer'
import Speech from "../components/Recognizer/Speech";
import Capsule from '../components/Capsule';

export default function traduzir() {

	return (
		<Capsule
			title="Reconhecimento de voz"
			description="Aprenda conversando consigo mesmo, deixe seus pensamentos fluírem e pratique seu inglês falado."
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