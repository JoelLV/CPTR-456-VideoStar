import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FilterForm = ({ videoSetter, favoriteVideos, data }) => {
    const [formData, setFormData] = useState({
        title: "",
        length: "",
        alphaOrder: "",
        freeOrPaid: "",
        favorites: false,
    })
    
    const filterVideos = (videos) => {
        return videos.filter(value => {
            if (formData.title != "" && !value.name.toLowerCase().includes(formData.title)) {
                return false
            }
            if (formData.freeOrPaid != "") {
                if (formData.freeOrPaid === "free" && !value.isFree) {
                    return false
                } else if (formData.freeOrPaid === "paid" && value.isFree) {
                    return false
                }
            }
            if (formData.favorites && favoriteVideos.find(favId => favId === value.id) == null) {
                return false
            }
            return true
        })
    }
    
    const sortVideos = (videos) => {
        if (formData.length === "longToShort") {
            videos.sort((a, b) => parseFloat(b.duration.split(":").pop()) - parseFloat(a.duration.split(":").pop()))
        } else if (formData.length === "shortToLong") {
            videos.sort((a, b) => parseFloat(a.duration.split(":").pop()) - parseFloat(b.duration.split(":").pop()))
        }
        if (formData.alphaOrder === "alphaAsc") {
            videos.sort((a, b) => {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            });
        } else if (formData.alphaOrder === "alphaDesc") {
            videos.sort((a, b) => {
                return b.name < a.name ? -1 : b.name > a.name ? 1 : 0;
            });
        }
        return videos
    }
    
    const filterAndSort = () => {
        let filteredVideos = filterVideos(data)
        filteredVideos = sortVideos(filteredVideos)
        
        return filteredVideos
    }
    
    useEffect(() => {
        videoSetter(filterAndSort())
    }, [formData])

    const handleFormChange = ({ target }) => {
        const {name, value, checked, type} = target
        console.log(`checkbox state ${checked}`)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type !== "checkbox" ? value : checked
            }
        })
    }

    const clear = () => {
        setFormData({
            title: "",
            length: "",
            alphaOrder: "",
            freeOrPaid: "",
            favorites: false,
        })
        videoSetter(data)
    }

    return (
        <div className="filter-column">
            <p>Filter</p>
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={handleFormChange} className="text" type="textbox" name="title" value={formData.title} />
            <Form.Label>Longest to Shortest</Form.Label>
            <Form.Check onChange={handleFormChange} inline type="radio" name="length" value="longToShort" checked={formData.length === "longToShort"}/>
            <Form.Label>Shortest to Longest</Form.Label>
            <Form.Check onChange={handleFormChange} inline type="radio" name="length" value="shortToLong" checked={formData.length === "shortToLong"} />
            <Form.Label>Ascending</Form.Label>
            <Form.Check onChange={handleFormChange} inline type="radio" name="alphaOrder" value="alphaAsc" checked={formData.alphaOrder === "alphaAsc"} />
            <Form.Label>Descending</Form.Label>
            <Form.Check onChange={handleFormChange} inline type="radio" name="alphaOrder" value="alphaDesc" checked={formData.alphaOrder === "alphaDesc"}/>
            <Form.Label>Free</Form.Label>
            <Form.Check onChange={handleFormChange} inline type="radio" name="freeOrPaid" value="free" checked={formData.freeOrPaid === "free"} />
            <Form.Label>Paid</Form.Label>
            <Form.Check onChange={handleFormChange} inline type="radio" name="freeOrPaid" value="paid" checked={formData.freeOrPaid === "paid"} />
            <Form.Label>Favorite</Form.Label>
            <Form.Check onChange={handleFormChange} type="checkbox" className="check" name="favorites" selected={formData.favorites} />
            <button onClick={clear} type="button">Clear</button>
        </div>
    )
}

export default FilterForm