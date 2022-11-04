import { useEffect, useState } from "react"

const CartPreview = ({ videoId, name, isFree, isPurchased, duration, price, url, videoSetter }) => {
    const [favButtonClass, setFavButtonClass] = useState("bi bi-suit-heart favorites-icon")
    const [isFavorite, setIsFavorite] = useState(false)
    const blurredVideoCssClass = "video-image-hidden"
    const visibleVideoCssClass = "video-image"

    const handleFavoriteVideo = () => {
        favoriteVideoSetter(prevFavVideos => {
            let indexToCheck = prevFavVideos.findIndex(value => value === videoId)
            console.log(indexToCheck)
            if (isFavorite && indexToCheck !== -1) {
                prevFavVideos.splice(indexToCheck, 1)
            } else if (indexToCheck === -1) {
                prevFavVideos.push(videoId)
            }
            return [...prevFavVideos]
        })
        setIsFavorite(prevFavState => !prevFavState)
    }

    const handleDelete = () => {
        videoSetter(prevVideos => {
            let index = prevVideos.findIndex(value => value.name === name)
            console.log(index)
            prevVideos.splice(index, 1)
            return [...prevVideos]
        })
    }

    // Trim video name to fit inside
    // video box.
    if (name.length >= 42) {
        name = name.substring(0, 42)
        name += '...'
    }

    // Remove milliseconds from duration string.
    duration = duration.match(/[0-9]+:[0-9]+:[0-9]+/g)[0]

    return (
        <div className="video-container">
            <div className="video-image-container">
                <video crossOrigin="anonymous" onClick={(isFree || isPurchased) ? videoTheaterSetter : null} className={visibleVideoCssClass}>
                    <source src={url} type="video/mp4" />
                </video>
                <p className="video-duration">{duration}</p>
            </div>
            <div className="video-information-container">
                <p className="video-title">{name}</p>
                {(!isFree && !isPurchased) && (<p className="video-price-label">${price}</p>)}
                <button onClick={handleDelete} className="delete-button">X</button>
            </div>
        </div>
    )
}

export default CartPreview
