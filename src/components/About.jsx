import React, { useEffect, useState } from "react";

import Link from 'next/link'
import Image from 'next/image'
import { Spinner } from "react-bootstrap";
// import Card from "./Card";
// import { CardGroup } from "react-bootstrap";
let GitCacheData = null;

export default function About() {
    const [gitInfo, setGitInfo] = useState(null)

    const thirdPart = [
        {url: 'https://www.linkedin.com/in/mrcardoso/', icon: 'linkedin', label: "Linkedin"},
        {url: 'https://github.com/MRCardoso', icon: 'git', label: "Github" },
        {url: 'https://www.facebook.com/mardozux', icon: 'facebook-square', label: "Página no facebook"},
        {url: 'https://www.instagram.com/mardozux/', icon: 'instagram', label: "Instagram de game developer"},
        {url: 'https://mardozux.itch.io/', icon: 'gamepad', label: "Jogos publicados" },
    ]

    useEffect(() => {
        if(GitCacheData === null){
            fetch("https://api.github.com/users/MRCardoso")
            .then(res => res.json())
            .then(response => {
                GitCacheData = response
                setGitInfo(GitCacheData)
            })
        } else{
            setGitInfo(GitCacheData)
        }
    }, [])
	
	const loader = () =>{
		return gitInfo.avatar_url
	}

    if(gitInfo === null){
        return (
            <Spinner animation="grow" />
        )
    }
    
	return (
        <section className="flex-about" id="contato">
            <div className="container justify-content-center">
                <div className="about-text d-flex w-100">
                    <div className="w-50">
                        <div className="image">
                            <Image
                                loader={loader}
                                src="/logo.png"
                                alt="Logo Marca"
                                layout="fill"
                                />
                        </div>
                        <h3>{gitInfo.name}</h3>
                    </div>
                    <div>
                        <p>
                            A ideia era aproveitar os próprios recursos do javascript e praticar minha pronúncia no inglês, em busca da proficiência, 
                            claro que o “Speaking” é apenas uma parte, ainda faltará o “Listening, Reading, Writing”, mas este já é um começo, certamente, provavelmente, 
                            com certeza absoluta, deve haver soluções mais eficazes no mercado.
                        </p>
                        <p>
                            Conclusões são importantes, do contrário se torna um amontoado de conhecimento perdido, além de que este projeto me deu ideia de um outro, 
                            e esta é a parte incrível, não busque a perfeição, apenas faça o seu melhor e termine aquilo que começou.
                        </p>
                        <p>
                            Quem sabe este projeto possa ser útil e ajude a outras pessoas que também estão em busca de um novo idioma.
                        </p>
                    </div>
                </div>
                <aside>
                    <h4>Redes sociais</h4>
                    {/* <h4>{gitInfo.bio}</h4>
                    <div>{gitInfo.public_repos} Repositórios</div> */}
                    <ul>
                    {thirdPart.map(t => {
                        return (
                            <li key={t.icon}>
                                <a href={t.url} target="_blank" rel="noreferrer" title={t.label}>
                                    <i className={`fa fa-${t.icon} mh-x2`}></i>
                                    {t.label}
                                </a>
                            </li>
                        )
                    })}
                    </ul>
                </aside>
            </div>
        </section>
	)
}

// export async function getStaticProps() {
// 	const response = await fetch("https://api.github.com/users/MRCardoso").then(res => res.json())
	
// 	return {
// 		props:{
// 			github: response
// 		}
// 	}
// }