import React from "react";

import Link from "next/link";
import Recognizer from '../components/Recognizer/Recognizer'
import Speech from "../components/Recognizer/Speech";
import Capsule from '../components/Capsule';
import { Container} from "react-bootstrap";
import Image from 'next/image'

export default function Home() {
	const cards = [
		{
			title: "Sobre",
			message: [
				`
				Esta aplicação surgiu de uma necessidade, que é o aprendizado do inglês, especialmente o "speaking"
				Aprender um novo idioma é um desafio, que varia de pessoa para pessoa, e nada mais desgastante e cansativo do que aprender seguindo um "guia" que não se encaixa no seu jeito de aprender.
				Todos nós temos jeitos diferentes de aprender e assimilar informação, uma das forma de agilizar o aprendizado, é aprender por consequência, não por necessidade.
				`,
				`
				A melhor forma de atingir a excelência é a repetição, mas chega um ponto que esta repetição se torna entediante e te tira o interesse em prosseguir...
				Pensando nisso, cada nova feature implementada neste site, é voltada para que aprenda enquanto faz alguns desafios, progride no seu tempo, e o mais importante, você define como e quando aprender.
				A sensação de recompensa a cada conquista, e uma das formas mais efetivas em te manter entretido...
				`,
				`
				Você pode estar ouvindo sua música favorita (em inglês) e dá uma googlada para ver sua tradução, que tal pegar a letra original colar aqui, e experimentar reproduzir a letra...
				Pode estar na épocas de provas, e precise escrever ou transcrever um  artigo enorme, que tal deixar de lado a digitação e enquanto precisa elaborar seu texto, prática o speaking
				Quem sabe tenha recebido aquela mensagem nas mídias sociais de um gringo, e não saiba como responder direito, bora usar o tradutor para não deixar de responder de forma equivalente.
				Talvez seja devorador de livros, gosta de busca por histórias que façam sua mente viajar por novas histórias, navegue em nossas histórias, ou quem sabe crie suas próprias e ajude aos novos acessantes deste site...
				Mas se você gosta de games não foi esquecido, porque também surgiu um game que expande essa ideia de aprendizado por tabela, que também será evoluído e terá alguns desafios futuramente...
				`,
				`
				Claro que esta plataforma  por si só, não irá lhe tornar fluente, mas tem algumas feature que irá lhe ajudar ao longo da jornada.
				`
			] 
			
		}
	]

	return (
		<Capsule
			title="Pratique sua pronúncia do inglês"
			description="Aplicação para praticar e melhorar a pronunciação do inglês, rumo a proficiência."
			path=""
			displayFooter={true}
			displayTitle={false}
			useContainer={false}
		>
			<article className="flex-home black-purple" style={{minHeight: '100vh', paddingBottom: '8px'}}>
				<Container>
					<h3 className="text-center">Esse é um site com features feitos para ajudá-lo no aprendizado do inglês.</h3>
					<Recognizer isMany={false}>
						<Speech textSize={3} enableSpeak={true} enableTranslate={false} enableListening={false} enableSave={true} enableChangeLanguage={false} />
					</Recognizer>
					<section>
						<aside className="app-features mt-4">
							<div  style={{flex: 1}}>
								<div className="app-features-card mb-2">
									<h6><i className="fa fa-book mh-x2"></i>Histórias</h6>
									<p>
										Aprenda com pequenas histórias, pratique enquanto lê, aprenda enquanto conhece novos mundos
									</p>
									<Link href="/historias">
										<a title="historias" className="w-100 btn btn-secondary">Acesse aqui</a>
									</Link>
								</div>
								<div className="app-features-card">
									<h6><i className="fa fa-gamepad mh-x2"></i>Jogue um jogo</h6>
									<p>
										Este é um simples jogo desenvolvido para ajuda-lo com a pronúncia enquanto progride e atinge seu maior score
									</p>
									<Link href="https://mardozux.itch.io/the-imaginner">
										<a title="The imaginner Game" className="w-100 btn btn-secondary" target="_blank" rel="noreferrer">Acesse aqui</a>
									</Link>
								</div>
							</div>
							<div  style={{flex: 2, textAlign: 'center'}}>
								<Image src="/logo.png" alt="Logo Marca" width={228} height={220} />
								<h4 className="text-center">Essas são as ferramentas</h4>
							</div>
							<div style={{flex:1}}>
								<div className="app-features-card mb-2">
									<h6><i className="fa fa-microphone mh-x2"></i>Reconhecimento de voz</h6>
									<p>
										Cansado de digitar aquele artigo longo? que tal escrever falando
									</p>
									<Link href="/falar">
										<a title="historias" className="w-100 btn btn-secondary">Acesse aqui</a>
									</Link>
								</div>
								<div className="app-features-card">
									<h6><i className="fa fa-language mh-x2"></i>Tradutor</h6>
									<p>
										Aprenda enquanto traduz seus textos e ouça com a frase é dita
									</p>
									<Link href="/traduzir">
										<a title="historias" className="w-100 btn btn-secondary">Acesse aqui</a>
									</Link>
								</div>
							</div>
						</aside>
					</section>
				</Container>
			</article>
			<article className="flex-center container mt-4">
				{cards.map(c => {
					return (
						<div key={c.title}>
							<h4 className="mb-4">{c.title}</h4>
							{c.message.map((t, i) =><p key={i}>{t}</p>)}
							<hr />
						</div>
					)
				})}
			</article>
			<article className="container mt-4">
				<div className="d-flex">
					<div className="mh-x2 mb-4">
						<h3>Está gostando desta aplicação?</h3>
						<p>Considere contribuir para ajudar este projeto crescer, e sempre estar trazendo novidades no seu aprendizado.</p>

						<form action="https://www.paypal.com/donate" method="post" target="_top">
							<input type="hidden" name="business" value="5GLEV64R9MAEU" />
							<input type="hidden" name="no_recurring" value="1" />
							<input type="hidden" name="item_name" value="Uma aplicacao com reconhecimento de fala pra praticar a pronuncia do ingles, em busca da proficiencia" />
							<input type="hidden" name="currency_code" value="BRL" />
							<input type="image" src="https://www.paypalobjects.com/pt_BR/BR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Faça doações com o botão do PayPal" />
							<img alt="Doar valor" border="0" src="https://www.paypal.com/pt_BR/i/scr/pixel.gif" width="1" height="1" />
						</form>
					</div>
				</div>
				<hr />
			</article>
			<article className="container mt-4 mb-4">
				<div className="d-flex">
					<div>
						<h4>Conheça grammarly</h4>
						<p>
							Baixe este plugin em seu navegador, ele irá ajudá-lo com a gramárica em seus textos.
						</p>
						<a href="https://www.grammarly.com/" className="btn btn-sm btn-secondary" target="_blank" rel="noreferrer">
							<i className="fa fa-puzzle-piece"></i> grammarly
						</a>
					</div>
				</div>
			</article>
		</Capsule>
	)
}