const CartPreview = ({ videoId, name, duration, price, url, videoSetter }) => {

    /**
     * Triggered whenever the delete button
     * in the cart is clicked. Removes itself
     * from the videos in the cart by using
     * the prop videoSetter.
     */
    const handleDelete = () => {
        videoSetter(prevVideos => {
            return prevVideos.filter(value => value.videoId !== videoId)
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
                <video crossOrigin="anonymous" className="video-image">
                    <source src={url} type="video/mp4" />
                </video>
                <p className="video-duration">{duration}</p>
            </div>
            <div className="video-information-container">
                <p className="video-title">{name}</p>
                <p className="video-price-label">${price}</p>
                <button onClick={handleDelete} className="delete-button">X</button>
            </div>
        </div>
    )
}

export default CartPreview
