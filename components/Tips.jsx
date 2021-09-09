import React from "react";
import { Row, Col, Table, Container } from "react-bootstrap";

export default function Tips(){
	const wordsHR = [
		{
			title: "O H soa com R em nossa lingua, já o R não há nada próximo",
			cols: ["Palavra", "Como soa"],
			rows: [
				["Head", "Read"],
				["Red", "Réd"],
				["River", "Uriver"],
				["Right", "Uright"],
				["Range", "Urange"],
				["Head", "Read"],
				["Heal", "Ri"],
				["Hand", "Rand"],
			]
		},
		{
			title: "Verbo to be",
			cols: ["Pronome", "presente", "Afirmação", "abrev", "negação", "abrev", "pergunta"],
			rows: [
				["I", "am", "I am", "I'm", "I am not", "i'm not", "Am i?"],
				["He", "is", "He is", "He's", "He is not", "He isn't", "Is he?"],
				["She", "is", "She is", "She's", "She is not", "She isn't", "Is she?"],
				["It", "is", "It is", "it's", "It is not", "It isn't", "Is it?"],
				["We", "Are", "We are", "we're", "We are not", "We aren't", "Are we?"],
				["You", "Are", "You are", "your're", "You are not", "You aren't", "Are you?"],
				["They", "Are", "They are", "They're", "They are not", "They aren't", "Are they?"],
			]
		}
	]

	return (
		<section className="mb-60">
			{wordsHR.map((item, index) => {
				return (
					<Row className="mh-20" key={index}>
						<h3>{item.title}</h3>
						<Table striped bordered hover className="table-responsive">
							<thead>
								<tr>
									{item.cols.map((col, i) => <th key={i}>{col}</th>)}
								</tr>
							</thead>
							<tbody>
								{item.rows.map((row, index2) => {
									return (<tr key={index2}>{row.map(r => <td key={r}>{r}</td>)}</tr>)
								})}
							</tbody>
						</Table>
					</Row>
				)
			})}
		</section>
	)
}