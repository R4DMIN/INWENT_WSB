import Table from "../../components/Table/Table"
import dataService from "../../services/dataServices" // TODO - do zmiany nazwy na assetDataService
import dataFieldsServices from "../../services/dataFieldsServices" // TODO - do zmiany na userAssetTableSettingService

const DevicesTable = ({ parrentDivSize }) => {

    // pobieranie danych urządzeń z serwera
    const loadDevicesData = (columnsName) => {
        return dataService
            .getAll(columnsName)
            .then(response => response)
            .catch(error => {
                console.log(error)
                return null
            })
    }

    const loadTableSettings = () => {
        return dataFieldsServices
            .getAll()
            .then(response => response)
            .catch(error => {
                console.log(error);
                return null
            })
    }

    return (
        <div tyle={{ maxHeight: parrentDivSize.height - 20 }}>
            <Table
                loadData={(columnsName) => loadDevicesData()}
                loadTableSettings={() => loadTableSettings()}
                checkBox={true}
            />
        </div>
    )
}

export default DevicesTable