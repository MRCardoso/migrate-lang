// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React from "react";

import Capsule from '../components/Capsule';
import Link from 'next/link'
import Image from 'next/image'

export default function Home(props) {
	
	const loader = () =>{
		return props.github.avatar_url
	}
	return (
		<Capsule
			title={props.github.name}
			description={`${props.github.name} ${props.github.bio}`}
			path=""
			displayFooter={true}
		>
			<section className="fiex-center full-height">
                <div className="flex-inline flex-start">
                    <div className="image">
                        <Image
                            loader={loader}
                            src="/logo.png"
                            alt="Logo Marca"
                            layout="fill"
                            />
                    </div>
                    <aside style={{marginLeft: '12px'}}>
                        <h4>{props.github.bio}</h4>
                        <div>
                            <Link href={props.github.html_url}>
                                <a title="GitHub pessoal" target="_blank" rel="noreferrer">
                                    <i className="fa fa-github"></i>
                                    {props.github.login}
                                </a>
                            </Link>
                        </div>
                        <div>
                            {props.github.public_repos} Repositórios
                        </div>
                        <div><i className="fa fa-twitter"></i>{props.github.twitter_username}</div>
                    </aside>

                </div>
			</section>
            
		</Capsule>
	)
}

export async function getStaticProps() {
	const response = await fetch("https://api.github.com/users/MRCardoso").then(res => res.json())
	
	return {
		props:{
			github: response
		}
	}
}