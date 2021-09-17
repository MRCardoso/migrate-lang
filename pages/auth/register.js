import React from 'react'
import Signup from '../../components/Auth/Signup'
import Capsule from '../../components/Capsule'

export default function register() {
    return (
        <Capsule
			title="Criar Conta"
			description="Interface administrativa para se registrar dentro da prataforma"
			path="auth/register"
			displayFooter={false}
            displaySidebar={false}
            displayTitle={false}
			>
			<Signup />
		</Capsule>
    )
}
