import { Button, Form } from "react-bootstrap";

const FilterForm = () => {
    return (
        <div className="filter-column">
            <p>Filter</p>
            <Form.Label>Longest to Shortest</Form.Label>
            <Form.Check inline type="radio" name="length" />
            <Form.Label>Shortest to Longest</Form.Label>
            <Form.Check inline type="radio" name="length" />
            <Form.Label>Ascending</Form.Label>
            <Form.Check inline type="radio" name="title" />
            <Form.Label>Descending</Form.Label>
            <Form.Check inline type="radio" name="title" />
            <Form.Label>Free</Form.Label>
            <Form.Check inline type="radio" name="freeOrPaid" />
            <Form.Label>Paid</Form.Label>
            <Form.Check inline type="radio" name="freeOrPaid" />
            <Form.Label>Favorite</Form.Label>
            <Form.Check type="checkbox" />
            <button type="button">Filter Videos</button>
            <button type="button">Clear</button>
        </div>
    )
}

export default FilterForm