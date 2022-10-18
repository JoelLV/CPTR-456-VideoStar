const Video = ({ name, isFree, isPurchased, duration, size, price, url }) => {
    return (
        <div className="video-container">
            <div className="video-image">
                <video crossOrigin="anonymous" className="video-elem">
                    <source src={url.replace('http', 'https')} type="video/mp4" />
                </video>
                <p className="video-duration">{duration}</p>
            </div>
            <div className="video-information-container">
                <p className="video-title">{name}</p>
                <p className="favorites-icon">♡</p>
            </div>
        </div>
    )
}

export default Video