import { useEffect, useState } from "react"

const VideoTheater = ({ videoId, videoUrl, urlState }) => {
    const [isPaused, setIsPaused] = useState(true)
    const [atBeginning, setAtBeginning] = useState(true)
    const [atEnd, setAtEnd] = useState(false)
    const [bottomControlsVisibility, setBottomControlsVisibility] = useState({display: "block"})
    const [exitButtonVisibility, setExitButtonVisibility] = useState({display: "block"})
    const [playButtonVisibility, setPlayButtonVisibility] = useState({display: "block"})
    const [currentTime, setCurrentTime] = useState("00:00:00")
    const [progressBarWidth, setProgressBarWidth] = useState("0%")
    const [videoTheaterVisiblity, setVideoTheaterVisibility] = useState({display: "flex"})
    const [videoClass, setVideoClass] = useState("video-theater")
    const [isFullscreen, setIsFullscreen] = useState(false)

    /**
     * Event handler triggered whenever
     * browser requests full-screen mode.
     * Sets state variable isFullscreen
     * to set appropriate styling.
     * Hide theater section if
     * window is mobile size.
     * React does not support onfullscreenchange.
     * Event had to be added manually.
     */
    document.onfullscreenchange = () => {
        if (document.fullscreenElement != null) {
            setIsFullscreen(true)
        } else {
            if (window.innerWidth < 800) {
                setVideoTheaterVisibility({display: "none"})
            }
            setIsFullscreen(false)
        }
    }

    /**
     * Sets appropriate styling depending
     * whether the component is on fullscreen
     * mode or not.
     */
    useEffect(() => {
        if (isFullscreen) {
            setVideoClass("video-fullscreen")
            setExitButtonVisibility({display: "none"})
        } else {
            setVideoClass("video-theater")
            setExitButtonVisibility({display: "block"})
        }
    }, [isFullscreen])

    /**
     * Set state variables to
     * its defaults whenever the
     * urlState state variable
     * changes.
     */
    useEffect(() => {
        setCurrentTime("00:00:00")
        setProgressBarWidth("0%")
        setPlayButtonVisibility({display: "block"})
        setBottomControlsVisibility({display: "block"})
        setAtBeginning(true)
        setAtEnd(false)
        setIsPaused(true)
        setVideoTheaterVisibility({display: "flex"})
    }, [urlState])

    /**
     * Sets appropriate state variables
     * whenever the play button is clicked
     * and the video starts playing.
     * 
     * @param event
     */
    const handlePlayAction = ({ target }) => {
        // Fetch video element to play it. Gets previousSibling since the actual target is the img of the play button.
        const videoElem = target.previousSibling
        setPlayButtonVisibility({display: "none"})
        setIsPaused(false)
        setAtEnd(false)
        setAtBeginning(false)
        videoElem.play()
    }

    /**
     * Sets appropriate state variables
     * whenever the video window is clicked
     * in order to pause the video.
     * 
     * @param event 
     */
    const handlePauseAction = ({ target }) => {
        setPlayButtonVisibility({display: "block"})
        setBottomControlsVisibility({display: "block"})
        setIsPaused(true)
        target.pause()
    }

    /**
     * Event handler triggered whenever
     * the video ends. Sets appropriate
     * state variables.
     */
    const handleVideoEnded = () => {
        setPlayButtonVisibility({display: "block"})
        setBottomControlsVisibility({display: "block"})
        setAtEnd(true)
    }

    /**
     * Event handler triggered whenever
     * the video duration changes.
     * Adjusts the progress bar width to match
     * the current second that the video is playing.
     * Also, it adjusts the timestamp label in the
     * video to also match the current second
     * that the video is playing.
     * 
     * @param event 
     */
    const handleTimeUpdate = ({ target }) => {
        // Calculate the progress bar width percentage by dividing the current time of the video
        // over the duration.
        const durationPercentage = Math.trunc((target.currentTime / target.duration) * 100)
        setProgressBarWidth(durationPercentage + "%")

        // Calculate the amount of hours, minutes, and seconds
        // that currentTime represents. currentTime represents
        // the seconds that the video has played so far.
        const secondsPerHour = 3600
        const secondsPerMinute = 60
        let timeRemainder = target.currentTime

        let hours = Math.trunc(timeRemainder / secondsPerHour)
        timeRemainder -= hours * secondsPerHour
        let minutes = Math.trunc(timeRemainder / secondsPerMinute)
        timeRemainder -= minutes * secondsPerMinute
        timeRemainder = Math.trunc(timeRemainder)

        // Format time nicely with appropriate '0' padding.
        let hourStr = new String(hours).padStart(2, "0")
        let minuteStr = new String(minutes).padStart(2, "0")
        let secondStr = new String(timeRemainder).padStart(2, "0")

        setCurrentTime(`${hourStr}:${minuteStr}:${secondStr}`)
    }

    /**
     * Hide controls whenever the mouse leaves
     * the video container. Do not hide controls
     * if the video is paused, hasn't played anything,
     * or has finished playing.
     */
    const handleMouseLeave = () => {
        if (!isPaused && !atBeginning && !atEnd) {
            setBottomControlsVisibility({display: "none"})
        }
    }

    /**
     * Display controls of the video whenever mouse
     * enters the video container.
     */
    const handleMouseEnter = () => {
        setBottomControlsVisibility({display: "block"})
    }

    /**
     * Closes theater video container whenever
     * the 'X' button is clicked.
     */
    const handleCloseVideo = () => {
        setVideoTheaterVisibility({display: "none"})
    }

    /**
     * Requests fullscreen whenever the
     * fullscreen button is clicked and the
     * video is currently in theater mode.
     * 
     * @param event 
     */
    const handleToggleFullScreen = async ({ target }) => {
        // Fetch video container element from the fullscreen icon element in order to request fullscreen on that element.
        const videoContainer = target.parentElement.parentElement.parentElement

        if (isFullscreen) {
            await document.exitFullscreen()
        } else {
            await videoContainer.requestFullscreen()
        }
    }

    /**
     * Event handler called whenever
     * the video theater container is rendered.
     * Triggers fullscreen mode if
     * window has mobile size.
     * 
     * @param event 
     */
    const handleOnLoad = ({ target }) => {
        if (window.innerWidth < 800) {
            // Get video container element from its child element
            // and request fullscreen.
            target.parentElement.requestFullscreen()
        }
    }

    if (videoUrl != null) {
        return (
            <div key={`video-container-${videoId}`} style={videoTheaterVisiblity} className="video-theater-container" 
                onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onLoad={handleOnLoad}>
                <video key={`video-${videoId}`} crossOrigin="anonymous" className={videoClass}
                    onClick={handlePauseAction} onEnded={handleVideoEnded} onTimeUpdate={handleTimeUpdate}>
                        Your browser does not support the video tag
                        <source src={videoUrl} type="video/mp4"></source>
                </video>
                <img className="play-button" src="PlayButton.png" onClick={handlePlayAction} style={playButtonVisibility} />
                <div className="exit-theater-mode-icon" style={exitButtonVisibility}><i className="bi bi-x-square" onClick={handleCloseVideo}></i></div>
                <div className="bottom-controls-container">
                    <div className="timestamp-label" style={bottomControlsVisibility}>{currentTime}</div>
                    <div className="video-progress-bar" style={{...bottomControlsVisibility, width: progressBarWidth}}></div>
                    <div className="fullscreen-icon" style={bottomControlsVisibility}><i className="bi bi-fullscreen" onClick={handleToggleFullScreen}></i></div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default VideoTheater