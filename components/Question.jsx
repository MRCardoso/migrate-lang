import React from "react"
import { Popover, OverlayTrigger } from 'react-bootstrap'

export default function Question(){
    return (
        <OverlayTrigger trigger="hover" placement="right" overlay={
            <Popover id={`popover-positioned-right`}>
            <Popover.Header as="h3">Dúvidas</Popover.Header>
            <Popover.Body>
                <p>O botão com o icone <i className="fa fa-microphone"></i> permite Iniciar/encerrar a captura de fala.</p>
                <p>O botão com o icone <i className="fa fa-copy"></i> permite copiar texto gerado na captura de fala.</p>
                <p>O botão com o icone <i className="fa fa-save"></i> permite salvar texto gerado na captura de fala.</p>
            </Popover.Body>
            </Popover>
        }
        >
            <button type="button" aria-label="Dúvidas?" className="button-circle question">
                <i className="fa fa-question-circle"></i>
            </button>
        </OverlayTrigger>
    )
}