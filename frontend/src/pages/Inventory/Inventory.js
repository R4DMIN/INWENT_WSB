import { useEffect, useState } from "react"
import SelectElement from "../../components/SelectElement/SelectElement"
import SearchBar from "../../components/SearchBar/SearchBar"
import InfoInputMiniTab from "../../components/InfoInputMiniTab/InfoInputMiniTab"
import dataFieldsServices from "../../services/dataFieldsServices"
import dataServices from "../../services/dataServices"
import WindowOnTop from "../../components/WindowOnTop/WindowOnTop"
import CopmpareData from "../../components/CompareData/CompareData"
import Button from "../../components/Button/Button"

const Inventory = () => {
    const [location, setLocation] = useState(null)
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [selectedAssetNotChanged, setSelectedAssetNotChanged] = useState(null)
    const [keyHeaders, setKeyHeaders] = useState(null)
    const [checkDataWindow, setCheckDataWindow] = useState(false)
    const elementList = ["SHOP10", "SHOP22"]

    const changeHandler = (input) => {
        setLocation(input)
    }

    const inputMiniTabHandler = (key, value) => {
        if (key !== "location") setSelectedAsset({ ...selectedAsset, [key]: value })
    }

    const searchHandle = (input) => {
        if (!location) return
        dataServices
            .getBySn(input)
            .then(response => {
                setSelectedAsset({ ...response, location: location })
                setSelectedAssetNotChanged({ ...response })
            })
            .catch(error => console.log(error))
    }

    // konwertuje dane do 
    const getDataForMiniTab = (keys) => {
        let data = []
        keys.forEach(key => {
            if (key === "last_invent") {
                data.push({ id: key, value: new Date(selectedAsset[key]).toLocaleString(), name: keyHeaders[key] })
            } else data.push({ id: key, value: selectedAsset[key], name: keyHeaders[key] })

        });
        return data
    }

    const getDataForCompareData = () => {
        const keys = ['sn', 'device_type', 'location', 'location_local', 'location_description', 'manufacturer', 'model']
        let data = []
        keys.forEach(key => {
            data.push({ header: keyHeaders[key], old: selectedAssetNotChanged[key], new: selectedAsset[key] })
        })

        return data
    }

    // zwraca PRAWDE jeżeli dane o urządzeniu i nagłówkach kolumn są dostępne
    const deviceDataIsAvailable = () => {
        if (selectedAsset && keyHeaders) return true
        return false
    }

    // sprawdza czy zostały zmienione jakieś dane (poza lastInwent) jezeli tak to pyta użytkownika o potwierdzenie jeżeli nie to zapsiuje dane
    const CompareDataButtonHandler = (dataCorrect) => {
        if (dataCorrect) {
            save()
            setCheckDataWindow(false)
        }
        else setCheckDataWindow(false)
    }

    const checkData = () => {
        const keys = ['sn', 'device_type', 'location', 'location_local', 'location_description', 'manufacturer', 'model']
        let changes = false
        keys.forEach(key => {
            if (selectedAsset[key] !== selectedAssetNotChanged[key]) changes = true
        })

        if (changes) setCheckDataWindow(true)
        else save()
    }

    const save = () => {
        const actualDate = new Date(Date.now())
        dataServices.updateById(selectedAsset.id, { location: selectedAsset.location, location_local: selectedAsset.location_local, location_description: selectedAsset.location_description, last_invent: actualDate })
            .then(response => {
                console.log(response);
                setSelectedAsset(null)
                setSelectedAssetNotChanged(null)
            })
        //console.log(test.toDateString());
    }

    useEffect(() => {
        dataFieldsServices
            .getKeyHeaders()
            .then(response => {
                setKeyHeaders(response)
                console.log("pobieranie danych");
            })
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{ display: "flex" }}>
                <div style={{ padding: "10px" }}>
                    <h2>Wybierz lokalizację:</h2>
                    <SelectElement
                        elementList={elementList}
                        onChange={changeHandler}
                        value={location}
                        width={500}
                        disabled={location ? true : false}
                    />
                </div>
                <div style={{ padding: "10px" }}>
                    <h2>Sprawdź Urządzenie:</h2>
                    <SearchBar width={500} searchHandle={searchHandle} />
                </div>
            </div>
            <hr style={{ width: "90%" }}></hr>
            {deviceDataIsAvailable()
                ? <div style={{ display: "flex" }}>
                    <div style={{ margin: "15px" }}><InfoInputMiniTab key={1} name={"Urządzenie"} data={getDataForMiniTab(['id', 'sn', 'last_invent'])} /></div>
                    <div style={{ margin: "15px" }}><InfoInputMiniTab key={2} name={"Lokalizacja"} data={getDataForMiniTab(['location', 'location_local', 'location_description'])} changeHandler={inputMiniTabHandler} /></div>
                    <div style={{ margin: "15px" }}><InfoInputMiniTab key={3} name={"Model"} data={getDataForMiniTab(['device_type', 'manufacturer', 'model'])} /></div>
                </div>
                : <><h1>{location ? "Podaj numer seryjny" : "Wybierz Lokalizację"}</h1></>
            }
            {deviceDataIsAvailable() ? <Button name={"POTWIERDŹ LOKALIZACJĘ"} buttonHandler={checkData} /> : <></>}
            <hr style={{ width: "90%" }}></hr>
            <div>

            </div>
            {checkDataWindow ? <WindowOnTop windowToShow={<CopmpareData data={getDataForCompareData()} buttonHandler={CompareDataButtonHandler} />} /> : <></>}
        </div >
    )
}

export default Inventory