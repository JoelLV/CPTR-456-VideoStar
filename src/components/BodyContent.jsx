import VideoGallery from "./VideoGallery"
import FilterForm from './FilterForm'
import { useEffect, useState } from "react"
import VideoTheater from "./VideoTheater"

const BodyContent = () => {
    const [filteredVideos, setFilteredVideos] = useState([])
    const [originalData, setOriginalData] = useState([])
    const [favoriteVideos, setFavoriteVideos] = useState([])
    const [urlToDisplayAsTheater, setUrlToDisplayAsTheater] = useState(null)
    const [theaterVideoId, setTheaterVideoId] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    /**
     * Changes url inside theater video in order
     * change the video that needs to be displayed
     * in theater mode. Increments the container's
     * id in order to force a re-render. Triggered
     * when a VideoPreview component is clicked.
     * 
     * @param event
     */
    const handleTheaterVideoChange = ({ target }) => {
        let newUrl = new String(target.currentSrc)

        setUrlToDisplayAsTheater(newUrl)
        // Increment id in order for the key to be unique.
        setTheaterVideoId(prevId => prevId + 1)
    }

    /**
     * Fetch data on mount only and set the
     * data in a state. The array which contains
     * the filtered videos that need to be displayed
     * must reference the same objects in the original
     * array. Set state variable isLoading to false in order
     * to quit displaying skeleton and show videos.
     */
    useEffect(() => {
        (async () => {
            const data = await fetch("https://videostar.dacoder.io/")
            const dataJson = await data.json()
            setOriginalData(dataJson)
            setFilteredVideos(dataJson)
            setIsLoading(false)
        })()
    }, [])

    return (
        <div className="content-body">
            <VideoTheater videoId={theaterVideoId} videoUrl={urlToDisplayAsTheater} urlState={urlToDisplayAsTheater} />
            <div className="filter-gallery-container">
                <FilterForm
                    videoSetter={setFilteredVideos}
                    favoriteVideos={favoriteVideos}
                    data={originalData} />
                <VideoGallery
                    galleryVideos={filteredVideos}
                    videoTheaterSetter={handleTheaterVideoChange}
                    recommendedVideos={originalData.filter(video => !video.isPurchased).slice(-3)}
                    favoriteVideosSetter={setFavoriteVideos}
                    favoriteVideos={favoriteVideos}
                    loadingState={isLoading}
                    videoSetter={setOriginalData}
                    originalVideos={originalData}
                />
            </div>
        </div>
    )
}

export default BodyContent