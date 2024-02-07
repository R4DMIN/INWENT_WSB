import "./WindowOnTop.css"

const WindowOnTop = ({ windowToShow }) => {
    if (windowToShow)
        return (
            <div className="BackgroundBlur">
                <div>
                    {windowToShow}
                </div>
            </div>
        )
}

export default WindowOnTop