import './Main.css'
import { useRef, useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import DevicesTable from '../../pages/DevicesTable/DeviceTable'
import DevicePage from '../../pages/DevicePage/DevicePage'
import TestPage from '../../pages/TestPage/TestPage'
import Inventory from '../../pages/Inventory/Inventory'

const Main = () => {
    const refToMainDiv = useRef(null)
    const [mainDivSize, setMainDivSize] = useState({ width: 0, height: 0 })

    const handleDivResize = () => {
        const width = refToMainDiv.current.offsetWidth
        const height = refToMainDiv.current.offsetHeight
        setMainDivSize({ width: width, height: height })
        //console.log("width: " + width, "hegiht: " + height);
    }

    useEffect(() => window.addEventListener('resize', handleDivResize), [])
    useEffect(handleDivResize, [])
    return (
        <div className="main" ref={refToMainDiv}>
            <Routes>
                <Route path="/deviceslist" element={<DevicesTable parrentDivSize={mainDivSize} />} />
                <Route path="/device" element={<DevicePage parrentDivSize={mainDivSize} />} />
                <Route path="/inventory" element={<Inventory parrentDivSize={mainDivSize} />} />
                <Route path="/testpage" element={<TestPage parrentDivSize={mainDivSize} />} />
                <Route path='*' element={<div> Error 404 - NoPage</div>} />
            </Routes>
        </div>
    )
}

export default Main