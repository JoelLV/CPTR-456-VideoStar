import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import CartPreview from './CartPreview'
import {v4 as uuid} from 'uuid'

const ShoppingCart = ({ cartVideos, videoSetter, mainVideoSetter }) => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    /**
     * Event handler that empties all videos in the
     * cart located in the state variable
     * videosInCart in the parent component.
     * Triggered when the clear button is clicked.
     */
    const clear = () => {
        videoSetter([])
    }

    /**
     * Event handler triggered whenever a user
     * purchases videos in the cart. For each
     * video inside of the array where all the videos
     * are located, the flag isPurchased will be toggled
     * in order to reflect the purchase in the UI.
     */
    const purchase = () => {
        if (cartVideos.length > 0) {
            mainVideoSetter(prevVids => {
                return prevVids.map(video => {
                    if (cartVideos.find(cartVid => cartVid.videoId === video.id) !== undefined) {
                        video.isPurchased = true
                    }
                    return video
                })
            })
            clear()
        }
    }

    /**
     * Helper function used to render
     * all given videos as jsx elements.
     * 
     * @param videos array of video objects in the cart.
     * @returns CartPreview jsx elements
     */
    const renderVideos = (videos) => {
        return videos.map(value => {
            return <CartPreview
                key={uuid()}
                videoId={value.videoId}
                name={value.name}
                duration={value.duration}
                price={value.price}
                url={value.url}
                videoSetter={videoSetter}
            />  
        })
    }
    
    /**
     * Helper function called
     * every time the component is
     * re-rendered. Updates the total
     * price.
     * 
     * @param videos Array of video objects 
     * @returns int Sum of prices.
     */
    const total = (videos) => {
        let sum = 0
        videos.forEach(video => {
            sum += video.price
        })
        return Math.round(100 * sum) / 100
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