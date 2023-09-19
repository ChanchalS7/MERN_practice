function FilterControls({minRating,maxPrice,onMinRatingChange,onMaxPriceChange}){
    return (
        <div className="filter-controls">
            <label>Filter by Minimum Rating</label>
            <input
            type="number"
            value={minRating || 0 }
            onChange={onMinRatingChange}
            />
            <br/>
            <label>Filter by Maximum Price :</label>
            <input
            type="number"
            value = { maxPrice|| 0}
            onChange={onMaxPriceChange}


            />

        </div>
    )
}
export default FilterControls;