import React from "react";

import Capsule from '../components/Capsule'
import Imagineer from "../components/Imagineer";
import Recognizer from "../components/Recognizer";

export default function imagineer(){
	return (
		<Capsule
			title="Histoórias"
			description="Conte-me uma historia..."
			path="imagineer"
			displayFooter={true}
			>
				<Recognizer>
					<Imagineer />
				</Recognizer>
		</Capsule>
	)
}