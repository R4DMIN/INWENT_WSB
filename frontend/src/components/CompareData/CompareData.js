import "./CompareData.css"
import Button from "../Button/Button"

const CopmpareData = ({ data, buttonHandler }) => {

    return (
        <div className={"CompareData"} >
            <h2>Potwierdź poprawność danych:</h2>
            <table>
                <tbody>
                    {data.map((d, index) => <CopmpareDataLine key={index} data={d} />)}
                </tbody>
            </table>
            <br />
            <div className="Buttons">
                <Button name={"ANULUJ"} buttonHandler={() => buttonHandler(false)} />
                <Button name={"ZAPISZ"} buttonHandler={() => buttonHandler(true)} />
            </div>
        </div>
    )
}

const CopmpareDataLine = ({ data }) => {
    const different = data.old !== data.new ? true : false
    return (
        <tr>
            <CopmpareDataLineCell value={data.header + ":"} className={different ? "Bold" : ""} />
            <CopmpareDataLineCell value={data.old} float={"right"} className={different ? "Red" : ""} />
            <CopmpareDataLineCell value={<>&#8594;</>} />
            <CopmpareDataLineCell value={data.new} className={different ? "Green" : ""} />
        </tr>
    )
}

const CopmpareDataLineCell = ({ value, float, className }) => {
    return (
        <td
            className={className ? className : ""}
            style={{ float: float ? float : "" }}
        >
            {value}
        </td>
    )
}

export default CopmpareData