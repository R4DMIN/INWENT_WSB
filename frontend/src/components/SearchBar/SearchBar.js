import "./SearchBar.css"
import lens from '../../assets/icons/lens-white.png'

const SearchBar = ({ searchHandle, width }) => {
    if (!width) width = 250

    const submitChandle = (event) => {
        event.preventDefault();
        searchHandle(event.target.input.value);
        event.target.input.value = ""
    }

    return (
        <div className="SearchBar" style={{ width: width }}>
            <form onSubmit={submitChandle}>
                <div className="searchInput" style={{ width: width - 50 }}>
                    <input name="input"></input>
                </div>
                <button className="searchButton" >
                    <img src={lens} alt='icon_img' width='44px' height='44px' ></img>
                </button>
            </form>
        </div>
    )
}

export default SearchBar