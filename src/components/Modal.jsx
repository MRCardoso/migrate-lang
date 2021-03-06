import React from 'react'
import {Button, Modal} from 'react-bootstrap';

export default function ModalForm(props) {
    return (
        <Modal show={props.isOpen} onHide={() =>{ props.closeCallback()}} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" aria-label="fechar" onClick={() =>{ props.closeCallback()}}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
  }