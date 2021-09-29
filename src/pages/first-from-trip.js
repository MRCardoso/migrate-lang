import React from "react";

import Capsule from '../components/Capsule'
import Gallery from "../components/Gallery";
import Utilities from "../components/Utilidades"

export default function firstFromTrip(){
	return (
		<Capsule
			title="De primeira viagem"
			description="De primeira viagem."
			path="first-from-trip"
			displayFooter={true}
			>
				<article className="flex-center" style={{minHeight: '100vh'}}>
                    <Utilities />
                    <Gallery />
                </article>
		</Capsule>
	)
}