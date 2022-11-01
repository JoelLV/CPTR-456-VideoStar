import VideoPreview from "./VideoPreview"
import { useState } from "react"
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
    Badge,
    Button,
    Container,
    Dropdown,
    FormControl,
    Nav,
    Navbar,
    Offcanvas
} from "react-bootstrap";

const VideoGallery = ({ galleryVideos, videoTheaterSetter, recommendedVideos, favoriteVideosSetter }) => {
    const [videosInCart, setVideosInCart] = useState([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderVideos = (videos) => {
        return videos.map(value => {
            return <VideoPreview
                key={value.id}
                videoId={value.id}
                name={value.name}
                isFree={value.isFree}
                isPurchased={value.isPurchased}
                duration={value.duration}
                size={value.size}
                price={value.price}
                url={value.url}
                videoTheaterSetter={videoTheaterSetter}
                favoriteVideoSetter={favoriteVideosSetter}
                videosInCartSetter={setVideosInCart}
            />
        })
    }
    return (
        <div className="video-gallery-container">
            <nav className="nav-container">
                <div className="logo">Logo</div>
                <button className="add-to-cart-button cart-icon" onClick={handleShow}><i className="bi bi-cart3 cart-icon"></i></button>

                <Offcanvas show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.
                    </Offcanvas.Body>
                </Offcanvas>
            </nav>
            <h1>Recommended</h1>
            <div className="video-gallery">
                {renderVideos(recommendedVideos)}
            </div>
            <h1>Gallery</h1>
            <div className="video-gallery">
                {renderVideos(galleryVideos)}
            </div>
        </div>
    )
}

export default VideoGallery