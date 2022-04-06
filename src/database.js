import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://xluis23xx:6jwl8ycq069@cluster0.19wdh.mongodb.net/esageldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))