import app from './app'
import db from './database'
import dotenv from 'dotenv'

dotenv.config()
db()
const port = process.env.PORT || 4000
app.listen(port)
console.log('Server Listen on port', port);