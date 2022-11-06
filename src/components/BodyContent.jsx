import VideoGallery from "./VideoGallery"
import FilterForm from './FilterForm'
import { useEffect, useState } from "react"
import VideoTheater from "./VideoTheater"

const BodyContent = () => {
    const [videoData, setVideoData] = useState([])
    const [originalData, setOriginalData] = useState([])
    const [recommendedVideos, setRecommendedVideos] = useState([])
    const [favoriteVideos, setFavoriteVideos] = useState([])
    const [urlToDisplayAsTheater, setUrlToDisplayAsTheater] = useState(null)
    const [theaterVideoId, setTheaterVideoId] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const handleTheaterVideoChange = ({ target }) => {
        let newUrl = new String(target.currentSrc)

        setUrlToDisplayAsTheater(newUrl)
        setTheaterVideoId(prevId => prevId + 1)
    }

    // Note: This is rendered twice because the project is ran
    // on strict mode. In production, this is going to render only
    // once.
    useEffect(() => {
        (async () => {
            const data = await fetch("https://videostar.dacoder.io/")
            const dataJson = await data.json()
            setVideoData(dataJson)
            setOriginalData(dataJson)
            setIsLoading(false)

            let potentialRecVideos = dataJson.filter(value => !value.isFree);
            let recVideos = [];
            const totalVideosToRecommend = Math.floor(potentialRecVideos.length / 4)
            for (let i = 0; i < totalVideosToRecommend; i++) {
                const randomIndex = Math.floor(Math.random() * potentialRecVideos.length)
                const randomVideo = potentialRecVideos[randomIndex]
                recVideos.push(randomVideo)
                potentialRecVideos.splice(randomIndex, 1)
            }
            setRecommendedVideos(recVideos)
        })()
    }, [])

    return (
        <div className="content-body">
            <VideoTheater videoId={theaterVideoId} videoUrl={urlToDisplayAsTheater} urlState={urlToDisplayAsTheater} />
            <div className="filter-gallery-container">
                <FilterForm
                    videoSetter={setVideoData}
                    favoriteVideos={favoriteVideos}
                    data={originalData} />
                <VideoGallery
                    galleryVideos={videoData}
                    videoTheaterSetter={handleTheaterVideoChange}
                    recommendedVideos={recommendedVideos}
                    favoriteVideosSetter={setFavoriteVideos}
                    favoriteVideos={favoriteVideos}
                    loadingState={isLoading}
                    videoSetter={setVideoData}
                />
            </div>
        </div>
    )
}

export default BodyContent