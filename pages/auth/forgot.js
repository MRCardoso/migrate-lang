import React from 'react'
import Forgot from '../../components/Auth/Forgot'
import Capsule from '../../components/Capsule'

export default function forgot() {
    return (
        <Capsule
			title="Esqueci a senha"
			description="Interface administrativa para recuperar senha"
			path="auth/forgot"
			displayFooter={false}
            displaySidebar={false}
            displayTitle={false}
			>
			<Forgot />
		</Capsule>
    )
}
