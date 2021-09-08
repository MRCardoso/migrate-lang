import React from "react";

export default function Card(props){
    return (
        <div className="card ml-4 mb-4">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                {
                    Array.isArray(props.message)
                    ? props.message.map(msg => <p key={msg} className="card-text">{msg}</p>)
                    : <p className="card-text">{props.message}</p>
                }
                
            </div>
        </div>
    )
}