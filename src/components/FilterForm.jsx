const FilterForm = () => {
    return (
        <div className="filter-column">
            <p>Filter</p>
            <p>Length</p>
            <input type="text" name="length" />
            <p>Title</p>
            <input type="text" name="title" />
            <p>Free</p>
            <input type="radio" name="price" value="free" />
            <p>Paid</p>
            <input type="radio" name="price" value="paid" />
            <p>Favorite</p>
            <input type="radio" name="favorite" />
            <button type="button">Filter Videos</button>
            <button type="button">Clear</button>
        </div>
    )
}

export default FilterForm