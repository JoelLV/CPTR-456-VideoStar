const Video = ({ name, isFree, isPurchased, duration, price, url }) => {
    const blurredVideoCssClass = "video-image-hidden"
    const visibleVideoCssClass = "video-image"

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
                <video crossOrigin="anonymous" className={(isFree || isPurchased ? visibleVideoCssClass : blurredVideoCssClass)}>
                    <source src={url} type="video/mp4" />
                </video>
                {(!isFree && !isPurchased) && <p className="paid-video-symbol">$</p>}
                <p className="video-duration">{duration}</p>
            </div>
            <div className="video-information-container">
                <p className="video-title">{name}</p>
                {(!isFree && !isPurchased) && (<button className="add-to-cart-button"><i className="bi bi-cart-plus"></i></button>)}
                {(!isFree && !isPurchased) && (<p className="video-price-label">${price}</p>)}
                {isFree && <p className="favorites-icon"><i className="bi bi-suit-heart favorites-icon"></i></p>}
            </div>
        </div>
    )
}

export default Video
