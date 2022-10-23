import VideoGallery from "./VideoGallery"
import FilterForm from './FilterForm'
import { useEffect, useState } from "react"
import VideoTheater from "./VideoTheater"

const BodyContent = () => {
    const [videoData, setVideoData] = useState([])
    const [favoriteVideos, setFavoriteVideos] = useState([])
    const [urlToDisplayAsTheater, setUrlToDisplayAsTheater] = useState(null)

    const handleTheaterVideoChange = ({ target }) => {
        let newUrl = new String(target.currentSrc)

        // FIXME: Change theater video without the need
        // of double clicking the next video.
        setUrlToDisplayAsTheater(prevUrl => {
            if (prevUrl != null) {
                return null
            } else {
                return newUrl
            }
        })
        //setUrlToDisplayAsTheater(newUrl)
    }

    useEffect (() => {
        (async () => {
            let data = await fetch("https://videostar.dacoder.io/")
            data = await data.json()
            setVideoData(data)
        })()
    }, [])

    return (
        <div className="content-body">
            <VideoTheater videoUrl = {urlToDisplayAsTheater}/>
            <div style={{display: "flex"}}>
                <FilterForm />
                <VideoGallery videos = {videoData} videoTheaterSetter = {handleTheaterVideoChange} />
            </div>
        </div>
    )
}

export default BodyContent