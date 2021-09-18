import React from "react";
import {Toast, ToastContainer} from 'react-bootstrap'

export default function ToastModal({message, onClose, title="Atenção", variant="success"}){
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={message !== null} onClose={onClose} bg={variant}>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}