import VideoGallery from "./VideoGallery"
import FilterForm from './FilterForm'
import { useEffect, useState } from "react"
import VideoTheater from "./VideoTheater"

const BodyContent = () => {
    const [videoData, setVideoData] = useState([])
    const [favoriteVideos, setFavoriteVideos] = useState([])
    const [videosInCart, setVideosInCart] = useState([])
    const [urlToDisplayAsTheater, setUrlToDisplayAsTheater] = useState(null)
    const [theaterVideoId, setTheaterVideoId] = useState(0)

    const handleTheaterVideoChange = ({ target }) => {
        let newUrl = new String(target.currentSrc)

        setUrlToDisplayAsTheater(newUrl)
        setTheaterVideoId(prevId => prevId + 1)
    }

    useEffect (() => {
        (async () => {
            const data = await fetch("https://videostar.dacoder.io/")
            const dataJson = await data.json()
            setVideoData(dataJson)
        })()
    }, [])

    return (
        <div className="content-body">
            <VideoTheater videoId = {theaterVideoId} videoUrl = {urlToDisplayAsTheater} urlState = {urlToDisplayAsTheater} />
            <div className="filter-gallery-container">
                <FilterForm />
                <VideoGallery videos = {videoData} videoTheaterSetter = {handleTheaterVideoChange} />
            </div>
        </div>
    )
}

export default BodyContent