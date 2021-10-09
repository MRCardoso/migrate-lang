import React from "react";
import { Table, Card } from "react-bootstrap";
import {alphabetValues, numberValues} from '../services/utils' 

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
			cols: ["Pronome", "Possessivo", "presente", "Afirmação", "abrev", "negação", "abrev", "pergunta"],
			rows: [
				["I", "My", "am", "I am", "I'm", "I am not", "i'm not", "Am i?"],
				["He", "His","is", "He is", "He's", "He is not", "He isn't", "Is he?"],
				["She", "Her", "is", "She is", "She's", "She is not", "She isn't", "Is she?"],
				["It", "Its", "is", "It is", "it's", "It is not", "It isn't", "Is it?"],
				["We", "Our", "Are", "We are", "we're", "We are not", "We aren't", "Are we?"],
				["You", "Your", "Are", "You are", "your're", "You are not", "You aren't", "Are you?"],
				["They", "Their", "Are", "They are", "They're", "They are not", "They aren't", "Are they?"],
			]
		},
	]

	return (
		<>
			<div className="mb-4 mt-4">
				<div>
					<h4>Alfabeto</h4>
					{alphabetValues.map(letter => <span key={letter} className="btn btn-secondary btn-sm mh-x2">{letter}</span>)}
				</div>
				<hr />
				<div>
					<h4>Números</h4>
					{numberValues.map(numb => <span key={numb} className="btn btn-secondary btn-sm mh-x2 mb-2">{numb}</span>)}
				</div>
				<hr />
			</div>
			<section className="mb-60">
					{wordsHR.map((item, index) => {
						return (
							<Card className="mb-4" key={index}>
								<Card.Header>{item.title}</Card.Header>
								<Card.Body>
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
								</Card.Body>
							</Card>
						)
					})}
			</section>
		</>
	)
}