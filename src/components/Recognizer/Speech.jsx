import React, { useState } from 'react'
import { Form, OverlayTrigger, Tooltip, DropdownButton, Button, Dropdown} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { requestTranslate } from '../../services/requests'
import {copy, enabledCloud, prepareError, text2Speech} from '../../services/utils'
import Modal from '../Modal'
import Phrases from '../Phrases'

export default function Speech(props){
    const {
        setPhrase,
        phraseReason,
        alwaysShowNote = false,
        setIsListining,
        isListning,
        phrase,
        handleSaveNote,
        note,
        setNote,
        setMicLang,
        closeOnSpeakend,
        enableSpeak = true,
        enableTranslate=true,
        enableListening=true,
        enableSave = true,
        enableChangeLanguage=true,
        enableCopyPhrase = false,
        textSize=8,
        textPlaceholder="Coloque seu texto aqui e pratique, traduza ou escute..."
    } = props
    const {setMessager, setLoading} = useAuth()
    const [lang, setLang] = useState('en-US')
    const [listen, setListen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const copyText = (value) =>{
        if(copy(value)){
            setMessager({variant: "success", message: "texto copiado para a área de transferência"})
        }
    }

    const customSave = (mode) => {
        handleSaveNote(mode, (status, message) => {
            setMessager({variant: (status ? "success": "danger"), message})
        })
    }
    const startRecording = (e) => {
        e.preventDefault()
        setIsListining(prevState => !prevState)
    }

    const toggleLanguage = () => {
        const nextValue = (lang === 'en-US' ? 'pt-BR' : 'en-US')
        setNote('')
        setMicLang(nextValue)
        setLang(nextValue)
    }

    const onTranslate = () => {
        setLoading(true)
        
        requestTranslate(lang, [phrase])
            .then(translates => {
                toggleLanguage()
                setPhrase(translates[phrase])
            })
            .catch(error =>{
                setMessager({variant: "danger", message: prepareError(error)})
            })
            .finally(() => setLoading(false))
    }

    return (
        <React.Fragment>
            <Modal isOpen={modalOpen} closeCallback={e => setModalOpen(false)} title="Selecione uma frase">
                <Phrases onSelectPhrase={(value) => {
                    setModalOpen(false)
                    setPhrase(value)
                }} isModal={true} />
            </Modal>
            <div className="speech-grid">
                <div className="flex-columns">
                    {enableSpeak?
                    <OverlayTrigger placement="top" overlay={<Tooltip>Falar [alt + S]</Tooltip>}>
                        <Button 
                            accessKey="s" 
                            type="button" 
                            aria-label="ativar/desativar fala"
                            variant={`${isListning ? 'primary': 'light'}`}
                            disabled={closeOnSpeakend ? false : !phrase}
                            className={`mb-2 fa fa-${isListning ? "stop" : "microphone"}`} 
                            onClick={startRecording}></Button>
                    </OverlayTrigger>
                    :''}
                    {enableTranslate?
                    <OverlayTrigger placement="top" overlay={<Tooltip>Traduzir [alt + T]</Tooltip>}>
                        <Button
                            accessKey="t"
                            disabled={isListning || !phrase}
                            type="button"
                            aria-label="traduzir"
                            className="mb-2 fa fa-language"
                            onClick={onTranslate}></Button>
                    </OverlayTrigger>
                    :''}
                    {enableListening?
                    <OverlayTrigger placement="top" overlay={<Tooltip>Ouvir [alt + L]</Tooltip>}>
                        <Button
                            accessKey="l"
                            disabled={closeOnSpeakend ? (!note || isListning) : (!phrase || isListning)}
                            variant={listen ? 'primary': 'light'}
                            type="button" 
                            aria-label="ouvir"
                            className={`mb-2 fa fa-${listen ? 'stop': 'volume-up'}`}
                            onClick={() => text2Speech((closeOnSpeakend ? note : phrase), lang, setListen)}>
                        </Button>
                    </OverlayTrigger>
                    :''}
                    {enableSave?
                    <OverlayTrigger placement="top" overlay={<Tooltip>Salve o resultado nos dados do navegador, ou na nuvem e ajude a popular nossa base de dados.</Tooltip>}>
                        <DropdownButton className='mb-2' title={<i aria-label="salvar" className="fa fa-save"></i>} variant={`${isListning || !phrase? 'light': 'primary'}`} disabled={isListning || !phrase}>
                            <Dropdown.Item href="#" onClick={() => customSave(false)}><i className={`fa fa-save`}></i> Salvar offline</Dropdown.Item>
                            {enabledCloud?
                            <Dropdown.Item href="#" onClick={() => customSave(true)}><i className={`fa fa-cloud`}></i> Salvar online</Dropdown.Item>
                            :""}
                        </DropdownButton>
                    </OverlayTrigger>
                    :''}
                    {enableCopyPhrase ? 
                    <OverlayTrigger placement="top" overlay={<Tooltip>Selecione uma frase</Tooltip>}>
                        <Button
                            disabled={isListning}
                            variant="light"
                            type="button" 
                            aria-label="Selecionar frase"
                            className="mb-2 fa fa-clipboard"
                            onClick={() => setModalOpen(true)}>
                        </Button>
                    </OverlayTrigger>
                    : ''}
                    {props.children ? props.children : ''}
                </div>

                <div className="speech-container">
                    {enableChangeLanguage?
                    <div className="toggle-language">
                        <div className={`${lang === 'pt-BR' ? 'active-language' : ''}`}>Português</div>
                        <button type="button" onClick={() => toggleLanguage()}>
                            <i className="fa fa-exchange"></i>
                        </button>
                        <div className={`${lang === 'en-US' ? 'active-language' : ''}`}>Inglês</div>
                    </div>
                    : ''}
                    {closeOnSpeakend?
                        <>
                            <p className="speech-text">
                                {note}
                                <Button disabled={!note} size="sm" type="button" aria-label="Copiar texto" onClick={() => copyText(note)}>
                                    <i className="fa fa-copy"></i>
                                </Button>
                            </p>
                        </>
                    :
                    <>
                        <Form.Group className="speech-textarea">
                            <Form.Label>Digite algo</Form.Label>
                            <Form.Control as="textarea" accessKey="w" className="textarea-pretty" rows={textSize} onChange={e => setPhrase(e.target.value)} value={phrase} placeholder={textPlaceholder} />
                            <Button disabled={!phrase} size="sm" type="button" aria-label="Copiar texto" onClick={() => copyText(phrase)}>
                                <i className="fa fa-copy"></i>
                            </Button>
                        </Form.Group>
                        {(alwaysShowNote || 'status' in phraseReason) && note ?
                            <div className={`speech-reason ${phraseReason.status ? 'text-success': (phraseReason.status===false? 'text-danger':'text-secondary')}`}>
                            {note?
                            <>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>{phraseReason.message}</Tooltip>}>
                                    <i aria-label="Validacao" className={`mh-x2 clicable fa fa-${phraseReason.status ? 'check-circle': 'exclamation-circle'}`}></i>
                                </OverlayTrigger>
                                <strong>{note}</strong>
                                <Button className="mh-x2" variant="light" size="sm" type="button" aria-label="Copiar texto" onClick={() => copyText(note)}>
                                    <i className="fa fa-copy"></i>
                                </Button>
                                <Button className="mh-x2" variant={listen? "primary":"light"} size="sm" type="button" aria-label="Escutar" onClick={() => text2Speech(note, lang, setListen)}>
                                    <i className={`fa fa-${listen? "stop" : "volume-up"}`}></i>
                                </Button>
                            </>
                            : ''}
                        </div>
                        : ''}
                    </>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}