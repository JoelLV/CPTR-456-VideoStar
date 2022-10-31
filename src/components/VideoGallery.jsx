import VideoPreview from "./VideoPreview"
import { useState } from "react"

const VideoGallery = ({ galleryVideos, videoTheaterSetter, recommendedVideos, favoriteVideosSetter }) => {
    const [videosInCart, setVideosInCart] = useState([])

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
                <button className="add-to-cart-button cart-icon"><i className="bi bi-cart3 cart-icon"></i></button>
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