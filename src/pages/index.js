import React, { useEffect } from "react";

import Link from "next/link";
import Recognizer from '../components/Recognizer/Recognizer'
import Speech from "../components/Recognizer/Speech";
import Capsule from '../components/Capsule';
import { Container} from "react-bootstrap";
import Image from 'next/image'
import { gaEventDonate, paypalInfo } from "../services/metakeys";
import LinkTheImaginner from "../components/GaEvents/LinkTheImaginner";

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
			
		},
		// {
		// 	title:"Privacidade",
		// 	message: [
		// 		`
		// 		Nenhuma informação sensível é coletada pelo site, os únicos dados capturados tem objetivo de ajudá-lo, e a outras pessoas com suas experiências, em momento algum, dados são capturados sem haver a prévia iniciativa do usuário.
		// 		`,
		// 		`
		// 		Cookie - apenas as frases salvas em "privado" são persistidas no navegador do usuário, e podem ser removidas a qualquer momento limpado "o dados do navegador"
		// 		`,
		// 		`
		// 		Dados salvos - As frases são salvas para lhe ajudar com o aprendizado, persistindo aqueles textos que considerar mais difíceis de reproduzir, quando opta por “salvar público" seja uma frase ou história, seu texto será salva na nuvem para popular a base de dados desta aplicação, e com suas experiência, ajudar outras pessoas.
		// 		`
		// 	]
		// }
	]


	return (
		<Capsule
			title="Pratique sua pronúncia do inglês"
			description="Aprenda inglês todos os dias no seu ritmo, tornando o aprendizado divertido."
			path=""
			displayFooter={true}
			displayTitle={false}
			useContainer={false}
		>
			<article className="flex-home black-purple" style={{minHeight: '100vh', paddingBottom: '8px'}}>
				<Container>
					<h3 className="text-center">Esse é um site com features feitos para ajudá-lo no aprendizado do inglês.</h3>
					<Recognizer isMany={false}>
						<Speech textSize={3} enableSpeak={true} enableTranslate={false} enableListening={false} enableSave={true} enableCopyPhrase={true} enableChangeLanguage={false} />
					</Recognizer>
					<section>
						<aside className="app-features mt-4">
							<div  style={{flex: 1}}>
								<div className="app-features-card mb-2">
									<strong><i className="fa fa-book mh-x2"></i>Histórias</strong>
									<p>
										Aprenda com pequenas histórias, pratique enquanto lê, aprenda enquanto conhece novos mundos
									</p>
									<Link href="/historias">
										<a title="historias" className="w-100 btn btn-secondary">Acesse aqui</a>
									</Link>
								</div>
								<div className="app-features-card">
									<strong><i className="fa fa-gamepad mh-x2"></i>Jogue um jogo</strong>
									<p>
										Este é um simples jogo desenvolvido para ajuda-lo com a pronúncia enquanto progride e atinge seu maior score
									</p>
									<LinkTheImaginner className="w-100 btn btn-secondary">Acesse aqui</LinkTheImaginner>
								</div>
							</div>
							<div  style={{flex: 2, textAlign: 'center'}}>
								<Link href="https://store.steampowered.com/app/1946280/Small_phrases_Great_stories/">
									<a target='_blank'><Image src="/logo.gif" alt="Logo Marca" width={164} height={195} /></a>
								</Link>
								<h4 className="text-center">Essas são as ferramentas</h4>
							</div>
							<div style={{flex:1}}>
								<div className="app-features-card mb-2">
									<strong><i className="fa fa-microphone mh-x2"></i>Reconhecimento de voz</strong>
									<p>
										Cansado de digitar aquele artigo longo? que tal escrever falando
									</p>
									<Link href="/falar">
										<a title="Reconhecimento de voz" className="w-100 btn btn-secondary">Acesse aqui</a>
									</Link>
								</div>
								<div className="app-features-card">
									<strong><i className="fa fa-language mh-x2"></i>Traduza seus textos</strong>
									<p>
										Aprenda enquanto traduz seus textos e ouça com a frase é dita
									</p>
									<Link href="/traduzir">
										<a title="Traduza seus textos" className="w-100 btn btn-secondary">Acesse aqui</a>
									</Link>
								</div>
							</div>
						</aside>
					</section>
				</Container>
			</article>
			<article className="flex-center container mt-4">
				
			</article>
			<article className="flex-center container mt-4" id="sobre">
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
			<article className="container mb-4" id="contato">
				<div className="d-flex">
					<div>
						<h4>Contato</h4>
						<p>
							Em caso de dúvidas ou sugestões sinta-se livre para preencher o formulário abaixo, e deixe sua opinião sobre a plataforma e ajude-a crescer
						</p>
						<a href="https://forms.gle/y7dpwJvt347UhFLTA" title="Deixe sua opinião" className="btn btn-primary" target="_blank" rel="noreferrer">
							Deixe sua opinião
						</a>
					</div>
				</div>
				<hr />
			</article>
			<article className="container mt-4" id="doar">
				<div className="d-flex">
					<div className="mh-x2 mb-4">
						<h3>Está gostando desta site?</h3>
						<p>
							Considere contribuir para ajudar este projeto crescer, e sempre estar trazendo novidades no seu aprendizado.
						</p>

						<form action={paypalInfo.uri} method="post" target="_top">
							<input type="hidden" name="business" value={paypalInfo.key} />
							<input type="hidden" name="no_recurring" value="1" />
							<input type="hidden" name="item_name" value="Uma aplicacao com reconhecimento de fala pra praticar a pronuncia do ingles, em busca da proficiencia" />
							<input type="hidden" name="currency_code" value="BRL" />
							<input type="image" onClick={() => gaEventDonate('paypal')} src="https://www.paypalobjects.com/pt_BR/BR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Faça doações com o botão do PayPal" />
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