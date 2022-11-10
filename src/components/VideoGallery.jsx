import VideoPreview from "./VideoPreview"
import { useState } from "react"
import { Skeleton } from "@mui/material"
import ShoppingCart from "./ShoppingCart"

const VideoGallery = ({ loadingState, galleryVideos, videoTheaterSetter, recommendedVideos, favoriteVideosSetter, favoriteVideos, videoSetter }) => {
    const [videosInCart, setVideosInCart] = useState([])

    /**
     * Converts given array of video objects to
     * appropriate jsx VideoPreview elements
     * to render in gallery.
     * 
     * @param videos Array container video objects.
     * @returns Array of VideoPreview jsx elements.
     */
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
                videosInCart={videosInCart}
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
            {
                (recommendedVideos.length > 0 || loadingState) && (
                    <div>
                        <h1>Recommended</h1>
                        <div className="video-gallery">
                            {
                                loadingState ? [...Array(3)].map((_, index) => (<Skeleton key={index} variant="rectangle" style={{ height: "200px", width: "280px" }} />))
                                    : renderVideos(recommendedVideos)
                            }
                        </div>
                    </div>
                )
            }

            <h1>Gallery</h1>
            <div className="video-gallery">
                {
                    loadingState ? [...Array(20)].map((_, index) => (<Skeleton key={index} variant="rectangle" style={{ height: "200px", width: "280px" }} />))
                        : renderVideos(galleryVideos)
                }
            </div>
        </div>
    )
}

export default VideoGallery