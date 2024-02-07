const deviceFieldList = [
    {
        header: "Asset ID",
        dataName: "id",
        readOnly: true
    },
    {
        header: "Numer Seryjny",
        dataName: "sn",
        readOnly: false
    },
    {
        header: "Lokalizacja Sklep",
        dataName: "location",
        readOnly: false
    },
    {
        header: "Lokalizacja Urządzenia",
        dataName: "location_local",
        readOnly: false
    },
    {
        header: "Lokalizajca Opis",
        dataName: "location_description",
        readOnly: false
    },
    {
        header: "Typ Urządzenia",
        dataName: "device_type",
        readOnly: false
    },
    {
        header: "Producent",
        dataName: "manufacturer",
        readOnly: false
    },
    {
        header: "Model",
        dataName: "model",
        readOnly: false
    }
    ,
    {
        dataName: "last_invent",
        readOnly: true,
        header: "Ostatania Inwentaryzacja"
    }
]

const fieldName = {
    id: "Asset ID",
    sn: "Numer Seryjny",
    location: "Lokalizacja Sklep",
    location_local: "Lokalizacja Urządzenia",
    location_description: "Lokalizajca Opis",
    device_type: "Typ Urządzenia",
    manufacturer: "Producent",
    model: "Model"
}

export { deviceFieldList, fieldName }