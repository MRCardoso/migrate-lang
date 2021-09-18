import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getArticles, removeArticle } from "../services/storage";

import Capsule from '../components/Capsule';

export default function Article(){
	const [articles, setArticle] = useState([])
	useEffect(() => { reload() }, [])
	
	const reload = () =>{
		setArticle(getArticles())
	}
	const onRemove = (index) =>{
		removeArticle(index) && reload()
	}
	return (
		<Capsule
			title="Artigos cadastradas"
			description="Lista com artigos cadastados no formulário usando fala."
			path="artigos"
            displayFooter={false}
			>
			<section className="flex-center">
				{articles.length > 0?
					articles.map((item, index) => {
						return (
							<article key={index} className="article">
                                <h3>{item.title}</h3>
                                <p>{item.message}</p>
                                <span>
                                    <small>{item.startDate}</small> à <small>{item.endDate}</small>
                                </span>
                                <Button variant="danger" aria-label="Remover artigo" size="sm" onClick={() => onRemove(item.id)}>
									<i className="fa fa-times-circle"></i>
								</Button>
							</article>
						)
					})
				:
				<Alert variant="warning">
					Não ha nenhum artigo salva em sua base de dados local
				</Alert>
				}
			</section>
		</Capsule>
	)
}