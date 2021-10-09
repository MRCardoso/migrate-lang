import React from "react";

import Capsule from '../components/Capsule'
import ImagineerForm from "../components/Imagineer/Form"

export default function novaHistoria(){
	return (
		<Capsule
			title="Criar história"
			description="Crie histórias e ajude a outras pessoas aprender apartir de seus contos..."
			path="historia"
			displayFooter={true}
			>
			<ImagineerForm />
		</Capsule>
	)
}