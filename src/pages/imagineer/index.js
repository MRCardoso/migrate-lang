import React from "react";

import Capsule from '../../components/Capsule'
import ImagineerList from "../../components/Imagineer/List";
import Recognizer from "../../components/Recognizer";

export default function imagineer(){
	return (
		<Capsule
			title="Histórias"
			description="Conte-me uma historia..."
			path="imagineer"
			displayFooter={true}
			>
				<Recognizer>
					<ImagineerList />
				</Recognizer>
		</Capsule>
	)
}