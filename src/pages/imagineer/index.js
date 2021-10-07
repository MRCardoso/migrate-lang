import React from "react";

import Capsule from '../../components/Capsule'
import ImagineerList from "../../components/Imagineer/List";
import Recognizer from "../../components/Recognizer";

export default function imagineer(){
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