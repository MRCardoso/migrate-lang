import React, { useState } from "react";

import Recognizer from '../components/Recognizer/Recognizer'
import Speech from "../components/Recognizer/Speech";
import Capsule from '../components/Capsule';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function Traduzir() {
	const [isMany, setIsMany] = useState(true)
	return (
		<Capsule
			title="Reconhecimento de voz"
			description="Aprenda conversando consigo mesmo, deixe seus pensamentos fluírem e pratique seu inglês falado."
			path="falar"
			displayFooter={true}
		>
			<article className="flex-center" style={{minHeight: '100vh'}}>
				<Recognizer isMany={isMany}  detectSpeak={false}>
					<Speech textPlaceholder="" textSize={18} enableSpeak={true} enableTranslate={false} enableListening={true} alwaysShowNote={true} enableSave={false} enableChangeLanguage={true} >
					<OverlayTrigger placement="top" overlay={<Tooltip>Ativar comparação</Tooltip>}>
						<Button
							aria-label="ativar/desativar"
							variant={`${isMany? 'light': 'primary'}`}
							className={`mb-2 fa fa-toggle-${isMany ? 'off': 'on'}`}
							onClick={() => setIsMany(isMany ? false : true)}></Button>
					</OverlayTrigger>

					</Speech>
                </Recognizer>
			</article>
		</Capsule>
	)
}