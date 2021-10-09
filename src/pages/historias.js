import React from "react";

import Capsule from '../components/Capsule'
import ImagineerList from "../components/Imagineer/List";
import Recognizer from "../components/Recognizer/Recognizer";

export default function historias(){
	return (
		<Capsule
			title="Histórias"
			description="Pratique sua pronúncia lendo histórias..."
			path="imagineer"
			displayFooter={true}
			>
				<Recognizer>
					<ImagineerList />
				</Recognizer>
		</Capsule>
	)
}