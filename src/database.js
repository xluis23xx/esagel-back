import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://lycann96:6jwl8ycq069@cluster0.gcaew.azure.mongodb.net/esageldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))
