import VideoPreview from "./VideoPreview"

const VideoGallery = ({ videos, videoTheaterSetter }) => {
    return (
        <div className="video-gallery">
            {
                videos.map(value => {
                    return <VideoPreview 
                        key = {value.id}  
                        name = {value.name}
                        isFree = {value.isFree}
                        isPurchased = {value.isPurchased}
                        duration = {value.duration}
                        size = {value.size}
                        price = {value.price}
                        url = {value.url}
                        videoTheaterSetter = {videoTheaterSetter}
                    />
                })
            }
        </div>
    )
}

export default VideoGallery