import React from "react";
import {Card as ReactCard} from "react-bootstrap" 

export default function Card(props){
    return (
        <ReactCard className="mb-4">
            <ReactCard.Header>{props.title}</ReactCard.Header>
            <ReactCard.Body>
                {
                    Array.isArray(props.message)
                    ? props.message.map((msg,i) => <p key={i} className="card-text">{msg}</p>)
                    : <p className="card-text">{props.message}</p>
                }
            </ReactCard.Body>
        </ReactCard>
    )
}