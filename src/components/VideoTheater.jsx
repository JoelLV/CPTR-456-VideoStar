const VideoTheater = ({ videoUrl }) => {

    const handlePlayAction = ({ target }) => {
        const videoElem = target.previousSibling
        target.style.display = "none"
        videoElem.play()
    }

    const handlePauseAction = ({ target }) => {
        const playImagElem = target.nextSibling
        playImagElem.style.display = "block"
        target.pause()
    }

    if (videoUrl != null) {
        return (
            <div className="video-theater-container">
                <video crossOrigin="anonymous" className="video-theater" onClick={handlePauseAction}>
                    Your browser does not support the video tag
                    <source src={videoUrl} type="video/mp4"></source>
                </video>
                <img className="play-button" src="PlayButton.png" onClick={handlePlayAction} />
            </div>
        )
    } else {
        return (
            <div style={{display: "none"}}></div>
        )
    }
}

export default VideoTheater