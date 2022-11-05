import { Button, Form } from "react-bootstrap";

const FilterForm = ({ videoSetter, favoriteVideos, data }) => {

    const textSearch = () => {
        videoSetter(data)
        videoSetter(prevVids => {
            let ina = []
            let test = document.getElementsByClassName('text')[0].value
            prevVids.map((video) => {
                if (video.name.toLowerCase().includes(test.toLowerCase())) {
                    ina.push(video)
                }
            })
            return [...ina]
        })
    }

    const shortToLong = () => {
        videoSetter(prevVids => {
            prevVids.sort((a, b) => parseFloat(a.duration.split(":").pop()) - parseFloat(b.duration.split(":").pop()))
            return [...prevVids]
        })
    }

    const longToShort = () => {
        videoSetter(prevVids => {
            prevVids.sort((a, b) => parseFloat(b.duration.split(":").pop()) - parseFloat(a.duration.split(":").pop()))
            return [...prevVids]
        })
    }

    const ascending = () => {
        videoSetter(prevVids => {
            prevVids.sort(function (a, b) {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            });
            return [...prevVids]
        })
    }

    const descending = () => {
        videoSetter(prevVids => {
            prevVids.sort(function (a, b) {
                return b.name < a.name ? -1 : b.name > a.name ? 1 : 0;
            });
            return [...prevVids]
        })
    }

    const isFree = () => {
        textSearch()
        videoSetter(prevVids => {
            let ina = prevVids.filter(state => state.isFree)
            return [...ina]
        })
    }

    const isPaid = () => {
        textSearch()
        videoSetter(prevVids => {
            let ina = prevVids.filter(state => state.isFree === false)
            return [...ina]
        })
    }

    const favorite = () => {
        videoSetter(prevVids => {
            console.log(favoriteVideos)
            return [...prevVids]
        })
    }

    const clear = () => {
        document.getElementsByClassName('text')[0].value = ""
        let ele = document.getElementsByName("length")
        for (let i = 0; i < ele.length; i++) {
            ele[i].checked = false
        }
        let title = document.getElementsByName("title")
        for (let i = 0; i < title.length; i++) {
            title[i].checked = false
        }
        let freeOrPaid = document.getElementsByName("freeOrPaid")
        for (let i = 0; i < freeOrPaid.length; i++) {
            freeOrPaid[i].checked = false
        }
        videoSetter(data)
    }

    return (
        <div className="filter-column">
            <p>Filter</p>
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={textSearch} className="text" type="textbox" />
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
            <Form.Check onClick={isPaid} inline type="radio" name="freeOrPaid" />
            <Form.Label>Favorite</Form.Label>
            <Form.Check onClick={favorite} type="checkbox" className="check" />
            <button onClick={clear} type="button">Clear</button>
        </div>
    )
}

export default FilterForm