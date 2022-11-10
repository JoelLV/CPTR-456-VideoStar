import { useEffect, useState } from "react"

const VideoPreview = ({ videoId, name, isFree, isPurchased, duration, price, url, videoTheaterSetter, favoriteVideoSetter, favoriteVideos, videosInCartSetter, videosInCart }) => {
    const [favButtonClass, setFavButtonClass] = useState("bi bi-suit-heart favorites-icon")
    const [isFavorite, setIsFavorite] = useState(false)
    const [isInCart, setIsInCart] = useState(false)
    const blurredVideoCssClass = "video-image-hidden"
    const visibleVideoCssClass = "video-image"

    /**
     * Toggles filled-heart and empty-heart
     * styles whenever the isFavorite state variable
     * changes.
     */
    useEffect(() => {
        if (isFavorite) {
            setFavButtonClass("bi bi-suit-heart-fill favorites-icon")
        } else {
            setFavButtonClass("bi bi-suit-heart favorites-icon")
        }
    }, [isFavorite])

    /**
     * Sets isFavorite state appropriately
     * every time it re-renders according to the
     * id array provided by favoriteVideos. Also, it sets
     * isInCart state variable accordingly every time the
     * component re-renders based on the video object array
     * videosInCart.
     */
    useEffect(() => {
        if (favoriteVideos.find(valueId => valueId === videoId) != null) {
            setIsFavorite(true)
        }
        setIsInCart(videosInCart.find(value => value.videoId === videoId) != null)
    })

    /**
     * Event handler triggered whenever the heart
     * of a video is clicked. Manipulates the
     * elements inside of the state variable favoriteVideos
     * to reflect whether a video was favorited or not.
     */
    const handleFavoriteVideo = () => {
        favoriteVideoSetter(prevFavVideos => {
            let indexToCheck = prevFavVideos.findIndex(value => value === videoId)
            if (isFavorite && indexToCheck !== -1) {
                // Remove id from favoriteVideos array only if
                // the current video is favorited and exists
                // inside of the array favoriteVideos.
                prevFavVideos.splice(indexToCheck, 1)
            } else if (indexToCheck === -1) {
                // Add video id to the
                // favoriteVideos array if video
                // is favorited and video is not
                // already in the array.
                prevFavVideos.push(videoId)
            }
            return [...prevFavVideos]
        })
        // Toggle isFavorite on click.
        setIsFavorite(prevFavState => !prevFavState)
    }

    /**
     * Event handler triggered whenever
     * the add to cart button is clicked.
     * Adds video object to the videosInCart
     * state array if it does not already exists.
     * Sets isInCart state variable to true.
     */
    const handleAddToCart = () => {
        if (videosInCart.find(value => value.videoId === videoId) == null) {
            videosInCartSetter(prevVideosInCart => {
                return [...prevVideosInCart, {
                    videoId: videoId,
                    duration: duration,
                    name: name,
                    price: price,
                    url: url,
                }]
            })
            setIsInCart(true)
        }
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
                <video crossOrigin="anonymous" onClick={(isFree || isPurchased) ? videoTheaterSetter : null} className={(isFree || isPurchased ? visibleVideoCssClass : blurredVideoCssClass)}>
                    <source src={url} type="video/mp4" />
                </video>
                {(!isFree && !isPurchased) && <p className="paid-video-symbol">$</p>}
                <p className="video-duration">{duration}</p>
            </div>
            <div className="video-information-container">
                <p className="video-title">{name}</p>
                {(!isFree && !isPurchased) && (<button onClick={handleAddToCart} className="add-to-cart-button" style={{display: isInCart ? "none" : "block"}}><i className="bi bi-cart-plus"></i></button>)}
                {(!isFree && !isPurchased) && (<p className="video-price-label">${price}</p>)}
                {isFree && <p onClick={handleFavoriteVideo}><i className={favButtonClass}></i></p>}
            </div>
        </div>
    )
}

export default VideoPreview
