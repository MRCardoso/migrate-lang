import React from "react";

import Capsule from '../../components/Capsule'
import ImagineerForm from "../../components/Imagineer/Form"

export default function imagineer(){
	return (
		<Capsule
			title="Criar história"
			description="Conte-me uma historia..."
			path="imagineer"
			displayFooter={true}
			>
			<ImagineerForm />
		</Capsule>
	)
}