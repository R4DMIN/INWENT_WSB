require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors') // umożliwia dostęp z inego adresu, na czas DEV (npm install cors)
const assetModel = require('./models/assetData')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json()) // do wcztywania formatu json
app.use(morgan(':method :url :status - :response-time ms')) // do logowania requestów

//temp data
const deviceFieldList = require('./../db.json').deviceFieldList;

// na razie w sumie nic 
app.get('/', (request, response) => {
    // na ten moment nic później frontend będzie się tu ładował (pewnie do usunięcia)
    response.send('<h1>TEST</h1>')
})

// ??? zwraca listę dostępnych kolumn do pobrania oraz informacje o nich 
app.get('/api/datafields/', (request, response) => {
    response.json(deviceFieldList)
})

app.get('/api/keyheaders', (request, response) => {
    const fieldsNames = {
        id: "Asset ID",
        sn: "Numer Seryjny",
        location: "Lokalizacja Sklep",
        location_local: "Lokalizacja Urządzenia",
        location_description: "Lokalizajca Opis",
        device_type: "Typ Urządzenia",
        manufacturer: "Producent",
        model: "Model",
        last_invent: "Ostatnia Inwentaryzacja"
    }
    response.json(fieldsNames)
})

// MONGODB - zwraca listę wszystkich urządzeń, jeżelie z kluczem "columns" = (nazwy pl w bazie) to zwraca dane tlko dal wybranych kluczy
app.get('/api/assetdata/', (request, response, next) => {
    //sprawdza czy jest parametr columns jeżeli tak to dodaj do zapytania do bazy danych podane klucze 
    //przez co będzie zwrócona zawartość tylko dla nich, pole id jest zwracane zawsze 
    let dataColumnToResponse = {}
    if (request.query.columns) {
        request.query.columns.split(',').forEach(column => {
            dataColumnToResponse[column] = 1
        })
    }
    // zapytanie do bazy danych
    assetModel
        //find{co szukać(wartośc)}, {jakie pola zwracać np sn : 1 zwróci id i SN }
        .find({}, dataColumnToResponse)
        .then(result => {
            console.log(result);
            return response.json(result)
        })
        .catch(error => next(error))
})

// MONGO - zwraca dane urządzenia z podanmy ID
app.get('/api/assetdata/:id', (request, response, next) => {
    const id = request.params.id
    //sprawdza czy jest parametr columns jeżeli tak to dodaj do zapytania do bazy danych podane klucze 
    //przez co będzie zwrócona zawartość tylko dla nich, pole id jest zwracane zawsze 
    let dataColumnToResponse = {}
    if (request.query.columns) {
        request.query.columns.split(',').forEach(column => {
            dataColumnToResponse[column] = 1
        })
    }
    // zapytanie do bazy danych
    assetModel
        //find{co szukać(wartośc)}, {jakie pola zwracać np sn : 1 zwróci id i SN }
        .findById(id, dataColumnToResponse)
        .then(result => {
            return response.json(result)
        })
        .catch(error => next(error))
})

app.get('/api/assetdata/sn/:sn', (request, response, next) => {
    const sn = request.params.sn
    //sprawdza czy jest parametr columns jeżeli tak to dodaj do zapytania do bazy danych podane klucze 
    //przez co będzie zwrócona zawartość tylko dla nich, pole id jest zwracane zawsze 
    let dataColumnToResponse = {}
    if (request.query.columns) {
        request.query.columns.split(',').forEach(column => {
            dataColumnToResponse[column] = 1
        })
    }
    // zapytanie do bazy danych
    assetModel
        //find{co szukać(wartośc)}, {jakie pola zwracać np sn : 1 zwróci id i SN }
        .findOne({ sn: sn })
        .then(result => {
            console.log(result);
            return response.json(result)
        })
        .catch(error => next(error))
})

// MONGO - modyfikacja assetu z podanym ID
app.put('/api/assetdata/:id', (request, response, next) => {
    const body = request.body
    const id = request.params.id

    console.log(body);

    assetModel
        .findByIdAndUpdate(id, body)
        .then(result => {
            assetModel
                .findById(id, {})
                .then(result => {
                    response.json(result)
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))
})

// MONGODB - dodawanie nowego assetu do bazy dancyh
app.post('/api/assetdata/', (request, response, next) => {
    // sprawdza czy BODY requestu nie jest puste jeżeli tak to błąd
    if ((Object.keys(request.body).length === 0))
        return response.status(400).send({
            error: 'POST./api/assetdata/ - Content to update is missing',
            errorMessage: 'Błędne dane skontaktuj się z pomocą techniczną'
        })

    new assetModel({
        sn: request.body.sn,
        name: request.body.name,
        location: request.body.location,
        location_local: request.body.location_local,
        location_description: request.body.location_description,
        device_type: request.body.device_type,
        manufacturer: request.body.manufacturer,
        model: request.body.model,
    })
        .save()
        .then(result => {
            console.log(`POST./api/assetdata/ - added new asset sn:${result.sn}`)
            response.status(200).json(result)
        })
        .catch(error => next(error))
})

// MONGO = usuwanie assetu po ID
app.delete('/api/assetdata/:id', (request, response, next) => {
    const id = request.params.id

    assetModel
        .findByIdAndDelete(id)
        .then(request => {
            console.log(request)
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        console.log('errorHandler: CastError - wrong ID');
        return response.status(400).send({
            error: 'errorHandler: CastError - wrong ID',
            errorMessage: 'Błędne dane skontaktuj się z pomocą techniczną'
        })
    }
    if (error.code === 11000) {
        return response.status(400).send({
            error: 'errorHandele - Serial number exist in database',
            errorMessage: 'Podany numer seryjny istnieje w bazie danych'
        })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({
            error: 'errorHandele - Missing required data',
            errorMessage: 'Błędne dane skontaktuj się z pomocą techniczną'
        })
    }

    if (error.name === 'MongooseError') {
        console.log("MongooseError - DataBase connection problem");
        return response.status(500).send({
            error: 'errorHandele - DataBase connection problem ',
            errorMessage: 'Problem z połączeniem z bazą danych spróbuj ponownie później.'
        })
    }

    console.log("no error handling: ", error.name, error.code);
    next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server start at port ${PORT}`)
})