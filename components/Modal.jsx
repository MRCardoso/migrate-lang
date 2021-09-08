import React from 'react'
import {Button, Modal} from 'react-bootstrap';

export default function ModalForm(props) {
    return (
        <Modal show={props.isOpen} onHide={() =>{ props.closeCallback()}}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() =>{ props.closeCallback()}}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
  }