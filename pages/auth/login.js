import React from 'react'
import Signin from '../../components/Auth/Signin'
import Capsule from '../../components/Capsule'

export default function login() {
    return (
        <Capsule
			title="Criar Conta"
			description="Interface administrativa para se acessar area logada"
			path="auth/login"
			displayFooter={false}
            displaySidebar={false}
            displayTitle={false}
			>
			<Signin />
		</Capsule>
    )
}
