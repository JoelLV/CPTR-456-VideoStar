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
    const [bottomControlsClass, setBottomControlsClass] = useState("theater-bottom-controls-container")


    const setFullscreenStates = () => {
        setIsFullscreen(true)
        setVideoClass("video-fullscreen")
        setExitButtonVisibility({display: "none"})
        setBottomControlsClass("fullscreen-bottom-controls-container")
    }

    const setTheaterStates = () => {
        setIsFullscreen(false)
        setVideoClass("video-theater")
        setExitButtonVisibility({display: "block"})
        setBottomControlsClass("theater-bottom-controls-container")
    }

    // React does not support onfullscreenchange.
    // Event had to be added manually.
    document.onfullscreenchange = () => {
        if (document.fullscreenElement != null) {
            setFullscreenStates()
        } else {
            if (window.innerWidth < 800) {
                setVideoTheaterVisibility({display: "none"})
            }
            setTheaterStates()
        }
    }

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

    const handlePlayAction = ({ target }) => {
        const videoElem = target.previousSibling
        setPlayButtonVisibility({display: "none"})
        setIsPaused(false)
        setAtEnd(false)
        setAtBeginning(false)
        videoElem.play()
    }

    const handlePauseAction = ({ target }) => {
        setPlayButtonVisibility({display: "block"})
        setBottomControlsVisibility({display: "block"})
        setIsPaused(true)
        target.pause()
    }

    const handleVideoEnded = () => {
        setPlayButtonVisibility({display: "block"})
        setBottomControlsVisibility({display: "block"})
        setAtEnd(true)
    }

    const handleTimeUpdate = ({ target }) => {
        const durationPercentage = Math.trunc((target.currentTime / target.duration) * 100)
        setProgressBarWidth(durationPercentage + "%")

        const secondsPerHour = 3600
        const secondsPerMinute = 60
        let timeRemainder = target.currentTime

        let hours = Math.trunc(timeRemainder / secondsPerHour)
        timeRemainder -= hours * secondsPerHour
        let minutes = Math.trunc(timeRemainder / secondsPerMinute)
        timeRemainder -= minutes * secondsPerMinute
        timeRemainder = Math.trunc(timeRemainder)

        let hourStr = new String(hours).padStart(2, "0")
        let minuteStr = new String(minutes).padStart(2, "0")
        let secondStr = new String(timeRemainder).padStart(2, "0")

        setCurrentTime(`${hourStr}:${minuteStr}:${secondStr}`)
    }

    const handleMouseLeave = () => {
        if (!isPaused && !atBeginning && !atEnd) {
            setBottomControlsVisibility({display: "none"})
        }
    }

    const handleMouseEnter = () => {
        setBottomControlsVisibility({display: "block"})
    }

    const handleCloseVideo = () => {
        setVideoTheaterVisibility({display: "none"})
    }

    const handleToggleFullScreen = async ({ target }) => {
        const videoContainer = target.parentElement.parentElement.parentElement

        if (isFullscreen) {
            await document.exitFullscreen()
        } else {
            await videoContainer.requestFullscreen()
        }
    }

    const handleOnLoad = ({ target }) => {
        if (window.innerWidth < 800) {
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
                <div className={bottomControlsClass}>
                    <div className="timestamp-label" style={bottomControlsVisibility}>{currentTime}</div>
                    <div className="progress-bar" style={{...bottomControlsVisibility, width: progressBarWidth}}></div>
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