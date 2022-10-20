import Video from "./Video"

const VideoGallery = ({ videos }) => {
    return (
        <div className="video-gallery">
            {
                videos.map(value => {
                    return <Video 
                        key = {value.id}  
                        name = {value.name}
                        isFree = {value.isFree}
                        isPurchased = {value.isPurchased}
                        duration = {value.duration}
                        size = {value.size}
                        price = {value.price}
                        url = {value.url}
                    />
                })
            }
        </div>
    )
}

export default VideoGallery