import React from 'react'
import Capsule from '../components/Capsule';
import Profile from '../components/Auth/Profile';

export default function profile(){
    return (
		<Capsule
			title="Dados do Usuário"
			description="Dados do usuário"
			path="profile"
            displayFooter={true}
			>
            <Profile />
		</Capsule>
	)
}