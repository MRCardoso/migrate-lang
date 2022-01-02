import React from "react";

import Capsule from '../components/Capsule'
import ImagineerList from "../components/Imagineer/List";
import Recognizer from "../components/Recognizer/Recognizer";

export default function historias(){
	return (
		<Capsule
			title="Histórias"
			description="Aprenda inglês, lendo histórias curtas, ou contando suas próprias, Fale inglês com pequenos contos, pratique seu inglês através de suas histórias"
			path="historias"
			displayFooter={true}
			>
				<Recognizer>
					<ImagineerList />
				</Recognizer>
		</Capsule>
	)
}