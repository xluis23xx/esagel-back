import mongoose from 'mongoose'

const db = mongoose.connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))

export default db