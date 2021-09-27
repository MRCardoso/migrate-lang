import React from "react";

export default function ToastModal({message, onClose, title="Atenção", variant="default"}){
    return (
        (message ?
            <div className={`my-toast my-toast-${variant||"default"}`}>
                <header>
                    <strong>{title}</strong>
                    <i onClick={onClose} className="clicable fa fa-times"></i>
                </header>
                <div>
                    {Array.isArray(message) ? 
                        <ul>
                            {message.map((msg, i) => <li key={i}>{msg}</li>)}
                        </ul>
                    : <p>{message}</p>}
                </div>
            </div>
            : ""
        )
    )
}