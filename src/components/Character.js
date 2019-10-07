import React, {useState} from 'react';
import {Button, Card, Modal} from 'react-bootstrap';
import './character.css'

const Character = ({character, loading}) => {
    const [show,
        setShow] = useState(false);

    const showModal = () => setShow(true);
    const hideModal = () => setShow(false);

    if (loading) {
        return <div className="loader"></div>;
    }
    const image = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    const description = !character.description.length
        ? 'Description not available.'
        : character.description.length > 150
            ? character
                .description
                .substring(0, 150)
                .split('')
                .concat('...')
                .join('')
            : character.description;
    const fullDescription = !character.description.length
        ? 'Description not available.'
        : character.description;
    const detail = character
        .urls
        .find(r => r.type === 'detail');
    const wiki = character
        .urls
        .find(r => r.type === 'wiki');
    const comicLink = character
        .urls
        .find(r => r.type === 'comiclink');
    return (
        <div className="col-md-3 mt-5">
            <Card>
                <Card.Header>{character.name}</Card.Header>
                <Card.Img variant="top" src={image} className="character-img"/>
                <Card.Body>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button variant="primary" onClick={showModal}>Show More</Button>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{character.name}</Modal.Title>
                </Modal.Header>
                <img
                    src={image}
                    alt={character.name}
                    className="character-img-modal rounded-circle"/>
                <Modal.Body>
                    {fullDescription}
                    {detail && <a
                        target="_blank"
                        className="btn-link btn-block"
                        href={detail.url}
                        rel="noopener noreferrer">
                        Read more from Marvel Official Page</a>
}
                    {wiki && <a
                        target="_blank"
                        className="btn-link btn-block"
                        href={wiki.url}
                        rel="noopener noreferrer">
                        Read more from Marvel Wiki</a>
}
                    {comicLink && <a
                        target="_blank"
                        className="btn-link btn-block"
                        href={comicLink.url}
                        rel="noopener noreferrer">
                        Read more from the Comic</a>
}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={hideModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default Character