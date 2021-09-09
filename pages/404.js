import React from "react";
import Link from "next/link"
import Capsule from '../components/Capsule';
export default function Error404(){
	return (
        <Capsule
            title="Página não encontrada"
			description="Página padrão para posicionar usuário sobre página inexistente"
			path="404"
			displaySidebar={false}
			displayFooter={false}
            >

            <section style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
                <h1>
                    Página não encontrada.
                </h1>
                
                <Link href="/">
                    <a title="Voltar para home">Voltar</a>
                </Link>
            </section>
        </Capsule>
	)
}