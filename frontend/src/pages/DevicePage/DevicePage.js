import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import dataServices from "../../services/dataServices"
import { deviceFieldList } from "../../components/deviceFieldList"
import "./DevicePage.css"

const DevicePage = () => {
    const location = useLocation()
    const [idd, setIdd] = useState(null)
    const [deviceData, setDeviceData] = useState(null)
    const [activeEdit, setActiveEdit] = useState(false)

    const loadDeviceData = () => {
        //console.log("test", location.state, !idd);
        if (location.state && !idd) {
            //console.log("teeeeeez");
            setIdd(location.state.id)
        }
        if (idd) {
            dataServices
                .getById(idd)
                .then(response => {
                    setDeviceData(response)
                    setActiveEdit(false)
                })
                .catch(response => {
                    console.log(response)
                })
        } else {
            let emptyDeviceData = {}
            deviceFieldList.forEach(deviceField => {
                emptyDeviceData[deviceField] = ""
            })
            //console.log(emptyDeviceData);
            setActiveEdit(true)
            setDeviceData(emptyDeviceData)
        }

    }

    const DeviceInfoField = ({ fieldKey }) => {
        const fieldDataInfo = deviceFieldList.filter(obj => {
            return obj.dataName === fieldKey
        })[0]

        if (!fieldDataInfo) return <div>problemik</div>;

        return (
            <tr className="DeviceInfoField">
                <td>{fieldDataInfo.header}:</td>
                <td><input
                    defaultValue={fieldKey === "last_invent" ? new Date(deviceData[fieldKey]).toLocaleString() :deviceData[fieldKey]}
                    readOnly={fieldDataInfo.readOnly}
                    disabled={activeEdit && !fieldDataInfo.readOnly ? "" : "disabled"}
                    name={fieldDataInfo.dataName}
                /></td>
            </tr>
        )
    }

    const DeviceInfoTab = ({ fieldKeys }) => {
        return (
            <table>
                <tbody>
                    {fieldKeys.map(fieldKey => <DeviceInfoField fieldKey={fieldKey} key={fieldKey} />)}
                </tbody>
            </table>
        )
    }

    const updateAssetData = (event) => {
        let dataToUpdate = {}
        event.preventDefault()
        deviceFieldList.forEach(field => {
            if (!field.readOnly && event.target[field.dataName].value !== deviceData[field.dataName])
                dataToUpdate = { ...dataToUpdate, [field.dataName]: event.target[field.dataName].value }
        })
        if (Object.keys(dataToUpdate).length === 0) {
            alert('nie zmieniono żadnych danych')
        } else {
            if (!idd) {
                dataServices.addNew(dataToUpdate)
                    .then(response => {
                        setDeviceData(response)
                        setIdd(response.id)
                        alert("Poprawnie dodano urządzenie")
                    })
                    .catch(error => {
                        console.log(error.response.data.error);
                        console.log(dataToUpdate);
                    })

            } else {
                dataServices.updateById(idd, dataToUpdate)
                    .then(response => {
                        console.log('response', response);
                        alert("Poprawnie zapisano dane")
                    })
                    .catch(error => {
                        console.log(error.response.data.error);
                        console.log(dataToUpdate);
                    })
                //console.log(event.target["sn"].value)
            }
        }
    }

    useEffect(loadDeviceData, [idd])

    if (!deviceData) return <div></div>
    return (
        <div className="DevicePage">
            <form onSubmit={updateAssetData}>
                <div className="head">
                    <DeviceInfoTab fieldKeys={['id', 'sn', 'device_type','last_invent']} />
                    {activeEdit
                        ? <button type="submit">Zapisz</button>
                        : <button type="button" onClick={(e) => { e.preventDefault(); setActiveEdit(!activeEdit) }}>Edytuj</button>}
                </div>
                <div className="dataField">
                    <div className="column">
                        <h1> Model </h1>
                        <DeviceInfoTab fieldKeys={['manufacturer', 'model']} />
                    </div>
                    <div className="column">
                        <h1> Lokalizacja </h1>
                        <DeviceInfoTab fieldKeys={['location', 'location_local', 'location_description']} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DevicePage