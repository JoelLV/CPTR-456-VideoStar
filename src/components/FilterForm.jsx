import { useEffect } from "react"
import { useState } from "react"
import { Form, Row, Col } from "react-bootstrap"

const FilterForm = ({ videoSetter, favoriteVideos, data }) => {
    const [formData, setFormData] = useState({
        title: "",
        length: "",
        sortType: "",
        freeOrPaid: "",
        favorites: false,
    })

    /**
     * Extracts the values stored in the duration string
     * provided by the api and converts it to milliseconds.
     * 
     * @param duration duration string provided by the api
     * @returns int milliseconds in duration
     */
    const convertDurationToMilliSec = (duration) => {
        const matches = duration.match(/([0-9]+):([0-9]+):([0-9]+)\.([0-9]+)/) // Extract each number from the duration string.
        const conversionsToMilli = [36000000, 60000, 1000, 1] // Convertions to milliseconds for hour, minute, second, and millisecond.
        let totalMilliSec = 0
        // Start at the first index in order to ignore the first match
        // which matches the entire duration string.
        for (let i = 1; i < conversionsToMilli.length; i++) {
            totalMilliSec += parseInt(matches[i]) * conversionsToMilli[i - 1] // match index with the conversionsToMilli array
        }
        return totalMilliSec
    }

    /**
     * Uses the form data stored in the state variable
     * formData and filters videos according to it.
     * 
     * @param videos Videos to be filtered
     * @returns array Resulting videos after filter
     */
    const filterVideos = (videos) => {
        const fifteenSecondsAsMilli = 15000
        const thirtySecondsAsMilli = 30000
        return videos.filter(value => {
            // Filter by title if not empty. Match regardless of capitalization.
            if (formData.title != "" && !value.name.toLowerCase().includes(formData.title.toLowerCase())) {
                return false
            }
            // Filter paid or free videos if the radio is checked.
            if (formData.freeOrPaid != "") {
                if (formData.freeOrPaid === "free" && !value.isFree) {
                    return false
                } else if (formData.freeOrPaid === "paid" && value.isFree) {
                    return false
                }
            }
            // Filter if favorites filter is toggled.
            if (formData.favorites && favoriteVideos.find(favId => favId === value.id) == null) {
                return false
            }
            // Filter by length. Three options, less than 15 seconds, between 15 and 30 seconds, and more than 30 seconds.
            if (formData.lengthFilterType != "") {
                if (formData.lengthFilterType === "lessThan15" && convertDurationToMilliSec(value.duration) >= fifteenSecondsAsMilli) {
                    // Filter videos that are less than 15 seconds by converting duration to milliseconds and comparing 15 seconds as milliseconds.
                    return false
                } else if (
                    formData.lengthFilterType === "between15And30" &&
                    (convertDurationToMilliSec(value.duration) < fifteenSecondsAsMilli
                        || convertDurationToMilliSec(value.duration) > thirtySecondsAsMilli)
                ) {
                    // Filter videos that are between 15 and 30 seconds by converting duration to milliseconds and comparing 15 and 30 seconds
                    // as milliseconds.
                    return false
                } else if (formData.lengthFilterType === "greaterThan30" && convertDurationToMilliSec(value.duration) <= thirtySecondsAsMilli) {
                    // Filter videos that are greater than 30 seconds by converting duration to milliseconds and comparing 30 seconds as milliseconds.
                    return false
                }
            }
            return true
        })
    }

    /**
     * Sorts given videos according to the data provided by the 
     * state variable formData.
     * 
     * @param videos array of video objects to filter.
     * @returns array modified array with elements in the correct order.
     */
    const sortVideos = (videos) => {
        if (formData.sortType !== "") {
            if (formData.sortType === "longToShort") {
                // Sort data from longest duration to shortest duration by removing colons and comparing the resulting numbers.
                videos.sort((a, b) => parseFloat(b.duration.split(":").join("")) - parseFloat(a.duration.split(":").join("")))
            } else if (formData.sortType === "shortToLong") {
                // Sort data from shortest duration to longest duration by removing colons and comparing the resulting numbers.
                videos.sort((a, b) => parseFloat(a.duration.split(":").join("")) - parseFloat(b.duration.split(":").join("")))
            } else if (formData.sortType === "alphaAsc") {
                // Sort data alphabetically from a->z by comparing strings.
                videos.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
            } else if (formData.sortType === "alphaDesc") {
                // Sort data alphabetically from z->a by comparing strings.
                videos.sort((a, b) => b.name < a.name ? -1 : (b.name > a.name ? 1 : 0))
            } else if (formData.sortType === "freeVideosFirst") {
                // Sort data by placing free videos first, and then paid videos.
                videos.sort((a, b) => a.isFree && !b.isFree ? -1 : (!a.isFree && b.isFree ? 1 : 0))
            } else if (formData.sortType === "paidVideosFirst") {
                // Sort data by placing paid videos first, and then free videos.
                videos.sort((a, b) => !a.isFree && b.isFree ? -1 : (a.isFree && !b.isFree ? 1 : 0))
            }
        }
        return videos
    }

    /**
     * Calls helper functions filterVideos and sortVideos
     * to filter and sort videos according to the data stored
     * in the state variable formData.
     * 
     * @returns array Resulting video array after filter and sorting.
     */
    const filterAndSort = () => {
        let filteredVideos = filterVideos(data)
        filteredVideos = sortVideos(filteredVideos)

        return filteredVideos
    }

    /**
     * Calls helper function filterAndSort()
     * to re-sort and re-filter videos in
     * the array where all videos are located.
     * Triggered every time the form data changes.
     */
    useEffect(() => {
        videoSetter(filterAndSort())
    }, [formData])

    /**
     * Event handler triggered whenever
     * any input tag is changed in the filter
     * form. Reassigns new data to the formData
     * state variable. This change will trigger
     * the above useEffect which will re-sort
     * and re-filter videos with the new data
     * provided.
     * 
     * @param event
     */
    const handleFormChange = ({ target }) => {
        const { name, value, checked, type } = target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type !== "checkbox" ? value : checked
            }
        })
    }

    /**
     * Event handler triggered
     * when clear button is clicked.
     * Resets any sorting and filtering
     * applied to the filtered array and reassigns
     * its data to its original state.
     */
    const clear = () => {
        // Clear up form data.
        setFormData({
            title: "",
            length: "",
            sortType: "",
            freeOrPaid: "",
            favorites: false,
        })
        // Reassign filtered videos to original data.
        videoSetter(data)
    }

    return (
        <div className="filter-column">
            <h1 className="filter-header">Filter</h1>
            <hr className="divider"></hr>
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={handleFormChange} className="text" type="textbox" name="title" value={formData.title} />
            <Row>
                <Col>
                    <Form.Label>Free Videos</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="freeOrPaid" value="free" checked={formData.freeOrPaid === "free"} />
                </Col>
                <Col>
                    <Form.Label>Paid Videos</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="freeOrPaid" value="paid" checked={formData.freeOrPaid === "paid"} />
                </Col>
                <Col>
                    <Form.Label>Favorites</Form.Label><br />
                    <Form.Check onChange={handleFormChange} type="checkbox" className="check" name="favorites" selected={formData.favorites} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Less than 15s</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="lengthFilterType" value="lessThan15" checked={formData.lengthFilterType === "lessThan15"} />
                </Col>
                <Col>
                    <Form.Label>15s to 30s</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="lengthFilterType" value="between15And30" checked={formData.lengthFilterType === "between15And30"} />
                </Col>
                <Col>
                    <Form.Label>Greater than 30s</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="lengthFilterType" value="greaterThan30" checked={formData.lengthFilterType === "greaterThan30"} />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Form.Label>Longest to Shortest</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="sortType" value="longToShort" checked={formData.sortType === "longToShort"} />
                </Col>
                <Col>
                    <Form.Label>Shortest to Longest</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="sortType" value="shortToLong" checked={formData.sortType === "shortToLong"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Ascending Alphabetically</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="sortType" value="alphaAsc" checked={formData.sortType === "alphaAsc"} />
                </Col>
                <Col>
                    <Form.Label>Descending Alphabetically</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="sortType" value="alphaDesc" checked={formData.sortType === "alphaDesc"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Sort Free Videos</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="sortType" value="freeVideosFirst" checked={formData.sortType === "freeVideosFirst"} />
                </Col>
                <Col>
                    <Form.Label>Sort Paid Videos</Form.Label><br />
                    <Form.Check onChange={handleFormChange} inline type="radio" name="sortType" value="paidVideosFirst" checked={formData.sortType === "paidVideosFirst"} />
                </Col>
            </Row>
            <button className="clear-button" onClick={clear} type="button">Clear</button>
        </div>
    )
}

export default FilterForm