import './InfoInputMiniTab.css'

const InfoInputMiniTab = ({ name, data, changeHandler }) => {
    const inputDisabled = !changeHandler ? true : false

    return (
        <div className='InfoIputMiniTab'>
            <h3 style={{ alignSelf: "center" }}>{name}:</h3>
            <table>
                <tbody>
                    {data ? data.map(data => <DataLine key={data.id} data={data} inputDisabled={inputDisabled} changeHandler={(value) => changeHandler(data.id, value)} />) : <></>}
                </tbody>
            </table>
        </div>
    )
}

const DataLine = ({ data, inputDisabled, changeHandler }) => {
    return (
        <tr>
            <td>{data.name}:</td>
            <td><input
                value={data.value}
                disabled={inputDisabled}
                onChange={(e) => changeHandler(e.target.value)}
            /></td>
        </tr>
    )
}

export default InfoInputMiniTab