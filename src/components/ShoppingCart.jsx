import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import VideoPreview from './VideoPreview';

const ShoppingCart = ({recommendedVideos}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderVideos = (videos) => {
        return videos.map((value, index) => {
            return <VideoPreview
                key={index}
                videoId={value.id}
                name={value.name}
                isFree={value.isFree}
                isPurchased={true}
                duration={value.duration}
                size={value.size}
                price={value.price}
                url={value.url}
            />
        })
    }

    return (
        <nav className="nav-container">
            <div className="logo">Logo</div>
            <button className="add-to-cart-button cart-icon" onClick={handleShow}><i className="bi bi-cart3 cart-icon"></i></button>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {renderVideos(recommendedVideos)}
                </Offcanvas.Body>
            </Offcanvas>
        </nav>
    )
}

export default ShoppingCart