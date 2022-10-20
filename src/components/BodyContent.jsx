import VideoGallery from "./VideoGallery"
import FilterForm from './FilterForm'
import { useEffect, useState } from "react"

const BodyContent = () => {
    const [videoData, setVideoData] = useState([])
    const [favoriteVideos, setFavoriteVideos] = useState([])

    useEffect (() => {
        (async () => {
            let data = await fetch("https://videostar.dacoder.io/")
            data = await data.json()
            setVideoData(data)
        })()
    }, [])

    return (
        <div className="content-body">
            <FilterForm />
            <VideoGallery videos = {videoData} />
        </div>
    )
}

export default BodyContent