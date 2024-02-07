import './SelectElement.css'

const SelectElement = ({ elementList, onChange, value, formName, width, disabled }) => {
    const handleChange = (event) => {
        if (onChange) onChange(event.target.value)
    }

    if (!width) width = 250


    const Option = ({ value }) => {
        return <option value={value}>{value}</option>
    }

    if (elementList)
        return (
            <div className='box' style={{ width: width }}>
                <select onChange={handleChange} name={formName} disabled={disabled} value={value ? value : '...'}>
                    <option value={"..."} disabled hidden>...</option>
                    {elementList.map(element => <Option value={element} key={element} />)}
                </select>
            </div>
        )
}

export default SelectElement