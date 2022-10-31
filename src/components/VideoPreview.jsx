import { useEffect, useState } from "react"

const VideoPreview = ({ videoId, name, isFree, isPurchased, duration, price, url, videoTheaterSetter, favoriteVideoSetter, videosInCartSetter }) => {
    const [favButtonClass, setFavButtonClass] = useState("bi bi-suit-heart favorites-icon")
    const [isFavorite, setIsFavorite] = useState(false)
    const blurredVideoCssClass = "video-image-hidden"
    const visibleVideoCssClass = "video-image"

    useEffect(() => {
        if (isFavorite) {
            setFavButtonClass("bi bi-suit-heart-fill favorites-icon")
        } else {
            setFavButtonClass("bi bi-suit-heart favorites-icon")
        }
    }, [isFavorite])

    const handleFavoriteVideo = () => {
        favoriteVideoSetter(prevFavVideos => {
            let indexToCheck = prevFavVideos.findIndex(value => value === videoId)
            if (isFavorite && indexToCheck !== -1) {
                prevFavVideos.splice(indexToCheck, 1)
            } else if (indexToCheck === -1) {
                prevFavVideos.push(videoId)
            }
            return [...prevFavVideos]
        })
        setIsFavorite(prevFavState => !prevFavState)
    }

    const handleAddToCart = () => {
        videosInCartSetter(prevVideosInCart => {
            let indexToCheck = prevVideosInCart.findIndex(value => value === videoId)
            if (indexToCheck === -1) {
                prevVideosInCart.push(videoId)
            }
            return [...prevVideosInCart]
        })
    }

    // Trim video name to fit inside
    // video box.
    if (name.length >= 42) {
        name = name.substring(0, 42)
        name += '...'
    }

    // Remove milliseconds from duration string.
    duration = duration.match(/[0-9]+:[0-9]+:[0-9]+/g)

    return (
        <div className="video-container">
            <div className="video-image-container">
                <video crossOrigin="anonymous" onClick={(isFree || isPurchased) ? videoTheaterSetter : null} className={(isFree || isPurchased ? visibleVideoCssClass : blurredVideoCssClass)}>
                    <source src={url} type="video/mp4" />
                </video>
                {(!isFree && !isPurchased) && <p className="paid-video-symbol">$</p>}
                <p className="video-duration">{duration}</p>
            </div>
            <div className="video-information-container">
                <p className="video-title">{name}</p>
                {(!isFree && !isPurchased) && (<button onClick={handleAddToCart} className="add-to-cart-button"><i className="bi bi-cart-plus"></i></button>)}
                {(!isFree && !isPurchased) && (<p className="video-price-label">${price}</p>)}
                {isFree && <p onClick={handleFavoriteVideo}><i className={favButtonClass}></i></p>}
            </div>
        </div>
    )
}

export default VideoPreview
