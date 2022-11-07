import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CartPreview from './CartPreview';

const ShoppingCart = ({ cartVideos, videoSetter, mainVideoSetter }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const clear = () => {
        videoSetter(prevVids => {
            prevVids = []
            return prevVids
        })
    }

    const purchase = () => {
        mainVideoSetter(prevVids => {
            cartVideos.map((video) => {
                let index = prevVids.findIndex(value => value.name.substring(0,10) === video.name.substring(0,10))
                prevVids[index].isPurchased = true
            })
            clear()
            return [...prevVids]
        })
    }

    const renderVideos = (videos) => {
        return videos.map((value, index) => {
            return <CartPreview
                key={index}
                videoId={value.id}
                name={value.name}
                isFree={value.isFree}
                isPurchased={value.isPurchased}
                duration={value.duration}
                size={value.size}
                price={value.price}
                url={value.url}
                videoSetter={videoSetter}
            />  
        })
    }

    const total = (videos) => {
        let sum = 0
        videos.map((value) => {
            sum += value.price
        })
        return Math.round(100*sum)/100
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
                    <div className='canvasBody'>
                        {renderVideos(cartVideos)}
                        <p>Total: ${total(cartVideos)}</p>
                        <button onClick={purchase} className='purchase'>Purchase</button>
                        <button onClick={clear} className='purchase'>Clear Cart</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </nav>
    )
}

export default ShoppingCart