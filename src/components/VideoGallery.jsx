import Video from "./Video"
import { useEffect, useState } from "react"
//import sampleData from "../assets/testData.json"

const VideoGallery = () => {
    const [videoData, setVideoData] = useState([])

    useEffect (() => {
        (async () => {
            let data = await fetch("https://videostar.dacoder.io/")
            data = await data.json()
            setVideoData(data)
        })()
    }, [])

    return (
        <div className="video-gallery">
            {
                videoData.map(value => {
                    return <Video 
                        key = {value.id}  
                        name = {value.name}
                        isFree = {value.isFree}
                        isPurchased = {value.isPurchased}
                        duration = {value.duration}
                        size = {value.size}
                        price = {value.price}
                        url = {value.url}
                    />
                })
            }
        </div>
    )
}

export default VideoGallery