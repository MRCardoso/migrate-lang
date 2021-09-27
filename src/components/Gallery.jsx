import React, { useState } from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import Image from 'next/image'
import { pixabayUri } from '../../services/utils'

export default function Gallery() {
    const [imageType, setImageType] = useState('photo')
    const [imageSearch, setImageSearch] = useState('')
    const [imagePage, setImagePage] = useState(1)
    const [images, setImages] = useState([])

    const findImages = (page, type) => {
        const uri = pixabayUri(formHistory.imageSearch, 20, page, type)
        setImages([])
        return new Promise((resolve) => {
            fetch(uri)
                .then(res => res.json())
                .then(response => resolve(response.hits))
        })
    }

    const searchImages = (type) => {
        findImages(1, type)
            .then(response => {
                setImageType(type)
                setImages(response)
            })
    }

    const searchImagesPager = (next = true) => {
        const page = (next ? (imagePage+1) : (imagePage-1))
        findImages(page, imageType)
            .then(response => {
                setImagePage(page)
                setImages(response)
            })
    }
    return (
        <div>
            <Form.Group className="mb-3" controlId="imageSearch">
                    <Form.Label>Imagem</Form.Label>
                    <Form.Control type="text" autoComplete="off" value={imageSearch} onChange={e => setImageSearch(e.target.value)} placeholder="Imagem..." />
                </Form.Group>
                <InputGroup className="mb-2">
                    <InputGroup.Text className="clicable" onClick={() => searchImages('photo')}><i className="fa fa-image"></i></InputGroup.Text>
                    <InputGroup.Text className="clicable" onClick={() => searchImages('illustration')}><i className="fa fa-paint-brush"></i></InputGroup.Text>
                    <InputGroup.Text className="clicable" onClick={() => imagePage > 1 && searchImagesPager(false)}><i className="fa fa-chevron-left"></i></InputGroup.Text>
                    <InputGroup.Text className="clicable" onClick={() => searchImagesPager(true)}><i className="fa fa-chevron-right"></i></InputGroup.Text>
                </InputGroup>
                {images.length > 0?
                    images.map(i => {
                        return <a key={i} href={i.pageURL} target="_blank" rel="noreferrer"  className="mh-x2">
                            <Image src={i.largeImageURL} alt={i.tags} width={140} height={140} />
                        </a>
                    })
                :
                ''}
        </div>
    )
}
