require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const mongoUrl = process.env.ASSET_DATA_MONGODB_URL

const assetDataShema = new mongoose.Schema({
    sn: { type: String, unique: true, dropDups: true, required: true },
    name: String,
    location: String,
    location_local: String,
    location_description: String,
    device_type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    last_invent: Date
})

mongoose
    .connect(mongoUrl)
    .then(result => {
        console.log('connectet to MongoDB assetData');
    })
    .catch(error => {
        console.log('CONNECTION ERROR:', error.message);
    })

assetDataShema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('assetData', assetDataShema)