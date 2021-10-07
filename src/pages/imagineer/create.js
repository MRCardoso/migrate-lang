import React from "react";

import Capsule from '../../components/Capsule'
import ImagineerForm from "../../components/Imagineer/Form"

export default function imagineer(){
	return (
		<Capsule
			title="Criar história"
			description="Crie histórias e ajude a outras pessoas aprender apartir de seus contos..."
			path="imagineer"
			displayFooter={true}
			>
			<ImagineerForm />
		</Capsule>
	)
}