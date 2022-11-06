import VideoPreview from "./VideoPreview"
import { useState } from "react"
import { Skeleton } from "@mui/material"
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
import ShoppingCart from "./ShoppingCart";

const VideoGallery = ({ loadingState, galleryVideos, videoTheaterSetter, recommendedVideos, favoriteVideosSetter, favoriteVideos, videoSetter }) => {
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
                favoriteVideos={favoriteVideos}
                videosInCartSetter={setVideosInCart}
            />
        })
    }
    
    return (
        <div className="video-gallery-container">
            <ShoppingCart 
            cartVideos={videosInCart}
            videoSetter={setVideosInCart}
            mainVideoSetter={videoSetter}
             />
            <h1>Recommended</h1>
            <div className="video-gallery">
                {
                    loadingState ? [...Array(5)].map((_, index) => (<Skeleton key={index} variant="rectangle" style={{height: "200px", width: "280px"}} />)) 
                        : renderVideos(recommendedVideos)
                }
            </div>
            <h1>Gallery</h1>
            <div className="video-gallery">
                {
                    loadingState ? [...Array(20)].map((_, index) => (<Skeleton key={index} variant="rectangle" style={{height: "200px", width: "280px"}} />)) 
                        : renderVideos(galleryVideos)
                }
            </div>
        </div>
    )
}

export default VideoGallery