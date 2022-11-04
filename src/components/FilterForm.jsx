import { Button, Form } from "react-bootstrap";

const FilterForm = ({videoSetter, favoriteVideos}) => {

    const shortToLong = () => {
        videoSetter(prevVids => {
            prevVids.sort((a,b) => parseFloat(a.duration.split(":").pop()) - parseFloat(b.duration.split(":").pop()))
            console.log(prevVids)
            return [...prevVids]
        })
    }

    const longToShort = () => {
        videoSetter(prevVids => {
            prevVids.sort((a,b) => parseFloat(b.duration.split(":").pop()) - parseFloat(a.duration.split(":").pop()))
            console.log(prevVids)
            return [...prevVids]
        })
    }

    const ascending = () => {
        videoSetter(prevVids => {
            prevVids.sort( function( a, b ) {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            });
            console.log(prevVids)
            return [...prevVids]
        })
    }

    const descending = () => {
        videoSetter(prevVids => {
            prevVids.sort( function( a, b ) {
                return b.name < a.name ? -1 : b.name > a.name ? 1 : 0;
            });
            console.log(prevVids)
            return [...prevVids]
        })
    }

    const isFree = () => {
        videoSetter(prevVids => {
            let ina = prevVids.filter(state => state.isFree)
            console.log(ina)
            return [...ina]
        })
    }

    const favorite = () => {
        videoSetter(prevVids => {
            console.log(favoriteVideos)
            return [...prevVids]
        })
    }

    return (
        <div className="filter-column">
            <p>Filter</p>
            <Form.Label>Longest to Shortest</Form.Label>
            <Form.Check onClick={longToShort} inline type="radio" name="length" />
            <Form.Label>Shortest to Longest</Form.Label>
            <Form.Check onClick={shortToLong} inline type="radio" name="length" />
            <Form.Label>Ascending</Form.Label>
            <Form.Check onClick={ascending} inline type="radio" name="title" />
            <Form.Label>Descending</Form.Label>
            <Form.Check onClick={descending} inline type="radio" name="title" />
            <Form.Label>Free</Form.Label>
            <Form.Check onClick={isFree} inline type="radio" name="freeOrPaid" />
            <Form.Label>Paid</Form.Label>
            <Form.Check inline type="radio" name="freeOrPaid" />
            <Form.Label>Favorite</Form.Label>
            <Form.Check onClick={favorite} type="checkbox" />
            <button type="button">Filter Videos</button>
            <button type="button">Clear</button>
        </div>
    )
}

export default FilterForm