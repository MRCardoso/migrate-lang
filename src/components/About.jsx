import React, { useEffect, useState } from "react";

import Link from 'next/link'
import Image from 'next/image'
import { Spinner } from "react-bootstrap";
// import Card from "./Card";
// import { CardGroup } from "react-bootstrap";
let GitCacheData = null;

export default function About() {
    const [gitInfo, setGitInfo] = useState(null)
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
            <div className="image">
                <Image
                    loader={loader}
                    src="/logo.png"
                    alt="Logo Marca"
                    layout="fill"
                    />
            </div>
            <h3>{gitInfo.name}</h3>
            <aside>
                <h4>{gitInfo.bio}</h4>
                <div>
                    <Link href={gitInfo.html_url}>
                        <a title="GitHub pessoal" target="_blank" rel="noreferrer">
                            <i className="fa fa-github"></i> {gitInfo.login}
                        </a>
                    </Link>
                </div>
                <div>
                    {gitInfo.public_repos} Repositórios
                </div>
                <div>
                    <i className="fa fa-twitter"></i>{gitInfo.twitter_username}
                </div>
            </aside>
            <div className="about-text"> 
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